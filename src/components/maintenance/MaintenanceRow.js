import StatusBadge from "./StatusBadge";
import Icons from "./Icons";

// Funzione per calcolare lo stato basato sulla data di scadenza
const calculateStatus = (expirationDate) => {
  if (!expirationDate) return "sconosciuto";

  const today = new Date();
  const dueDate = new Date(expirationDate);
  const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24)); // Differenza in giorni

  if (diffDays < 0) return "scaduto"; // Se la data è passata
  if (diffDays <= 7) return "in scadenza"; // Se scade in 7 giorni
  return "ok"; // Altrimenti è tutto ok
};

// Funzione per determinare il colore del bordo sinistro
const getStatusColor = (status) => {
  switch (status) {
    case "scaduto":
      return "#E63946"; // Rosso
    case "in scadenza":
      return "#FFA500"; // Arancione
    case "ok":
      return "#4CAF50"; // Verde
    default:
      return "#CCCCCC"; // Grigio per stati sconosciuti
  }
};

const MaintenanceRow = ({ data }) => {
  const status = calculateStatus(data.data_recovery_expiration); // 🔥 Calcolo dello stato dinamico

  return (
    <div
      className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center p-3 border-b border-white/20"
      style={{ borderLeft: `4px solid ${getStatusColor(status)}` }} // 🔥 Bordo sinistro colorato dinamicamente
    >
      <div>
        <p className="text-white font-semibold truncate">{data.job_id}</p>
        <p className="text-white/60 text-sm truncate">Elemento ID: {data.element_eswbs_instance_id}</p>
      </div>
      <div className="text-white">{data.user_id}</div>
      <div>
        <Icons icons={data.state_id} />
      </div>
      <div>
        <Icons icons={data.attachment_link ? ["📎"] : []} />
      </div>
      <StatusBadge dueDate={data.data_recovery_expiration} status={status} />
      <div className="w-8 flex items-center justify-center">
        <svg fill="white" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
          <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/>
        </svg>
      </div>
    </div>
  );
};

export default MaintenanceRow;
