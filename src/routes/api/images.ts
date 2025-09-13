import express from 'express';
import ValidateParameters from '../../util/paramValid';
import path from 'path';

const images = express.Router();

images.get('/', ValidateParameters, async (req, res) => {
	const filename = req.query.filename as unknown as string | undefined;
	const width = parseInt(req.query.width!.toString());
	const height = parseInt(req.query.height!.toString());

	const newPath = `assets/thumb/${width}w_${height}h_${filename}`;
	res.sendFile(path.join(process.cwd(), newPath));
});

export = images;
