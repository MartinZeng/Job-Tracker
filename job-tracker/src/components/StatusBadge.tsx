import type { AppStatus } from '../types/Application';

const STATUS_STYLES: Record<
  AppStatus,
  { bg: string; text: string; dot: string }
> = {
  Saved: { bg: '#FAEEDA', text: '#633806', dot: '#854F0B' },
  Applied: { bg: '#E6F1FB', text: '#0C447C', dot: '#185FA5' },
  Interview: { bg: '#EAF3DE', text: '#27500A', dot: '#3B6D11' },
  Offer: { bg: '#E1F5EE', text: '#085041', dot: '#085041' },
  Rejected: { bg: '#FCEBEB', text: '#791F1F', dot: '#A32D2D' },
  Ghosted: { bg: '#F1EFE8', text: '#444441', dot: '#444441' },
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
