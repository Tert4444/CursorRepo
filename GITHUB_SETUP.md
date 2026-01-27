# How to Add Your Code to GitHub

## Quick: Push to a Remote GitHub Repo

From `c:\Projects\MyStaticWebApp`:

1. **Add the remote** (use your real GitHub username and repo name):
   ```powershell
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

2. **Push your branch**:
   ```powershell
   git branch -M main
   git push -u origin main
   ```

   When asked for a password, use a [Personal Access Token](https://github.com/settings/tokens) (not your GitHub password).

---

## ⚠️ IMPORTANT: Run All Commands From This Directory

**Your project directory:** `c:\Projects\MyStaticWebApp`

**How to navigate there:**
1. Open PowerShell
2. Type: `cd c:\Projects\MyStaticWebApp`
3. Press Enter
4. Verify you're in the right place: `pwd` (should show `c:\Projects\MyStaticWebApp`)

---

## Step 1: Initialize Git Repository (if not already done)

Make sure you're in `c:\Projects\MyStaticWebApp`, then run:

```powershell
git init
```

## Step 2: Add All Files to Git

```powershell
git add .
```

This stages all files in your project (respecting your `.gitignore` file).

## Step 3: Create Your First Commit

```powershell
git commit -m "Initial commit: Azure File Upload Portal"
```

## Step 4: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **+** icon in the top right corner
3. Select **New repository**
4. Name your repository (e.g., `MyStaticWebApp` or `azure-upload-portal`)
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (you already have these)
7. Click **Create repository**

## Step 5: Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these (replace `YOUR_USERNAME` and `YOUR_REPO_NAME`):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

Or if you prefer SSH:

```powershell
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
```

## Step 6: Push Your Code to GitHub

```powershell
git branch -M main
git push -u origin main
```

If you're prompted for credentials:
- **Username**: Your GitHub username
- **Password**: Use a Personal Access Token (not your GitHub password)
  - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  - Generate a new token with `repo` permissions
  - Use this token as your password

## Alternative: Using GitHub CLI (gh)

If you have GitHub CLI installed, you can do it all in one command:

```powershell
gh repo create MyStaticWebApp --public --source=. --remote=origin --push
```

## Troubleshooting

### If you get "remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### If you need to update your remote URL
```powershell
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Check your remote configuration
```powershell
git remote -v
```

## Next Steps

After pushing, you can:
- View your code on GitHub
- Set up GitHub Actions for CI/CD
- Collaborate with others
- Create branches for new features
