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
    const created = await createApplication(app);
    setApps((prev) => [created, ...prev]);
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
