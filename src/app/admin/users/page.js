"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/api/admin/users";
import UsersTable from "@/components/admin/users/UsersTable";
import UsersFilters from "@/components/admin/users/UsersFilters";
import AddUsersButton from "@/components/admin/users/AddUsersButton";
import AddUsersModal from "@/components/admin/users/AddUsersModal";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ name: "", email: "", role: "", status: "" });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error("Errore nel fetch utenti:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) =>
    u.first_name.toLowerCase().includes(filters.name.toLowerCase()) &&
    (filters.role === "" || u.role === filters.role) &&
    (filters.status === "" || (filters.status === "attivo" ? u.active : !u.active))
  );

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">Gestione Utenti</h2>

      <UsersFilters filters={filters} setFilters={setFilters} />

      {loading ? (
        <p className="text-gray-500">Caricamento utenti...</p>
      ) : (
        <UsersTable users={filteredUsers} />
      )}

      <AddUsersButton onClick={() => setModalOpen(true)} />

      {modalOpen && <AddUsersModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
