import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeResponse } from '../api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
        const apiUrl = codespaceName
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
          : 'http://localhost:8000/api/activities/';
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Activities endpoint returned ${response.status}`);
        }

        const payload = await response.json();
        setActivities(normalizeResponse(payload));
      } catch (loadError) {
        setError(loadError.message);
      }
    }

    loadActivities();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Activities</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul className="list-group">
        {activities.map((activity) => (
          <li className="list-group-item" key={activity._id || activity.id}>
            <strong>{activity.type}</strong>
            <div className="text-muted">Duration: {activity.duration} min</div>
            <small>{activity.date}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
