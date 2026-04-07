import { useAuth0 } from '@auth0/auth0-react';

export function UserProfile() {
  const { user, logout } = useAuth0();

  if (!user) return null;

  return (
    <div className='flex items-center gap-3'>
      <div className='text-right'>
        <div className='text-sm font-medium'>{user.name}</div>
        <div className='text-xs text-gray-500'>{user.email}</div>
      </div>
      {user.picture && (
        <img
          src={user.picture}
          alt={user.name}
          className='w-8 h-8 rounded-full'
        />
      )}
      <button
        onClick={() =>
          logout({
            logoutParams: {
              returnTo:
                import.meta.env.VITE_REDIRECT_URI ?? 'http://localhost:5173',
            },
          })
        }
        className='text-xs px-3 py-1.5 border rounded-lg hover:bg-gray-50'
      >
        Sign out
      </button>
    </div>
  );
}
