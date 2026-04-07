import { useAuth0 } from '@auth0/auth0-react';

export function LoginPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='bg-white border rounded-xl p-10 max-w-sm w-full text-center'>
        <h1 className='text-2xl font-semibold mb-2'>Job tracker</h1>
        <p className='text-sm text-gray-500 mb-8'>
          Sign in to access your applications.
        </p>
        <button
          onClick={() => loginWithRedirect()}
          className='w-full py-2.5 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700'
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
