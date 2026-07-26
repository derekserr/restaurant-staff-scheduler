import { useState } from "react";
import { createShift } from "../api"
import type { Shift, Role } from "./types";

type ShiftFormProps = {
  roles: Role[];
  onShiftCreated: (shift: Shift) => void;
};

function ShiftForm({ roles, onShiftCreated }: ShiftFormProps) {
  const [form, setForm] = useState({
    shift_date: "",
    start_time: "",
    end_time: "",
    role_id: 1,
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: name === "role_id" ? Number(value) : value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const newShift = await createShift(form);
      onShiftCreated(newShift);
      
      setForm({
        shift_date: "",
        start_time: "",
        end_time: "",
        role_id: 1,
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not create shift."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section>
      <h2>Create Shift</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Date
          <input
            type="date"
            name="shift_date"
            value={form.shift_date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Start time
          <input
            type="time"
            name="start_time"
            value={form.start_time}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          End time
          <input
            type="time"
            name="end_time"
            value={form.end_time}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Role
          <select
            name="role_id"
            value={form.role_id}
            onChange={handleChange}
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Create Shift"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </section>
  );
}

export default ShiftForm;