# OctoFit Tracker Frontend

This React 19 + Vite presentation tier consumes the Node.js API hosted under the OctoFit backend.

## Required environment variable

Set `VITE_CODESPACE_NAME` in a local environment file such as `.env.local` when running in a GitHub Codespace.

Example:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When the variable is available, the frontend will call:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is not set, the frontend falls back to the local backend:

```text
http://localhost:8000/api/[component]/
```

The frontend also tolerates both paginated and plain array responses.
