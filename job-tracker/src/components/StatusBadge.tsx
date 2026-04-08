import type { AppStatus } from '../types/Application';

const STATUS_STYLES: Record<
  AppStatus,
  { dot: string; bg: string; text: string }
> = {
  'Not applied': { dot: '#94a3b8', bg: '#f1f5f9', text: '#475569' },
  Saved: { dot: '#854F0B', bg: '#FAEEDA', text: '#633806' },
  Applied: { dot: '#185FA5', bg: '#E6F1FB', text: '#0C447C' },
  Interview: { dot: '#3B6D11', bg: '#EAF3DE', text: '#27500A' },
  Offer: { dot: '#085041', bg: '#E1F5EE', text: '#085041' },
  Rejected: { dot: '#A32D2D', bg: '#FCEBEB', text: '#791F1F' },
  Ghosted: { dot: '#444441', bg: '#F1EFE8', text: '#444441' },
};

export function StatusBadge({ status }: { status: AppStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        background: s.bg,
        color: s.text,
        borderRadius: 20,
        padding: '3px 9px',
        fontSize: 12,
        fontWeight: 500,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: s.dot,
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
}
