# Release Process for Web3js Plugin

### 1. Create a Release Branch

```bash
git checkout -b release/bumped-version
```

### 2. Install Dependencies

Ensure all dependencies are installed:

```bash
npm i
```

### 3. Bump Version Number

- **Note**: Skip this step for the first version.
- For subsequent releases, update the version number in `package.json`.

### 4. Build the Project

```bash
npm run build
```

### 5. Update the Changelog

- Move items from under `## [Unreleased]` to the new release version (e.g., `## [0.1.0]`).
- Add a new `## [Unreleased]` section at the end of the file.

### 6. Create a Tag

```bash
git tag bumped-version
```

### 7. Push Branch and Tag to Repository

```bash
git push origin release/bumped-version
git push origin --tags
```

### 8. Create a Pull Request

- Create a PR to merge `release/bumped-version` into the `main` branch.
- Wait for all tests to pass.

### 9. Publish on GitHub

- Navigate to [GitHub Releases](https://github.com/web3/web3-plugin-wallet-rpc/releases/new).
- Select the recently pushed tag.
- Add a release title and notes.
- Check "pre-release" if it’s an alpha, beta, RC, or dev release.
- Check “Create discussion for this release”.
- Click the **Publish** button.

### 10. Publish on npm

```bash
npm login
npm publish
npm logout
```

### 11. Merge Back the PR

- Merge the PR created in step 8 back into the `main` branch.
