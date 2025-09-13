# Image Processing API

[![Node.js](https://img.shields.io/badge/Node.js-14.x-green)](https://nodejs.org/)  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6)](https://www.typescriptlang.org/)  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  

A simple **Image Processing API** built with **Node.js**, **Express**, **TypeScript**, and tested with **Jasmine**.  
It allows users to **resize images dynamically** and serves cached images for faster access as placeholders or thumbnails.

## Setup

```bash
# Clone the repository
git clone https://github.com/mahdi-shouib/Image-Processing-API.git

# Navigate into the folder
cd Image-Processing-API

# Install dependencies
npm install

# Build project
npm run build

# Start server
node dist/index.js
```

Server runs at:
`http://localhost:3000`

## Usage

Go to:
/api/images?`filename`=**image.ext**&`width`=**width**&`height`=**height**

- `filename` → name of the image in `/assets/full`
- `width` → desired width
- `height` → desired height

**Example:**
`http://localhost:3000/api/images?filename=example.jpg&width=300&height=200`


- Displays the resized image: `example.jpg` with width `300` and height `200`.
- Resized images are cached in `/assets/thumb`.

## Testing

Run tests with:

```bash
npm test
```

## Contributing

**Contributions are welcome!**  
Please open an issue or submit a pull request.