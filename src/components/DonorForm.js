import React, { useState } from "react";
import { addDonor } from "../api";

function DonorForm({ fetchDonors }) {
  const [name, setName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donor = { name, bloodType, location };
    await addDonor(donor);
    fetchDonors();
    setName("");
    setBloodType("");
    setLocation("");
  };

  return (
    <form className="donor-form" onSubmit={handleSubmit}>
      <h2>Add New Donor</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Blood Type (e.g., A+)"
        value={bloodType}
        onChange={(e) => setBloodType(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Add Donor</button>
    </form>
  );
}

export default DonorForm;