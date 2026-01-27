# Azure File Upload Portal

A simple single-page file upload portal that stores files in Azure Storage Account.

## Features

- Single page with yellow background
- File upload functionality
- Direct upload to Azure Blob Storage
- No authentication required

## Prerequisites

- Node.js 18 or higher
- Azure Storage Account with connection string
- Azure App Service (for deployment)

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd azure-upload-portal
```

2. Install dependencies:
```bash
npm install
```

3. Set environment variables:
   - `AZURE_STORAGE_CONNECTION_STRING`: Your Azure Storage connection string
   - `AZURE_STORAGE_CONTAINER`: Container name (defaults to 'uploads')
   - `PORT`: Server port (defaults to 3000)

## Local Development

```bash
npm start
```

Visit `http://localhost:3000` in your browser.

## Azure Deployment

### 1. Create Azure Storage Account

1. Go to Azure Portal
2. Create a Storage Account
3. Navigate to **Access keys** and copy the **Connection string**

### 2. Deploy to Azure App Service

1. Create a Web App in Azure Portal (Node.js runtime)
2. Go to **Configuration** → **Application settings**
3. Add the following settings:
   - `AZURE_STORAGE_CONNECTION_STRING`: Your storage connection string
   - `AZURE_STORAGE_CONTAINER`: `uploads` (optional, defaults to 'uploads')
4. Deploy your code using:
   - **GitHub Actions** (if connected to GitHub)
   - **ZIP Deploy** from Azure Portal
   - **Azure CLI**: `az webapp deployment source config-zip --resource-group <resource-group> --name <app-name> --src <zip-file>`

### 3. GitHub Actions Deployment (Optional)

If you want automatic deployment from GitHub, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Azure

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Deploy to Azure
        uses: azure/webapps-deploy@v2
        with:
          app-name: '<your-app-name>'
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
```

## License

MIT
