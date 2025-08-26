"use client";

import Link from "next/link";
import { Home, Users, Briefcase, Construction, Building2 } from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 font-bold text-xl border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/admin"
              className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded"
            >
              <Home size={18}/> Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/admin/users"
              className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded"
            >
              <Users size={18}/> Utenti
            </Link>
          </li>
          <li>
            <Link
              href="/admin/commesse"
              className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded"
            >
              <Briefcase size={18}/> Commesse
            </Link>
          </li>
          <li>
            <Link
              href="/admin/cantieri"
              className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded"
            >
              <Construction size={18}/> Cantieri
            </Link>
          </li>
          <li>
            <Link
              href="/admin/owners"
              className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded"
            >
              <Building2 size={18}/> Owners
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
