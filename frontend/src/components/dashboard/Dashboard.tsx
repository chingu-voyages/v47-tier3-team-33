import React, { useState } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [prefix, setPrefix] = useState('');
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    website: '',
    homePhone: '',
    jobTitle: '',
  });
  const [homeAddress, setHomeAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [billingAddress, setBillingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [workAddress, setWorkAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const prefixOptions = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.'];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handlePrefixChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrefix(e.target.value);
  };


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    type: string
  ) => {
    
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('photo', photo as File);
      formData.append('prefix', prefix);
      // Append other form fields to formData...

      const response = await axios.post('/api/formdata', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      
      console.log(response.data);

     
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-md shadow-md p-8 space-y-8 max-w-4xl w-full overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-4 text-center">Account Information</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Photo */}
        <div className="mb-8">
           <h1 className="text-xl font-semibold text-black mb-4">Upload Photo</h1>
          <input
            type="file"
            accept="image/*"
            className="input"
            onChange={handlePhotoChange}
          />
        </div>
        {/* Prefix */}
		<div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Prefix</h2>
            <select
              value={prefix}
              onChange={handlePrefixChange}
              className="input"
            >
              <option value="">Select Prefix</option>
              {prefixOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        {/* First and Last Name */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Name</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="input"
              value={contactInfo.firstName}
              onChange={(e) => handleInputChange(e, 'firstName', 'contactInfo')}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input"
              value={contactInfo.lastName}
              onChange={(e) => handleInputChange(e, 'lastName', 'contactInfo')}
            />
          </div>
        </div>
        {/* Contact Information */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Add contact fields */}
            <input
              type="email"
              placeholder="Email"
              className="input"
              value={contactInfo.email}
              onChange={(e) => handleInputChange(e, 'email', 'contactInfo')}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="input"
              value={contactInfo.phoneNumber}
              onChange={(e) => handleInputChange(e, 'phoneNumber', 'contactInfo')}
            />
            <input
              type="text"
              placeholder="Website"
              className="input"
              value={contactInfo.website}
              onChange={(e) => handleInputChange(e, 'website', 'contactInfo')}
            />
            <input
              type="tel"
              placeholder="Home Phone"
              className="input"
              value={contactInfo.homePhone}
              onChange={(e) => handleInputChange(e, 'homePhone', 'contactInfo')}
            />
            <input
              type="text"
              placeholder="Job Title"
              className="input"
              value={contactInfo.jobTitle}
              onChange={(e) => handleInputChange(e, 'jobTitle', 'contactInfo')}
            />
          </div>
        </div>
        {/* Home Address */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Home Address</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Add home address fields */}
            <input
              type="text"
              placeholder="Street"
              className="input"
              value={homeAddress.street}
              onChange={(e) => handleInputChange(e, 'street', 'homeAddress')}
            />
            <input
              type="text"
              placeholder="City"
              className="input"
              value={homeAddress.city}
              onChange={(e) => handleInputChange(e, 'city', 'homeAddress')}
            />
            <input
              type="text"
              placeholder="State"
              className="input"
              value={homeAddress.state}
              onChange={(e) => handleInputChange(e, 'state', 'homeAddress')}
            />
            <input
              type="text"
              placeholder="Zip"
              className="input"
              value={homeAddress.zip}
              onChange={(e) => handleInputChange(e, 'zip', 'homeAddress')}
            />
            <input
              type="text"
              placeholder="Country"
              className="input"
              value={homeAddress.country}
              onChange={(e) => handleInputChange(e, 'country', 'homeAddress')}
            />
          </div>
        </div>
        {/* Billing Address */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Billing Address</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Billing Street"
              className="input"
              value={billingAddress.street}
              onChange={(e) => handleInputChange(e, 'street', 'billingAddress')}
            />
            <input
              type="text"
              placeholder="Billing City"
              className="input"
              value={billingAddress.city}
              onChange={(e) => handleInputChange(e, 'city', 'billingAddress')}
            />
            <input
              type="text"
              placeholder="Billing State"
              className="input"
              value={billingAddress.state}
              onChange={(e) => handleInputChange(e, 'state', 'billingAddress')}
            />
            <input
              type="text"
              placeholder="Billing Zip"
              className="input"
              value={billingAddress.zip}
              onChange={(e) => handleInputChange(e, 'zip', 'billingAddress')}
            />
            <input
              type="text"
              placeholder="Billing Country"
              className="input"
              value={billingAddress.country}
              onChange={(e) => handleInputChange(e, 'country', 'billingAddress')}
            />
          </div>
        </div>
        {/* Shipping Address */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Shipping Street"
              className="input"
              value={shippingAddress.street}
              onChange={(e) => handleInputChange(e, 'street', 'shippingAddress')}
            />
            <input
              type="text"
              placeholder="Shipping City"
              className="input"
              value={shippingAddress.city}
              onChange={(e) => handleInputChange(e, 'city', 'shippingAddress')}
            />
            <input
              type="text"
              placeholder="Shipping State"
              className="input"
              value={shippingAddress.state}
              onChange={(e) => handleInputChange(e, 'state', 'shippingAddress')}
            />
            <input
              type="text"
              placeholder="Shipping Zip"
              className="input"
              value={shippingAddress.zip}
              onChange={(e) => handleInputChange(e, 'zip', 'shippingAddress')}
            />
            <input
              type="text"
              placeholder="Shipping Country"
              className="input"
              value={shippingAddress.country}
              onChange={(e) => handleInputChange(e, 'country', 'shippingAddress')}
            />
          </div>
        </div>
        {/* Work Address */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Work Address</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Work Street"
              className="input"
              value={workAddress.street}
              onChange={(e) => handleInputChange(e, 'street', 'workAddress')}
            />
            <input
              type="text"
              placeholder="Work City"
              className="input"
              value={workAddress.city}
              onChange={(e) => handleInputChange(e, 'city', 'workAddress')}
            />
            <input
              type="text"
              placeholder="Work State"
              className="input"
              value={workAddress.state}
              onChange={(e) => handleInputChange(e, 'state', 'workAddress')}
            />
            <input
              type="text"
              placeholder="Work Zip"
              className="input"
              value={workAddress.zip}
              onChange={(e) => handleInputChange(e, 'zip', 'workAddress')}
            />
            <input
              type="text"
              placeholder="Work Country"
              className="input"
              value={workAddress.country}
              onChange={(e) => handleInputChange(e, 'country', 'workAddress')}
            />
          </div>
        </div>
		<div className="flex justify-center">
      <button
        type="submit"
        className="w-full bg-pink text-white py-2 px-4 rounded hover:bg-pink-600"
      >
        Save Changes
      </button>
    </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;



