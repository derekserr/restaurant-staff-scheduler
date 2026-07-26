const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function getStaff() {
  const response = await fetch(`${API_BASE_URL}/staff`);

  if (!response.ok) {
    throw new Error("Failed to load staff.");
  }

  return response.json();
}

export async function createStaff(payload) {
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