import express from 'express';
import imageProcess from './imageProcess';

const ValidateParameters = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
): Promise<express.Response | void> => {
	const filename = req.query.filename as unknown as string | undefined;
	if (!filename)
		return res.status(400).send('Error: missing filename parameter');

	if (!req.query.width || !req.query.height)
		return res.status(400).send('Error: missing width or height parameters');

	const width = Number(req.query.width!.toString());
	const height = Number(req.query.height!.toString());

	if (width <= 0 || height <= 0 || Number.isNaN(width) || Number.isNaN(height))
		return res.status(400).send('Error: invalid width or height parameters');

	try {
		await imageProcess.ResizeImage(filename, width, height);
	} catch (err) {
		return res.status(404).send((err as object).toString());
	}

	next();
};

export = ValidateParameters;
