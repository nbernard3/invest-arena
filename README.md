# invest-arena

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Development Workflow

### 1. Create a New Feature Branch
```bash
git checkout -b feature/new-feature
```

### 2. Local Development
```bash
npm run dev
```
This starts a development server with hot-reload

### 3. Testing
- Test the new feature functionality in your browser
- Check for regressions in existing features
- Test responsiveness across different screen sizes
- Run unit tests if available: `npm run test`

### 4. Commit Changes
```bash
git add .
git commit -m "Add new feature: description"
```

### 5. Push and Create PR
```bash
git push origin feature/new-feature
```
Then:
1. Go to your repository on GitHub
2. Create a new Pull Request from your feature branch to main
3. Wait for review and approval
4. Merge the PR

### 6. Automatic Deployment
After merging to main:
- GitHub Actions will automatically trigger the deployment workflow
- You can monitor the deployment progress in the "Actions" tab of your repository
- Once completed, your changes will be live on GitHub Pages

### Troubleshooting

If the deployment fails:
1. Check the Actions log in your GitHub repository
2. Verify your `vue.config.js` settings
3. Ensure all dependencies are properly listed in `package.json`
4. Check if the repository name in `vue.config.js` matches exactly

## Important Notes

- Always develop in a feature branch, never directly in main
- Test thoroughly in the local environment before pushing
- Monitor the GitHub Actions log for any deployment issues
- Remember that the initial deployment might take a few minutes to become available
- If using Vue Router, ensure it's configured correctly for GitHub Pages

## Best Practices

- Use meaningful branch names and commit messages
- Keep feature branches up to date with main
- Delete feature branches after merging
- Regularly verify your local environment matches production settings
