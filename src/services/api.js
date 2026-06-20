let raw = import.meta.env.VITE_API_URL || 'http://localhost:3001'
if (raw && !raw.startsWith('http://') && !raw.startsWith('https://')) raw = 'https://' + raw
const API_BASE = raw

let authToken = null

export function setAuthToken(token) {
  authToken = token
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`

  const res = await fetch(`${API_BASE}/api${path}`, {
    ...options,
    headers,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.error || `HTTP ${res.status}`)
  }

  return res.json()
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),
}
