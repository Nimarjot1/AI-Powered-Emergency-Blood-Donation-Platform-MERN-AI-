import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonorForm = () => {
  const [donor, setDonor] = useState({ 
    name: '', 
    location: '', 
    age: '', 
    bloodType: '', 
    rhFactor: '' 
  });
  
  const [donorsList, setDonorsList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // API base URL
  const API_URL = 'http://localhost:5005/api/donors';

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(API_URL);
        setDonorsList(response.data);
      } catch (err) {
        console.error('Error fetching donors:', err);
        setError('Failed to fetch donors. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonor({ ...donor, [name]: value });
    setError('');
    setSuccessMessage('');
  };

  const handleBloodGroupClick = (group) => {
    setDonor({ ...donor, bloodType: group });
    setError('');
    setSuccessMessage('');
  };

  const handleRhClick = (factor) => {
    setDonor({ ...donor, rhFactor: factor });
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!donor.name || !donor.location || !donor.age || !donor.bloodType || !donor.rhFactor) {
      setError('Please fill in all required fields.');
      return;
    }

    if (isNaN(donor.age)) {
      setError('Age must be a number.');
      return;
    }

    try {
      setIsLoading(true);
      let response;

      if (editIndex !== null) {
        // Update existing donor
        const donorToUpdate = donorsList[editIndex];
        response = await axios.put(`${API_URL}/${donorToUpdate._id}`, donor);
        const updatedList = donorsList.map((item, index) => 
          index === editIndex ? response.data : item
        );
        setDonorsList(updatedList);
        setEditIndex(null);
        setSuccessMessage('Donor information updated successfully!');
      } else {
        // Create new donor
        response = await axios.post(API_URL, donor);
        setDonorsList([...donorsList, response.data]);
        setSuccessMessage('Donor information added successfully!');
      }

      // Reset form
      setDonor({ name: '', location: '', age: '', bloodType: '', rhFactor: '' });
      setError('');
    } catch (err) {
      console.error('Error saving donor:', err);
      setError(err.response?.data?.error || 'Failed to save donor information. Please try again.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleEdit = (index) => {
    setDonor(donorsList[index]);
    setEditIndex(index);
    setError('');
    setSuccessMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (index) => {
    if (!window.confirm('Are you sure you want to delete this donor?')) {
      return;
    }

    try {
      setIsLoading(true);
      const donorToDelete = donorsList[index];
      await axios.delete(`${API_URL}/${donorToDelete._id}`);
      setDonorsList(donorsList.filter((_, i) => i !== index));
      setSuccessMessage('Donor deleted successfully!');
    } catch (err) {
      console.error('Error deleting donor:', err);
      setError(err.response?.data?.error || 'Failed to delete donor. Please try again.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleCancelEdit = () => {
    setDonor({ name: '', location: '', age: '', bloodType: '', rhFactor: '' });
    setEditIndex(null);
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="px-6 md:px-16 py-10 w-full min-h-screen bg-[#fff8f8]">
      <h2 className="text-4xl font-bold mb-10 text-red-700 text-center">Donate Blood</h2>
      
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-medium">Processing...</p>
          </div>
        </div>
      )}

      {/* Success and Error Messages */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-10">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-5 bg-white p-6 rounded-xl shadow-md transition hover:shadow-lg">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={donor.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Location (City)</label>
            <input
              type="text"
              name="location"
              placeholder="Enter your city"
              value={donor.location}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              value={donor.age}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              required
              min="18"
              max="65"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 transition-all text-white font-semibold py-2 rounded-lg"
            >
              {editIndex !== null ? 'Update Donor' : 'Submit Donor Info'}
            </button>
            
            {editIndex !== null && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex-1 bg-gray-500 hover:bg-gray-600 transition-all text-white font-semibold py-2 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Blood Group & Rh Factor */}
        <div className="flex-1 border border-gray-200 rounded-xl p-6 bg-white shadow-md transition hover:shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-red-600">Select Blood Group</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {['A', 'B', 'O', 'AB'].map((group) => (
              <button
                key={group}
                type="button"
                className={`py-2 rounded-lg transition-all ${
                  donor.bloodType === group
                    ? 'bg-red-600 text-white'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
                onClick={() => handleBloodGroupClick(group)}
              >
                {group}
              </button>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-2 text-red-600">Select Rh Factor</h3>
          <div className="grid grid-cols-2 gap-4">
            {['+', '-'].map((factor) => (
              <button
                key={factor}
                type="button"
                className={`py-2 rounded-lg transition-all ${
                  donor.rhFactor === factor
                    ? 'bg-red-600 text-white'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
                onClick={() => handleRhClick(factor)}
              >
                {factor}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="mt-12">
        <h3 className="text-3xl font-bold text-red-700 mb-6">Donor Dashboard</h3>
        {donorsList.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <p className="text-gray-500">No donor information available yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-xl">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Location</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Age</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Blood Group</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {donorsList.map((item, index) => (
                  <tr key={item._id} className="hover:bg-red-50 transition-all">
                    <td className="py-3 px-4 text-sm text-gray-700">{item.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{item.location}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{item.age}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{item.bloodType}{item.rhFactor}</td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(index)}
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="Edit"
                        >
                          ✎
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="text-red-600 hover:text-red-800 transition"
                          title="Delete"
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorForm;