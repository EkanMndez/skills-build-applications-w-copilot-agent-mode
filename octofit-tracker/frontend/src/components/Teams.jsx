import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeResponse } from '../api.js';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const apiUrl = buildApiUrl('teams');
        const response = await fetch(apiUrl);
        const payload = await response.json();
        setTeams(normalizeResponse(payload));
      } catch (loadError) {
        setError(loadError.message);
      }
    }

    loadTeams();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Teams</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul className="list-group">
        {teams.map((team) => (
          <li className="list-group-item" key={team._id || team.id}>
            <strong>{team.name}</strong>
            <div className="text-muted">Members: {team.members}</div>
            <small>{team.focus}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
