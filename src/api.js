const API_URL = "http://localhost:5001/api/donors";

export const getDonors = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

export const addDonor = async (donor) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(donor),
  });
  return await response.json();
};

export const deleteDonor = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};