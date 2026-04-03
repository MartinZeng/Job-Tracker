import axios from 'axios';
import type { Application } from '../types/Application';

const api = axios.create({
  baseURL: 'http://localhost:5081/api',
});

export async function getApplications(): Promise<Application[]> {
  const res = await api.get('/applications');
  return res.data;
}

export async function createApplication(
  app: Omit<Application, 'id' | 'createdAt'>,
): Promise<Application> {
  const res = await api.post('/applications', app);
  return res.data;
}

export async function updateApplication(
  id: string,
  app: Partial<Application>,
): Promise<Application> {
  const res = await api.put(`/applications/${id}`, app);
  return res.data;
}

export async function deleteApplication(id: string): Promise<void> {
  await api.delete(`/applications/${id}`);
}
