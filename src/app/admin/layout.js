import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Contenuto */}
      <div className="flex flex-col flex-1">
        <AdminNavbar />
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
