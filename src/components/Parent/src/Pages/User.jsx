import React, { useState } from 'react';
import logo from '../assets/logo.png';
import './User.css';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const [formData, setFormData] = useState({
    parent_name: '',
    phone: '',
    child_name: '',
    dob: '',
    gender: '',
    emergency: '',
    emergency_ph: '',
    allergies: '',
    medical: '',
    medication: '',
    parentNIC: null,
    birth_certificate: null,
    child_image: null,
    medical_report: null,
    message: ''
  });

  const navigate = useNavigate();

  const handleSubmitd = () => {
    // Redirect to the dashboard
    navigate('/dashboard');
  };



  const handleFileUpload = (e, field) => {
    e.preventDefault();
    const fileInput = document.getElementById(field);
    fileInput.click();
  };

  const handleChangef = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : null,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Here you can handle form submission, like sending data to an API
  };

  return (
    <div className="user">
      <div className="container1">
        <img src={logo} alt="Logo" className='logo' />
        <h1>Update Child Info</h1>
      </div>

      <div className="container2">
        <div className="contact">
          <div className="contact-container">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="parent_name">Parent Full Name: </label>
                <input
                  type="text"
                  id="parent_name"
                  name="parent_name"
                  value={formData.parent_name}
                  onChange={handleChange}
                  placeholder="Parent Name"
                />
              </div>

              <div className="field">
                <label htmlFor="phone">Contact No: </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="07* *** ****"
                />
              </div>

              <div className="field">
                <label htmlFor="child_name">Child Full Name:</label>
                <input
                  type="text"
                  id="child_name"
                  name="child_name"
                  value={formData.child_name}
                  onChange={handleChange}
                  placeholder="Child Name"
                />
              </div>

              <div className="field">
                <label>Child Gender:</label>
                <label className="radio-container">
                  Male
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="radio-container">
                  Female
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>

              <div className="field">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  className='dob'
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label htmlFor="emergency">Emergency Contact (Name):</label>
                <input
                  type="text"
                  id="emergency"
                  name="emergency"
                  value={formData.emergency}
                  onChange={handleChange}
                  placeholder="Emergency Contact Name"
                />
              </div>

              <div className="field">
                <label htmlFor="emergency_ph">Emergency Contact (Phone Number):</label>
                <input
                  type="tel"
                  id="emergency_ph"
                  name="emergency_ph"
                  value={formData.emergency_ph}
                  onChange={handleChange}
                  placeholder="07* *** ****"
                />
              </div>

              <div className="field">
                <label htmlFor="allergies">Allergies:</label>
                <input
                  type="text"
                  id="allergies"
                  name="allergies"
                  className="box-field"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="Give a brief note about your child's allergies condition."
                />
              </div>

              <div className="field">
                <label htmlFor="medical">Medical Conditions:</label>
                <input
                  type="text"
                  id="medical"
                  name="medical"
                  className="box-field"
                  value={formData.medical}
                  onChange={handleChange}
                  placeholder="Give a brief note about your child's medical condition."
                />
              </div>

              <div className="field">
                <label htmlFor="medication">Medications:</label>
                <input
                  type="text"
                  id="medication"
                  name="medication"
                  className="box-field"
                  value={formData.medication}
                  onChange={handleChange}
                  placeholder="Give medication details."
                />
              </div>

              <div className="field">
                <label htmlFor="parentNIC">Parent's NIC/Passport:</label>
                <div className="upload-container">
                  <input
                    required
                    type="file"
                    id="parentNIC"
                    name="parentNIC"
                    style={{ display: 'none' }}
                    onChange={handleChangef}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <div className="upload-box">
                    <input
                      type="text"
                      readOnly
                      placeholder='PDF/JPG/JPEG/PNG only allowed'
                      value={formData.parentNIC ? formData.parentNIC.name : ''}
                    />
                  </div>
                  <button className="upload-button" onClick={(e) => handleFileUpload(e, 'parentNIC')}>Upload</button>
                </div>
              </div>

              <div className="field">
                <label htmlFor="birth_certificate">Child Birth Certificate:</label>
                <div className="upload-container">
                  <input
                    required
                    type="file"
                    id="birth_certificate"
                    name="birth_certificate"
                    style={{ display: 'none' }}
                    onChange={handleChangef}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <div className="upload-box">
                    <input
                      type="text"
                      readOnly
                      placeholder='PDF/JPG/JPEG/PNG only allowed'
                      value={formData.birth_certificate ? formData.birth_certificate.name : ''}
                    />
                  </div>
                  <button className="upload-button" onClick={(e) => handleFileUpload(e, 'birth_certificate')}>Upload</button>
                </div>
              </div>

              <div className="field">
                <label htmlFor="child_image">Child Image:</label>
                <div className="upload-container">
                  <input
                    required
                    type="file"
                    id="child_image"
                    name="child_image"
                    style={{ display: 'none' }}
                    onChange={handleChangef}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <div className="upload-box">
                    <input
                      type="text"
                      readOnly
                      placeholder='PDF/JPG/JPEG/PNG only allowed'
                      value={formData.child_image ? formData.child_image.name : ''}
                    />
                  </div>
                  <button className="upload-button" onClick={(e) => handleFileUpload(e, 'child_image')}>Upload</button>
                </div>
              </div>

              <div className="field">
                <label htmlFor="medical_report">Child Medical Report:</label>
                <div className="upload-container">
                  <input
                    required
                    type="file"
                    id="medical_report"
                    name="medical_report"
                    style={{ display: 'none' }}
                    onChange={handleChangef}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <div className="upload-box">
                    <input
                      type="text"
                      readOnly
                      placeholder='PDF/JPG/JPEG/PNG only allowed'
                      value={formData.medical_report ? formData.medical_report.name : ''}
                    />
                  </div>
                  <button className="upload-button" onClick={(e) => handleFileUpload(e, 'medical_report')}>Upload</button>
                </div>
              </div>

              <div className="field">
                <label htmlFor="message" className="resumeField">Leave a Note:</label>
                <textarea
                  id="message"
                  name="message"
                  className='message'
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Give a brief note about your child.? (Any special needs or details you need to inform us)"
                />
              </div>


              <button type="submit" name="submit" className="continue_button" onClick={handleSubmitd}>
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export default User;