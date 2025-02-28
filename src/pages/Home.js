import React, { useState, useEffect } from "react";
import DonorForm from "../components/DonorForm";
import DonorList from "../components/DonorList";
import { getDonors } from "../api";

function Home() {
  const [donors, setDonors] = useState([]);

  const fetchDonors = async () => {
    const data = await getDonors();
    setDonors(data);
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <div className="home">
      <h1 className="home-title">Emergency Blood Donation System</h1>
      <DonorForm fetchDonors={fetchDonors} />
      <DonorList donors={donors} fetchDonors={fetchDonors} />
    </div>
  );
}

export default Home;