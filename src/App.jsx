import { useState } from 'react';
import './App.css';
import DOMPurify from 'dompurify';

const App = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    favoriteNumber: '',
    favoriteMammal: '',
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.phoneNumber.match(/^\d{10}$/)) newErrors.phoneNumber = 'Phone Number must be 10 digits';
    if (!formData.favoriteNumber || formData.favoriteNumber < 1 || formData.favoriteNumber > 100) newErrors.favoriteNumber = 'Favorite Number must be between 1 and 100';
    if (!formData.favoriteMammal) newErrors.favoriteMammal = 'Favorite Mammal is required';
    if (!formData.address) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    setFormData({ ...formData, [e.target.name]: sanitizedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost:3001/api/saveProfile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const result = await response.json();
        if (response.ok) {
          setIsModalOpen(true);
        } else {
          alert('Error: ' + result.error);
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>User Profile</h2>
        <div className="form-group">
          <label>Full Name</label><br />
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} /><br />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number</label><br />
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} /><br />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>
        <div className="form-group">
          <label>Favorite Number</label><br />
          <input type="number" name="favoriteNumber" value={formData.favoriteNumber} onChange={handleChange} /><br />
          {errors.favoriteNumber && <span className="error">{errors.favoriteNumber}</span>}
        </div>
        <div className="form-group">
          <label>Favorite Four-Legged Mammal</label><br />
          <input type="text" name="favoriteMammal" value={formData.favoriteMammal} onChange={handleChange} /><br />
          {errors.favoriteMammal && <span className="error">{errors.favoriteMammal}</span>}
        </div>
        <div className="form-group">
          <label>Address</label><br />
          <input type="text" name="address" value={formData.address} onChange={handleChange} /><br />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Form Submitted Successfully</h3>
            <p>Your form has been submitted successfully.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;