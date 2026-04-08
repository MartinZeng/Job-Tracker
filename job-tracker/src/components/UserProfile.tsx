import { useState, useRef, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type AvatarProps = {
  picture?: string;
  name?: string;
  initials: string;
  size: number;
};

function Avatar({ picture, name, initials, size }: AvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: picture ? 'transparent' : '#6366f1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.35,
        fontWeight: 600,
        color: '#fff',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {picture ? (
        <img
          src={picture}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        initials
      )}
    </div>
  );
}

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  right?: React.ReactNode;
  danger?: boolean;
  dark?: boolean;
  onClick: () => void;
};

function MenuItem({
  icon,
  label,
  right,
  danger,
  dark,
  onClick,
}: MenuItemProps) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 14px',
        fontSize: 12,
        cursor: 'pointer',
        color: danger ? '#dc2626' : dark ? '#e2e8f0' : '#111',
        background: hover
          ? danger
            ? '#fef2f2'
            : dark
              ? '#334155'
              : '#f9f9f9'
          : dark
            ? '#1e293b'
            : '#fff',
      }}
    >
      {icon}
      {label}
      {right}
    </div>
  );
}

export function UserProfile() {
  const { user, logout } = useAuth0();
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
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

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.body.style.backgroundColor = darkMode ? '#0f172a' : '';
    document.body.style.color = darkMode ? '#e2e8f0' : '';
  }, [darkMode]);

  function handleExportCSV() {
    alert('Export coming soon!');
    setOpen(false);
  }

  if (!user) return null;

  const initials =
    user.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) ?? '?';

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: user.picture ? 'transparent' : '#6366f1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 600,
          color: '#fff',
          cursor: 'pointer',
          overflow: 'hidden',
          border: open ? '2px solid #6366f1' : '2px solid transparent',
          transition: 'border-color .15s',
        }}
      >
        {user.picture ? (
          <img
            src={user.picture}
            alt={user.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          initials
        )}
      </div>

      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 'calc(100% + 8px)',
            zIndex: 9999,
            background: darkMode ? '#1e293b' : '#fff',
            border: `0.5px solid ${darkMode ? '#334155' : '#e5e5e5'}`,
            borderRadius: 12,
            overflow: 'hidden',
            width: 220,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          }}
        >
          <div
            style={{
              padding: '12px 14px',
              borderBottom: `0.5px solid ${darkMode ? '#334155' : '#f0f0f0'}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar
                picture={user.picture}
                name={user.name}
                initials={initials}
                size={38}
              />
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: darkMode ? '#f1f5f9' : '#111',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user.name}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: '#94a3b8',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user.email}
                </div>
              </div>
            </div>
          </div>

          <MenuItem
            dark={darkMode}
            icon={
              <svg
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke={darkMode ? '#94a3b8' : '#666'}
                strokeWidth='2'
              >
                <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
              </svg>
            }
            label='Dark mode'
            right={
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setDarkMode((d) => !d);
                }}
                style={{
                  width: 32,
                  height: 18,
                  borderRadius: 9,
                  background: darkMode ? '#6366f1' : '#e5e5e5',
                  position: 'relative',
                  cursor: 'pointer',
                  marginLeft: 'auto',
                  flexShrink: 0,
                  transition: 'background .2s',
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: '#fff',
                    position: 'absolute',
                    top: 2,
                    left: 2,
                    transform: darkMode ? 'translateX(14px)' : 'translateX(0)',
                    transition: 'transform .2s',
                  }}
                />
              </div>
            }
            onClick={() => {}}
          />

          <MenuItem
            dark={darkMode}
            icon={
              <svg
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke={darkMode ? '#94a3b8' : '#666'}
                strokeWidth='2'
              >
                <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
                <path d='M13.73 21a2 2 0 0 1-3.46 0' />
              </svg>
            }
            label='Email digest'
            right={
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  background: '#6366f1',
                  color: '#fff',
                  padding: '1px 5px',
                  borderRadius: 4,
                  marginLeft: 'auto',
                }}
              >
                Soon
              </span>
            }
            onClick={() => {}}
          />

          <MenuItem
            dark={darkMode}
            icon={
              <svg
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke={darkMode ? '#94a3b8' : '#666'}
                strokeWidth='2'
              >
                <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                <polyline points='7 10 12 15 17 10' />
                <line x1='12' y1='15' x2='12' y2='3' />
              </svg>
            }
            label='Export CSV'
            onClick={handleExportCSV}
          />

          <div
            style={{
              height: '0.5px',
              background: darkMode ? '#334155' : '#f0f0f0',
            }}
          />

          <MenuItem
            dark={darkMode}
            icon={
              <svg
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#dc2626'
                strokeWidth='2'
              >
                <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
                <polyline points='16 17 21 12 16 7' />
                <line x1='21' y1='12' x2='9' y2='12' />
              </svg>
            }
            label='Sign out'
            danger
            onClick={() => {
              setOpen(false);
              logout({
                logoutParams: {
                  returnTo:
                    import.meta.env.VITE_REDIRECT_URI ??
                    'http://localhost:5173',
                },
              });
            }}
          />
        </div>
      )}
    </div>
  );
}
