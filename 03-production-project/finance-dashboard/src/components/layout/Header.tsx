export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Finance Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Welcome back!</span>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
