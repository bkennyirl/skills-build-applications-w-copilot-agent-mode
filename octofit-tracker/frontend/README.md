# Octofit Tracker Frontend

## Environment setup

Define `VITE_CODESPACE_NAME` when running in GitHub Codespaces.

Example `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The app builds API URLs with `import.meta.env.VITE_CODESPACE_NAME`:

- Codespaces base: `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`
- Fallback base when `VITE_CODESPACE_NAME` is unset: `http://localhost:8000/api/[component]/`

This fallback prevents invalid URLs such as `https://undefined-8000.app.github.dev/...`.

## Run

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
