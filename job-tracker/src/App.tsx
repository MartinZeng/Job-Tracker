import { useState } from 'react';
import { useApplications } from './hooks/useApplications';
import type { Application, AppStatus } from './types/Application';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { UserProfile } from './components/UserProfile';
import { StatusSelect } from './components/StatusSelect';
import { ActionMenu } from './components/ActionMenu';

const STATUSES: AppStatus[] = [
  'Not applied',
  'Saved',
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
  'Ghosted',
];

const STATUS_FILTER_STYLES: Record<AppStatus, { bg: string; text: string }> = {
  'Not applied': { bg: '#f1f5f9', text: '#475569' },
  Saved: { bg: '#FAEEDA', text: '#633806' },
  Applied: { bg: '#E6F1FB', text: '#0C447C' },
  Interview: { bg: '#EAF3DE', text: '#27500A' },
  Offer: { bg: '#E1F5EE', text: '#085041' },
  Rejected: { bg: '#FCEBEB', text: '#791F1F' },
  Ghosted: { bg: '#F1EFE8', text: '#444441' },
};

const empty = (): Omit<Application, 'id' | 'createdAt'> => ({
  company: '',
  role: '',
  status: 'Not applied',
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

  const now = new Date();
  const lastUpdated = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const lastUpdatedDate = now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

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

  return (
    <div className='max-w-5xl mx-auto p-6'>
      {/* Header */}
      <div className='flex items-center justify-between pb-4 border-b border-gray-100 mb-4'>
        <div>
          <h1 className='text-lg font-semibold text-gray-900 tracking-tight'>
            Job applications
          </h1>
          <p className='text-xs text-gray-400 mt-1'>
            Last updated {lastUpdatedDate} at {lastUpdated}
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <UserProfile />
        </div>
      </div>

      {/* Pill filters */}
      <div className='flex gap-2 mb-4 flex-wrap'>
        <button
          onClick={() => setFilter('')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            filter === ''
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {STATUSES.map((s) => {
          const style = STATUS_FILTER_STYLES[s];
          return (
            <button
              key={s}
              onClick={() => setFilter(s === filter ? '' : s)}
              style={
                filter === s
                  ? { backgroundColor: style.bg, color: style.text }
                  : {}
              }
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === s
                  ? ''
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {s}
            </button>
          );
        })}
        <div className='ml-auto'>
          <button
            onClick={openAdd}
            className='px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700'
          >
            + Add application
          </button>
        </div>
      </div>

      {/* Search */}
      <div className='mb-4'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search company or role...'
          className='w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:border-gray-400'
        />
      </div>

      {/* Table */}
      <div className='border border-gray-100 rounded-xl overflow-visible'>
        <table className='w-full' style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr className='bg-gray-50 border-b border-gray-100 rounded-t-xl'>
              {[
                'Company / role',
                'Status',
                'Applied',
                'Location',
                'Salary',
                '',
              ].map((h) => (
                <th
                  key={h}
                  className='text-left text-xs text-gray-400 font-medium uppercase tracking-wide px-3 py-2'
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className='text-center py-10 text-sm text-gray-400'
                >
                  No applications yet
                </td>
              </tr>
            )}
            {filtered.map((a, i) => (
              <tr
                key={a.id}
                style={{
                  borderBottom:
                    i < filtered.length - 1 ? '0.5px solid #f5f5f5' : 'none',
                }}
              >
                <td className='px-3 py-3'>
                  <div className='text-sm font-medium text-gray-900'>
                    {a.company || '—'}
                  </div>
                  {a.role && (
                    <div className='text-xs text-gray-400 mt-0.5'>{a.role}</div>
                  )}
                </td>
                <td className='px-3 py-3'>
                  <StatusSelect
                    value={a.status}
                    onChange={(status) => updateApp(a.id, { ...a, status })}
                  />
                </td>
                <td className='px-3 py-3 text-xs text-gray-400 whitespace-nowrap'>
                  {a.dateApplied || '—'}
                </td>
                <td className='px-3 py-3 text-xs text-gray-400'>
                  {a.location || '—'}
                </td>
                <td className='px-3 py-3 text-xs text-gray-400 whitespace-nowrap'>
                  {a.salary || '—'}
                </td>
                <td className='px-3 py-3'>
                  <ActionMenu
                    onEdit={() => openEdit(a)}
                    onDelete={() => deleteApp(a.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className='fixed inset-0 bg-black/30 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 w-full max-w-md shadow-xl'>
            <h2 className='text-base font-semibold mb-4'>
              {editId ? 'Edit' : 'Add'} application
            </h2>
            {(['company', 'role', 'salary', 'location', 'link'] as const).map(
              (f) => (
                <input
                  key={f}
                  placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                  value={form[f]}
                  onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                  className='w-full mb-3 px-3 py-2 text-sm border border-gray-200 rounded-lg'
                />
              ),
            )}
            <input
              type='date'
              value={form.dateApplied}
              onChange={(e) =>
                setForm({ ...form, dateApplied: e.target.value })
              }
              className='w-full mb-3 px-3 py-2 text-sm border border-gray-200 rounded-lg'
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
              className='w-full mb-4 px-3 py-2 text-sm border border-gray-200 rounded-lg resize-none'
              rows={3}
            />
            <div className='flex justify-end gap-2'>
              <button
                onClick={() => setModal(false)}
                className='px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50'
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
