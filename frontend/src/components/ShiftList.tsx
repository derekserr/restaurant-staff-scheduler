import type { Shift } from "./types";

type ShiftListProps = {
  shifts: Shift[];
};

function ShiftList({ shifts }: ShiftListProps) {
  return (
    <section className="card">
      <h2>Shifts</h2>

      {!shifts.length && (
        <p>No shifts found.</p>
      )}

      <div className="shift-list">
        {shifts.map((shift) => (
          <article key={shift.id} className="shift-item">
            <div>
              <h3>{shift.shift_date}</h3>
              <p>
                {shift.start_time} - {shift.end_time}
              </p>
            </div>

            <div>
              <p>{shift.role.name}</p>
              <p>
                {shift.staff_member?.name ?? "Unassigned"}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ShiftList;