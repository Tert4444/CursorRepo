const express = require('express');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
const path = require('path');

const app = express();
const upload = multer();

// Environment variables
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER || 'uploads';

if (!connectionString) {
  console.error('AZURE_STORAGE_CONNECTION_STRING is not set.');
  process.exit(1);
}

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

async function ensureContainerExists() {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const exists = await containerClient.exists();
    if (!exists) {
      await containerClient.create();
      console.log(`Created container: ${containerName}`);
    } else {
      console.log(`Container ${containerName} already exists`);
    }
  } catch (error) {
    console.error('Error ensuring container exists:', error);
  }
}

ensureContainerExists().catch(console.error);

// Serve the single page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = Date.now() + '-' + req.file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(req.file.buffer, {
      blobHTTPHeaders: { blobContentType: req.file.mimetype }
    });

    res.json({ blobName, message: 'File uploaded successfully' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).send('Error uploading file to Azure Storage: ' + err.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
