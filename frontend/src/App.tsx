import { useEffect, useState } from "react";
import { getStaff } from "./api";
import StaffForm from "./components/StaffForm";
import "./App.css";

type StaffMember = {
  id: number;
  name: string;
  phone_number: string;
  role_id: number;
  role?: {
    id: number;
    name: string;
  };
};

function App() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadStaff() {
    try {
      setLoading(true);
      setError("");

      const data = await getStaff();
      setStaff(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load staff."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStaff();
  }, []);

  function handleStaffCreated(newStaffMember: StaffMember) {
    setStaff((currentStaff) => [
      ...currentStaff,
      newStaffMember,
    ]);
  }

  return (
    <main className="app">
      <header>
        <h1>Restaurant Staff Scheduler</h1>
      </header>

      <StaffForm onStaffCreated={handleStaffCreated} />

      <section className="card">
        <h2>Staff Members</h2>

        {error && <p className="error">{error}</p>}

        {loading && <p>Loading staff...</p>}

        {!loading && staff.length === 0 && (
          <p>No staff members found.</p>
        )}

        <div className="staff-list">
          {staff.map((member) => (
            <article key={member.id} className="staff-item">
              <div>
                <h3>{member.name}</h3>
                <p>{member.phone_number}</p>
              </div>

              <span>
                {member.role?.name ?? "Unknown role"}
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;