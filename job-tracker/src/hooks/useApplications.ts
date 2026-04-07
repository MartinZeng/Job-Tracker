import { useState, useEffect } from 'react';
import type { Application } from '../types/Application';
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from '../api/applications';

export function useApplications() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getApplications()
      .then(setApps)
      .catch(() => setError('Could not connect to API'))
      .finally(() => setLoading(false));
  }, []);

  async function addApp(app: Omit<Application, 'id' | 'createdAt'>) {
    try {
      console.log('Adding app:', app);
      console.log('BASE_URL:', import.meta.env.VITE_API_URL);
      const created = await createApplication(app);
      console.log('Created:', created);
      setApps((prev) => [created, ...prev]);
    } catch (e) {
      console.error('Error adding app:', e);
      setError(
        'This demo is running without a live API. Run the app locally to add applications.',
      );
    }
  }

  async function updateApp(id: number, changes: Partial<Application>) {
    const updated = await updateApplication(String(id), changes);
    setApps((prev) => prev.map((a) => (a.id === id ? updated : a)));
  }

  async function deleteApp(id: number) {
    await deleteApplication(String(id));
    setApps((prev) => prev.filter((a) => a.id !== id));
  }

  return { apps, loading, error, addApp, updateApp, deleteApp };
}
