import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
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
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;

    getAccessTokenSilently()
      .then((token) => {
        console.log('Token:', token);
        return getApplications(token);
      })
      .then((data) => {
        console.log('Apps:', data);
        setApps(data);
      })
      .catch((e) => {
        console.error('Failed:', e);
        setError('Could not load applications');
      })
      .finally(() => setLoading(false));
  }, [getAccessTokenSilently, isAuthenticated, isLoading]);

  async function addApp(app: Omit<Application, 'id' | 'createdAt'>) {
    try {
      const token = await getAccessTokenSilently();
      console.log('addApp token:', token);
      console.log('addApp data:', app);
      const created = await createApplication(token, app);
      console.log('addApp created:', created);
      setApps((prev) => [created, ...prev]);
    } catch (e) {
      console.error('addApp error:', e);
      setError('Failed to add application');
    }
  }

  async function updateApp(id: number, changes: Partial<Application>) {
    try {
      const token = await getAccessTokenSilently();
      const updated = await updateApplication(token, String(id), changes);
      setApps((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch {
      setError('Failed to update application');
    }
  }

  async function deleteApp(id: number) {
    try {
      const token = await getAccessTokenSilently();
      await deleteApplication(token, String(id));
      setApps((prev) => prev.filter((a) => a.id !== id));
    } catch {
      setError('Failed to delete application');
    }
  }

  return { apps, loading, error, addApp, updateApp, deleteApp };
}
