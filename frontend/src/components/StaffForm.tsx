import { useState } from "react";
import { createStaff } from "../api";

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

type StaffFormProps = {
  onStaffCreated: (staffMember: StaffMember) => void;
};

const roles = [
  { id: 1, name: "Server" },
  { id: 2, name: "Cook" },
  { id: 3, name: "Manager" },
];

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
            type="text"
            name="phone_number"
            value={form.phone_number}
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

        <button type="submit">Add Staff Member</button>
      </form>

      {error && <p className="error">{error}</p>}
    </section>
  );
}

export default StaffForm;