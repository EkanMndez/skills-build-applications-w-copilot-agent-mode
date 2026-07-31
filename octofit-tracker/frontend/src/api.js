const envName = import.meta.env.VITE_CODESPACE_NAME;
const codespaceName = envName?.trim();
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export function buildApiUrl(resource) {
  const safeResource = String(resource || '').replace(/^\/+/g, '').replace(/\/+$/g, '');
  return `${baseUrl}/api/${safeResource}/`;
}

export function normalizeResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
}
