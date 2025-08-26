"use client";

export default function AdminNavbar() {
  return (
    <header className="h-14 bg-gray-900  shadow flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Pannello di Controllo</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
}
