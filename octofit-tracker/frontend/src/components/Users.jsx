import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeResponse } from '../api.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
        const apiUrl = codespaceName
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
          : 'http://localhost:8000/api/users/';
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Users endpoint returned ${response.status}`);
        }

        const payload = await response.json();
        setUsers(normalizeResponse(payload));
      } catch (loadError) {
        setError(loadError.message);
      }
    }

    loadUsers();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Users</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user._id || user.id || user.email}>
            <strong>{user.name}</strong>
            <div className="text-muted">{user.email}</div>
            <small>{user.goal}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
