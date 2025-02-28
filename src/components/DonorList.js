import React from "react";
import { deleteDonor } from "../api";

function DonorList({ donors, fetchDonors }) {
  const handleDelete = async (id) => {
    await deleteDonor(id);
    fetchDonors();
  };

  return (
    <div className="donor-list">
      <h2>Available Donors</h2>
      {donors.length === 0 ? (
        <p>No donors available</p>
      ) : (
        donors.map((donor) => (
          <div key={donor.id} className="donor-card">
            <p><strong>Name:</strong> {donor.name}</p>
            <p><strong>Blood Type:</strong> {donor.bloodType}</p>
            <p><strong>Location:</strong> {donor.location}</p>
            <button onClick={() => handleDelete(donor.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default DonorList;