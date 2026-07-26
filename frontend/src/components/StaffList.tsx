type StaffMember = {
    id: number;
    name: string;
    phone_number: string;
    role: {
        id: number;
        name: string;
    };
};

type StaffListProps = {
    staff: StaffMember[];
};

function StaffList({ staff }: StaffListProps){
    return(
        <div>
        {!staff.length && (
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
        </div>
    )
}

export default StaffList;