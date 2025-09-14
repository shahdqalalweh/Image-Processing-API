import app from '../index';
import supertest from 'supertest';
import fs from 'fs/promises';

const request = supertest(app);

describe('Testing endpoints', () => {
	describe('Test invalid requests', () => {
		it('images endpoint with no parameters is missing filename bad request', async () => {
			const response = await request.get('/api/images');
			expect(response.badRequest).toBe(true);
			expect(response.text).toEqual('Error: missing filename parameter');
		});

		it('images endpoint with no width and height is missing width or height bad request', async () => {
			const response = await request.get('/api/images?filename=nature.jpg');
			expect(response.badRequest).toBe(true);
			expect(response.text).toEqual(
				'Error: missing width or height parameters',
			);
		});

		it('images endpoint with only no width is missing width or height bad request', async () => {
			const response = await request.get(
				'/api/images?filename=p.jpg&height=500',
			);
			expect(response.badRequest).toBe(true);
			expect(response.text).toEqual(
				'Error: missing width or height parameters',
			);
		});

		it('images endpoint with only no height is missing width or height bad request', async () => {
			const response = await request.get(
				'/api/images?filename=p.jpg&width=500',
			);
			expect(response.badRequest).toBe(true);
			expect(response.text).toEqual(
				'Error: missing width or height parameters',
			);
		});

		it('images endpoint with text width is invalid width or height bad request', async () => {
			const response = await request.get(
				'/api/images?filename=nature.jpg&width=fivehundred&height=500',
			);
			expect(response.badRequest).toBe(true);
			expect(response.text).toEqual(
				'Error: invalid width or height parameters',
			);
		});

		it('images endpoint with text height is invalid width or height bad request', async () => {
			const response = await request.get(
				'/api/images?filename=p.jpg&width=500&height=500fivehundred',
			);
			expect(response.badRequest).toBe(true);
			expect(response.text).toEqual(
				'Error: invalid width or height parameters',
			);
		});

		it('images endpoint with non existant image is not found request', async () => {
			const response = await request.get(
				'/api/images?filename=notreal.jpg&width=500&height=500',
			);
			expect(response.notFound).toBe(true);
			expect(response.text).toEqual(`Error: notreal.jpg doesn't exist`);
		});
	});

	describe('Test valid requests', () => {
		it('create a resized image', async () => {
			const response = await request.get(
				'/api/images?filename=nature.jpg&width=500&height=500',
			);
			expect(response.ok).toBe(true);
			await fs.unlink('./assets/thumb/500w_500h_nature.jpg');
		});

		it('create 3 resized images', async () => {
			const response1 = await request.get(
				'/api/images?filename=p.jpg&width=800&height=300',
			);
			await fs.unlink('./assets/thumb/800w_300h_p.jpg');

			const response2 = await request.get(
				'/api/images?filename=nature.jpg&width=400&height=100',
			);
			await fs.unlink('./assets/thumb/400w_100h_nature.jpg');

			const response3 = await request.get(
				'/api/images?filename=p.jpg&width=200&height=600',
			);
			await fs.unlink('./assets/thumb/200w_600h_p.jpg');

			expect(response1.ok && response2.ok && response3.ok).toBe(true);
		});
	});
});
