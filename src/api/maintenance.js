/*export async function fetchElementData(element) {
    const res = await fetch(`https://api.example.com/elements/${element}`);
    if (!res.ok) return null;
    return res.json();
  }*/
  

    export const maintenanceData = [
        {
          id: 1,
          job_id: "JOB-2025-001",
          state_id: 2, // 1 = In corso, 2 = Completato, 3 = Scaduto
          user_id: 101,
          element_eswbs_instance_id: "ESWBS-1001",
          starting_date: "2025-03-01",
          ending_date: "2025-03-15",
          data_recovery_expiration: "2025-03-20",
          execution_date: "2025-03-14",
          attachment_link: "https://example.com/report-001.pdf",
        },
        {
          id: 2,
          job_id: "JOB-2025-002",
          state_id: 1, // In corso
          user_id: 102,
          element_eswbs_instance_id: "ESWBS-1002",
          starting_date: "2025-03-10",
          ending_date: "2025-04-01",
          data_recovery_expiration: "2025-04-05",
          execution_date: null, // Ancora non eseguito
          attachment_link: null, // Nessun report ancora
        },
        {
          id: 3,
          job_id: "JOB-2025-003",
          state_id: 3, // Scaduto
          user_id: 103,
          element_eswbs_instance_id: "ESWBS-1003",
          starting_date: "2025-02-15",
          ending_date: "2025-03-05",
          data_recovery_expiration: "2025-03-10",
          execution_date: null, // Mai eseguito
          attachment_link: null, // Nessun report disponibile
        },
        {
          id: 4,
          job_id: "JOB-2025-004",
          state_id: 2, // Completato
          user_id: 104,
          element_eswbs_instance_id: "ESWBS-1004",
          starting_date: "2025-02-01",
          ending_date: "2025-02-20",
          data_recovery_expiration: "2025-02-25",
          execution_date: "2025-02-18",
          attachment_link: "https://example.com/report-004.pdf",
        },
        {
          id: 5,
          job_id: "JOB-2025-005",
          state_id: 1, // In corso
          user_id: 105,
          element_eswbs_instance_id: "ESWBS-1005",
          starting_date: "2025-03-15",
          ending_date: "2025-04-10",
          data_recovery_expiration: "2025-04-15",
          execution_date: null, // Ancora non eseguito
          attachment_link: null, // Nessun report ancora
        },
      ];