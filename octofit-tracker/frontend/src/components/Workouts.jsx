import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeResponse } from '../api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
        const apiUrl = codespaceName
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Workouts endpoint returned ${response.status}`);
        }

        const payload = await response.json();
        setWorkouts(normalizeResponse(payload));
      } catch (loadError) {
        setError(loadError.message);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Workouts</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-4" key={workout._id || workout.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>
                <p className="card-text mb-1">Level: {workout.level}</p>
                <p className="card-text">Duration: {workout.duration} min</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
