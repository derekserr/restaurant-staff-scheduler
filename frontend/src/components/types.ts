export type Shift = {
  id: number;
  shift_date: string;
  start_time: string;
  end_time: string;
  role_id: number;
  staff_member_id: number | null;
  role: {
    id: number;
    name: string;
  };
  staff_member?: {
    id: number;
    name: string;
  } | null;
};

export type Role = {
  id: number;
  name: string;
};

export type StaffMember = {
  id: number;
  name: string;
  phone_number: string;
  role_id: number;
  role?: {
    id: number;
    name: string;
  };
};

export type CreateStaffRequest = {
  name: string;
  phone_number: string;
  role_id: number;
};