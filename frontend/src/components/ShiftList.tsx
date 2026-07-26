import type { Shift, StaffMember } from "./types";
import { useState } from "react";
import { assignShift } from "../api";

type ShiftListProps = {
  shifts: Shift[];
  staff: StaffMember[];
  onShiftAssigned: (updatedShift: Shift) => void;
};

function ShiftList({
  shifts,
  staff,
  onShiftAssigned,
}: ShiftListProps) {
  const [selectedStaff, setSelectedStaff] = useState<Record<number, string>>(
    {}
  );

  const [error, setError] = useState("");

  async function handleAssignShift(shiftId: number) {
    const staffMemberId = selectedStaff[shiftId];

    if (!staffMemberId) {
      setError("Select a staff member.");
      return;
    }

    setError("");

    try {
      const updatedShift = await assignShift(
        shiftId,
        Number(staffMemberId)
      );

      onShiftAssigned(updatedShift);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not assign shift."
      );
    }
  }

  return (
    <section className="card">
      <h2>Shifts</h2>

      {error && <p className="error">{error}</p>}

      {!shifts.length && (
        <p>No shifts found.</p>
      )}

      <div className="shift-list">
        {shifts.map((shift) => (
          <article key={shift.id} className="shift-item">
            <div>
              <h3>{shift.shift_date}</h3>
            <p>
                {shift.start_time.slice(0, 5)} -{" "}
                {shift.end_time.slice(0, 5)}             
            </p>
            </div>

            <div>
              <p>{shift.role.name}</p>
              <p>
                {shift.staff_member?.name ?? "Unassigned"}
              </p>
            </div>

            {!shift.staff_member && (
              <div>
                <select
                  value={selectedStaff[shift.id] ?? ""}
                  onChange={(event) =>
                    setSelectedStaff((current) => ({
                      ...current,
                      [shift.id]: event.target.value,
                    }))
                  }
                >
                  <option value="">Select staff</option>

                  {staff
                    .filter(
                      (member) => member.role_id === shift.role.id
                    )
                    .map((member) => (
                      <option
                        key={member.id}
                        value={member.id}
                      >
                        {member.name}
                      </option>
                    ))}
                </select>

                <button
                  type="button"
                  onClick={() =>
                    handleAssignShift(shift.id)
                  }
                >
                  Assign
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default ShiftList;