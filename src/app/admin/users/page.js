"use client";
import { useEffect, useState } from "react";
import { getUsers } from "@/api/admin/users";
import UsersTable from "@/components/admin/users/UsersTable";
import AddUsersButton from "@/components/admin/users/AddUsersButton";
import AddUsersModal from "@/components/admin/users/AddUsersModal";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">Gestione Utenti</h2>

      {loading ? (
        <p className="text-gray-500">Caricamento utenti...</p>
      ) : (
        <UsersTable users={users} />
      )}

      <AddUsersButton onClick={() => setModalOpen(true)} />

      {modalOpen && (
        <AddUsersModal
          onClose={() => setModalOpen(false)}
          onAdded={() => fetchUsers()}
        />
      )}
    </div>
  );
}
