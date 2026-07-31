function getCodespaceName() {
  const envName = import.meta.env.VITE_CODESPACE_NAME;
  const envCodespaceName = envName?.trim();

  if (envCodespaceName) {
    return envCodespaceName;
  }

  if (typeof window === 'undefined') {
    return '';
  }

  const hostname = window.location.hostname;
  const match = hostname.match(/^(.+?)-\d+\.app\.github\.dev$/i);

  return match ? match[1] : '';
}

function getBaseUrl() {
  const codespaceName = getCodespaceName();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

const baseUrl = getBaseUrl();

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
