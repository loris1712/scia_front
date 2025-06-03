import { useQuery } from "@tanstack/react-query";

const fetchJobExecutions = async () => {
  const res = await fetch("http://localhost:5000/job-executions");
  return res.json();
};

export default function JobExecutionsPage() {
  const { data, error, isLoading } = useQuery(["jobExecutions"], fetchJobExecutions);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Job Executions</h1>
      <ul className="space-y-2">
        {data.map((job) => (
          <li key={job.id} className="p-4 border rounded bg-gray-100">
            <p><strong>Job Name:</strong> {job.Job.name}</p>
            <p><strong>State:</strong> {job.JobStatus.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
