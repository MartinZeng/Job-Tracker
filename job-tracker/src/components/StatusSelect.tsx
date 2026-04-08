import { useState, useRef, useEffect } from 'react';
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

const STATUSES: AppStatus[] = [
  'Not applied',
  'Saved',
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
  'Ghosted',
];

type Props = {
  value: AppStatus;
  onChange: (status: AppStatus) => void;
};

export function StatusSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const s = STATUS_STYLES[value];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          backgroundColor: s.bg,
          color: s.text,
          border: `0.5px solid ${s.dot}`,
          borderRadius: 20,
          padding: '4px 12px 4px 10px',
          fontSize: 12,
          fontWeight: 500,
          cursor: 'pointer',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: s.dot,
            flexShrink: 0,
          }}
        />
        {value}
      </div>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            zIndex: 9999,
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            overflow: 'hidden',
            minWidth: 130,
            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
          }}
        >
          {STATUSES.map((status) => {
            const c = STATUS_STYLES[status];
            return (
              <div
                key={status}
                onClick={() => {
                  onChange(status);
                  setOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  fontSize: 13,
                  cursor: 'pointer',
                  color: '#111827',
                  backgroundColor: status === value ? '#f3f4f6' : '#ffffff',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#f3f4f6')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    status === value ? '#f3f4f6' : '#ffffff')
                }
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: c.dot,
                    flexShrink: 0,
                  }}
                />
                {status}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
