import type { CreateStaffRequest, CreateShiftRequest } from "./components/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  "http://127.0.0.1:8000/api";

export async function getStaff() {
  const response = await fetch(`${API_BASE_URL}/staff`);

  if (!response.ok) {
    throw new Error("Failed to load staff.");
  }

  return response.json();
}

export async function createStaff(payload: CreateStaffRequest) {
  const response = await fetch(`${API_BASE_URL}/staff`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create staff member.");
  }

  return data;
}

export async function deleteStaff(id: number) {
  const response = await fetch(
    `${API_BASE_URL}/staff/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );


  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message ?? "Failed to delete staff.");
  }
}

export async function getShifts() {
  const response = await fetch(`${API_BASE_URL}/shifts`);

  if (!response.ok) {
    throw new Error("Failed to load shifts.");
  }

  return response.json();
}


export async function createShift(payload: CreateShiftRequest) {
  const response = await fetch(`${API_BASE_URL}/shifts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Failed to create shift.");
  }

  return data;
}

export async function assignShift(
  id: number,
  staffMemberId: number
) {
  const response = await fetch(
    `${API_BASE_URL}/shifts/${id}/assign`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        staff_member_id: staffMemberId,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Failed to assign shift.");
  }

  return data;
}

export async function deleteShift(id: number) {
  const response = await fetch(
    `${API_BASE_URL}/shifts/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );


  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message ?? "Failed to delete shift.");
  }
}