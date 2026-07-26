import type { StaffMember } from "./types";
import { deleteStaff } from "../api";
import { useState } from "react"

type StaffListProps = {
    staff: StaffMember[];
    onStaffDeleted: (staffId: number) => void;
};

function StaffList({ staff, onStaffDeleted }: StaffListProps){
    const [error, setError] = useState("");
    

    async function handleDeleteStaff(staffId: number){
        try{
            await deleteStaff(staffId);
            onStaffDeleted(staffId);
        } catch (error){
            setError(error instanceof Error ? error.message : "Could not delete staff");
        }
    }
    return(
        <div>

        {error && <p className="error">{error}</p>}

        {!staff.length && (
          <p>No staff members found.</p>
        )}
            <div className="staff-list">
            {staff.map((member) => (
                <article key={member.id} className="staff-item">

                <button
                    className="delete-button"
                    onClick={() => handleDeleteStaff(member.id)}
                    aria-label="Delete staff member"
                    title="Delete staff member"
                >
                    🗑️
                </button>
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
        </div>
    )
}

export default StaffList;
