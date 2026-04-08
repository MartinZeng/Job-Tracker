import { useState } from 'react';
import { useApplications } from './hooks/useApplications';
import type { Application, AppStatus } from './types/Application';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginPage } from './components/LoginPage';
import { UserProfile } from './components/UserProfile';
import { StatusSelect } from './components/StatusSelect';
import { SignUpPage } from './components/SignUpPage';

const STATUSES: AppStatus[] = [
  'Saved',
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
  'Ghosted',
];

const empty = (): Omit<Application, 'id' | 'createdAt'> => ({
  company: '',
  role: '',
  status: 'Applied',
  dateApplied: '',
  salary: '',
  location: '',
  link: '',
  notes: '',
});

export default function App() {
  const { apps, addApp, updateApp, deleteApp } = useApplications();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty());
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<AppStatus | ''>('');
  const [showSignUp, setShowSignUp] = useState(false);
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading)
    return (
      <div className='max-w-5xl mx-auto p-6 text-gray-400 text-sm'>
        Loading...
      </div>
    );

  if (!isAuthenticated) {
    return showSignUp ? (
      <SignUpPage onSignIn={() => setShowSignUp(false)} />
    ) : (
      <LoginPage onSignUp={() => setShowSignUp(true)} />
    );
  }

  const filtered = apps.filter((a) => {
    const q = search.toLowerCase();
    return (
      (!q ||
        a.company.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q)) &&
      (!filter || a.status === filter)
    );
  });

  function openAdd() {
    setForm(empty());
    setEditId(null);
    setModal(true);
  }

  function openEdit(a: Application) {
    const { id, ...rest } = a;
    setForm(rest);
    setEditId(id);
    setModal(true);
  }

  function save() {
    if (editId) updateApp(editId, form);
    else addApp(form);
    setModal(false);
  }
  if (isLoading)
    return (
      <div className='max-w-5xl mx-auto p-6 text-gray-400 text-sm'>
        Loading...
      </div>
    );

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-semibold'>Job applications</h1>
        <UserProfile />
        <button
          onClick={openAdd}
          className='px-4 py-2 text-sm border rounded-lg hover:bg-gray-50'
        >
          + Add application
        </button>
      </div>

      {/* Filters */}

      <div className='flex gap-3 mb-4'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search company or role...'
          className='flex-1 px-3 py-2 text-sm border rounded-lg'
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as AppStatus | '')}
          className='px-3 py-2 text-sm border rounded-lg'
        >
          <option value=''>All statuses</option>
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      {/* Table */}
      <table className='w-full text-sm'>
        <thead>
          <tr className='text-left text-xs text-gray-500 border-b'>
            <th className='pb-2 font-medium'>Company / role</th>
            <th className='pb-2 font-medium'>Status</th>
            <th className='pb-2 font-medium'>Applied</th>
            <th className='pb-2 font-medium'>Location</th>
            <th className='pb-2 font-medium'></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((a) => (
            <tr key={a.id} className='border-b hover:bg-gray-50'>
              <td className='py-3'>
                <div className='font-medium'>{a.company}</div>
                <div className='text-xs text-gray-500'>{a.role}</div>
              </td>
              <td>
                <StatusSelect
                  value={a.status}
                  onChange={(status) => updateApp(a.id, { ...a, status })}
                />
              </td>
              <td className='text-gray-500'>{a.dateApplied || '—'}</td>
              <td className='text-gray-500'>{a.location || '—'}</td>
              <td className='text-right'>
                <button
                  onClick={() => openEdit(a)}
                  className='px-2 py-1 text-xs border rounded mr-1 hover:bg-gray-50'
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteApp(a.id)}
                  className='px-2 py-1 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
      {modal && (
        <div className='fixed inset-0 bg-black/30 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 w-full max-w-md shadow-xl'>
            <h2 className='text-lg font-semibold mb-4'>
              {editId ? 'Edit' : 'Add'} application
            </h2>
            {(['company', 'role', 'salary', 'location', 'link'] as const).map(
              (f) => (
                <input
                  key={f}
                  placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                  value={form[f]}
                  onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                  className='w-full mb-3 px-3 py-2 text-sm border rounded-lg'
                />
              ),
            )}
            <input
              type='date'
              value={form.dateApplied}
              onChange={(e) =>
                setForm({ ...form, dateApplied: e.target.value })
              }
              className='w-full mb-3 px-3 py-2 text-sm border rounded-lg'
            />
            <div className='mb-3'>
              <StatusSelect
                value={form.status}
                onChange={(status) => setForm({ ...form, status })}
              />
            </div>

            <textarea
              placeholder='Notes'
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className='w-full mb-4 px-3 py-2 text-sm border rounded-lg resize-none'
              rows={3}
            />
            <div className='flex justify-end gap-2'>
              <button
                onClick={() => setModal(false)}
                className='px-4 py-2 text-sm border rounded-lg hover:bg-gray-50'
              >
                Cancel
              </button>
              <button
                onClick={save}
                className='px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700'
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
