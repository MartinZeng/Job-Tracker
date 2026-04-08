export type AppStatus =
  | 'Not applied'
  | 'Saved'
  | 'Applied'
  | 'Interview'
  | 'Offer'
  | 'Rejected'
  | 'Ghosted';

export interface Application {
  id: number;
  company: string;
  role: string;
  status: AppStatus;
  dateApplied: string;
  salary: string;
  location: string;
  link: string;
  notes: string;
  createdAt: number;
}
