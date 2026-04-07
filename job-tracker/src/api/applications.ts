import axios from 'axios';
import type { Application } from '../types/Application';

const BASE_URL = import.meta.env.VITE_API_URL;

export function createApiClient(token: string) {
  return axios.create({
    baseURL: BASE_URL || 'http://localhost:5081/api',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getApplications(token: string): Promise<Application[]> {
  if (!BASE_URL) return [];
  try {
    const res = await createApiClient(token).get('/applications');
    return res.data;
  } catch {
    return [];
  }
}

export async function createApplication(
  token: string,
  app: Omit<Application, 'id' | 'createdAt'>,
): Promise<Application> {
  const res = await createApiClient(token).post('/applications', app);
  return res.data;
}

export async function updateApplication(
  token: string,
  id: string,
  app: Partial<Application>,
): Promise<Application> {
  const res = await createApiClient(token).put(`/applications/${id}`, app);
  return res.data;
}

export async function deleteApplication(
  token: string,
  id: string,
): Promise<void> {
  await createApiClient(token).delete(`/applications/${id}`);
}
