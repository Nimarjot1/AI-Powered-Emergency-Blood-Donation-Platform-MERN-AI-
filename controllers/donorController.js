const Donor = require('../models/Donor');

exports.createDonor = async (req, res) => {
  try {
    const { name, location, age, bloodType, rhFactor } = req.body;
    
    if (!name || !location || !age || !bloodType || !rhFactor) {
      return res.status(400).json({ error: 'Please fill all required fields' });
    }

    const donor = new Donor({
      name,
      location,
      age,
      bloodType,
      rhFactor,
    });

    await donor.save();
    res.status(201).json(donor);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, age, bloodType, rhFactor } = req.body;

    const donor = await Donor.findByIdAndUpdate(
      id,
      { name, location, age, bloodType, rhFactor },
      { new: true }
    );

    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    res.json(donor);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const donor = await Donor.findByIdAndDelete(id);

    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    res.json({ message: 'Donor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};