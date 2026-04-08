import { useState, useRef, useEffect } from 'react';

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export function ActionMenu({ onEdit, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          padding: '4px 8px',
          borderRadius: 6,
          border: '0.5px solid #e0e0e0',
          background: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <svg
          width='14'
          height='14'
          viewBox='0 0 24 24'
          fill='none'
          stroke='#666'
          strokeWidth='2'
        >
          <circle cx='12' cy='5' r='1' />
          <circle cx='12' cy='12' r='1' />
          <circle cx='12' cy='19' r='1' />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 'calc(100% + 4px)',
            zIndex: 9999,
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            overflow: 'hidden',
            minWidth: 120,
            boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
          }}
        >
          <div
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              fontSize: 12,
              cursor: 'pointer',
              color: '#111',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#f9f9f9')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#fff')
            }
          >
            <svg
              width='13'
              height='13'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#666'
              strokeWidth='2'
            >
              <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
              <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' />
            </svg>
            Edit
          </div>
          <div style={{ height: '0.5px', background: '#f0f0f0' }} />
          <div
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              fontSize: 12,
              cursor: 'pointer',
              color: '#dc2626',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#fef2f2')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#fff')
            }
          >
            <svg
              width='13'
              height='13'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#dc2626'
              strokeWidth='2'
            >
              <polyline points='3 6 5 6 21 6' />
              <path d='M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6' />
              <path d='M10 11v6' />
              <path d='M14 11v6' />
              <path d='M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2' />
            </svg>
            Delete
          </div>
        </div>
      )}
    </div>
  );
}
