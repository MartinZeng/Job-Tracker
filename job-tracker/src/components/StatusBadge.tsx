import type { AppStatus } from '../types/Application';

const styles: Record<AppStatus, string> = {
  Saved: 'bg-amber-100  text-amber-800',
  Applied: 'bg-blue-100   text-blue-800',
  Interview: 'bg-green-100  text-green-800',
  Offer: 'bg-teal-100   text-teal-800',
  Rejected: 'bg-red-100    text-red-800',
  Ghosted: 'bg-gray-100   text-gray-600',
};

export function StatusBadge({ status }: { status: AppStatus }) {
  return (
    <span
      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${styles[status]}`}
    >
      {status}
    </span>
  );
}
