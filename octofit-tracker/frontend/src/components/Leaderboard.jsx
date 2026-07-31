import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeResponse } from '../api.js';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(buildApiUrl('leaderboard'));
        const payload = await response.json();
        setEntries(normalizeResponse(payload));
      } catch (loadError) {
        setError(loadError.message);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Leaderboard</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li className="list-group-item" key={entry._id || entry.id}>
            <strong>Rank {entry.rank}</strong>
            <div className="text-muted">Score: {entry.score}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}
