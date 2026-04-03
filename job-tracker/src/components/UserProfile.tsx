import { useMsal } from '@azure/msal-react';

export function UserProfile() {
  const { instance, accounts } = useMsal();
  const account = accounts[0];

  function handleLogout() {
    instance.logoutRedirect();
  }

  if (!account) return null;

  return (
    <div className='flex items-center gap-3'>
      <div className='text-right'>
        <div className='text-sm font-medium'>{account.name}</div>
        <div className='text-xs text-gray-500'>{account.username}</div>
      </div>
      <button
        onClick={handleLogout}
        className='text-xs px-3 py-1.5 border rounded-lg hover:bg-gray-50'
      >
        Sign out
      </button>
    </div>
  );
}
