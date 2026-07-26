import { useEffect, useState } from "react";
import roles from "./components/roles";
import { getStaff, getShifts } from "./api";
import StaffForm from "./components/StaffForm";
import StaffList from "./components/StaffList";
import ShiftForm from "./components/ShiftForm";
import ShiftList from "./components/ShiftList";

import type { Shift, StaffMember } from "./components/types"
import "./App.css";


function App() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [shifts, setShifts] = useState<Shift[]>([]);

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

    async function loadShifts() {
    try {
      setLoading(true);
      setError("");

      const data = await getShifts();
      setShifts(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load shifts."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStaff();
    loadShifts();
  }, []);

  function handleStaffCreated(newStaffMember: StaffMember) {
    setStaff((currentStaff) => [
      ...currentStaff,
      newStaffMember,
    ]);
  }

  function handleStaffDeleted(staffId: number){
    setStaff((currentStaff) =>
    currentStaff.filter((staff) => staff.id !== staffId));
    loadShifts();
  }

  function handleShiftAssignment(updatedShift: Shift){
    setShifts((currentShifts) => currentShifts.map((shift) => shift.id === updatedShift.id ? updatedShift: shift));
  }

  function handleShiftDeleted(shiftId: number) {
    setShifts((current) =>
    current.filter((shift) => shift.id !== shiftId));
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
        <StaffList staff={staff} onStaffDeleted={handleStaffDeleted}/>
      </section>

      <section className="card">
        <ShiftForm
          roles={roles}
          onShiftCreated={(newShift) =>
            setShifts((current) => [...current, newShift])
          }
        />
      </section>

      <ShiftList shifts={shifts} staff={staff} onShiftAssigned={handleShiftAssignment} onShiftDeleted={handleShiftDeleted}/>
    </main>
  );
}

export default App;