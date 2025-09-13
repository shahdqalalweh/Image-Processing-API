import fs from 'fs/promises';
import sharp from 'sharp';

const CheckFullImage = async (filename: string): Promise<boolean> => {
	const imgPath = `assets/full/${filename}`;
	try {
		await fs.access(imgPath);
		return true;
		// eslint-disable-next-line
	} catch (err) {
		await fs.mkdir('assets/full', { recursive: true });
		return false;
	}
};

const IsImageCached = async (
	filename: string,
	width: number,
	height: number,
): Promise<boolean> => {
	const imgPath = `assets/thumb/${width}w_${height}h_${filename}`;
	try {
		await fs.access(imgPath);
		return true;
		// eslint-disable-next-line
	} catch (err) {
		await fs.mkdir('assets/thumb', { recursive: true });
		return false;
	}
};

const DeleteCachedImage = async (filename: string): Promise<void> => {
	const files = await fs.readdir('./assets/thumb');

	await Promise.all(
		files
			.filter((f) => f.endsWith(filename))
			.map((img) => fs.unlink(`./assets/thumb/${img}`)),
	);
};

const ResizeImage = async (
	filename: string,
	width: number,
	height: number,
): Promise<void> => {
	if (!(await CheckFullImage(filename)))
		throw Error(`${filename} doesn't exist`);

	if (await IsImageCached(filename, width, height)) return;

	const imgPath = `assets/full/${filename}`;
	const newPath = `assets/thumb/${width}w_${height}h_${filename}`;
	await sharp(imgPath).resize(width, height).toFile(newPath);
};

export = {
	CheckFullImage,
	ResizeImage,
	IsImageCached,
	DeleteCachedImage,
};
