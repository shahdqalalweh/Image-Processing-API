import imageProcess from '../../util/imageProcess';
import fs from 'fs/promises';

describe('Testing image processing functions', () => {
	describe('Test if files exist or not', () => {
		it('base image exists', async () => {
			expect(await imageProcess.CheckFullImage('icelandwaterfall.jpg')).toBe(
				true,
			);
		});

		it('not a real image doesnt exist', async () => {
			expect(await imageProcess.CheckFullImage('notreal.file')).toBe(false);
		});
	});

	describe('Test cached images exist or not', () => {
		it('not real file is not cached', async () => {
			expect(await imageProcess.IsImageCached('notreal.file', 200, 200)).toBe(
				false,
			);
		});

		it('cached image exists', async () => {
			await imageProcess.ResizeImage('palmtunnel.jpg', 500, 500);
			expect(await imageProcess.IsImageCached('palmtunnel.jpg', 500, 500)).toBe(
				true,
			);
			await fs.unlink('./assets/thumb/500w_500h_palmtunnel.jpg');
		});
	});

	describe('Test deleting images', () => {
		it('deleting a non real file doesnt throw error', async () => {
			expect(async () => {
				await imageProcess.DeleteCachedImage('notreal.file');
			}).not.toThrow();
		});

		it('should delete all cached files', async () => {
			const img = 'santamonica.jpg';
			await imageProcess.ResizeImage(img, 1000, 500);
			await imageProcess.ResizeImage(img, 800, 300);
			await imageProcess.ResizeImage(img, 200, 700);
			await imageProcess.DeleteCachedImage(img);
			const files = (await fs.readdir('./assets/thumb')).filter((f) =>
				f.endsWith(img),
			);
			expect(files).toHaveSize(0);
		});
	});
});
