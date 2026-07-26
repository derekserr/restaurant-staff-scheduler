import { useState } from "react";
import { createStaff } from "../api";
import roles from "./roles";

import type { StaffMember } from "./types"

type StaffFormProps = {
  onStaffCreated: (staffMember: StaffMember) => void;
};

function StaffForm({ onStaffCreated }: StaffFormProps) {
  const [form, setForm] = useState({
    name: "",
    phone_number: "",
    role_id: 1,
  });

  const [error, setError] = useState("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: name === "role_id" ? Number(value) : value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setError("");

      const newStaffMember = await createStaff(form);

      onStaffCreated(newStaffMember);

      setForm({
        name: "",
        phone_number: "",
        role_id: 1,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create staff member."
      );
    }
  }

  return (
    <section className="card">
      <h2>Add Staff Member</h2>

      <form onSubmit={handleSubmit} className="staff-form">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            name="phone_number"
            value={form.phone_number}
            onChange={handleChange}
            placeholder="123-456-7890"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            title="Enter a phone number in the format 123-456-7890"
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

        <button type="submit">Add Staff Member</button>
      </form>

      {error && <p className="error">{error}</p>}
    </section>
  );
}

export default StaffForm;