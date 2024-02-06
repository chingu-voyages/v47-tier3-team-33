import React, { useState } from 'react';

const AccountInformationPage: React.FC = () => {
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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    type: string
  ) => {
    switch (type) {
      case 'contactInfo':
        setContactInfo((prev) => ({ ...prev, [field]: e.target.value }));
        break;
      case 'homeAddress':
        setHomeAddress((prev) => ({ ...prev, [field]: e.target.value }));
        break;
      case 'billingAddress':
        setBillingAddress((prev) => ({ ...prev, [field]: e.target.value }));
        break;
      case 'shippingAddress':
        setShippingAddress((prev) => ({ ...prev, [field]: e.target.value }));
        break;
      case 'workAddress':
        setWorkAddress((prev) => ({ ...prev, [field]: e.target.value }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit form data or perform validation here
    console.log({
      photo,
      prefix,
      contactInfo,
      homeAddress,
      billingAddress,
      shippingAddress,
      workAddress,
    });
  };

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
    <div className="bg-white rounded-md shadow-md p-8 space-y-8 max-w-5xl w-full overflow-y-auto pb-20">

      <h1 className="text-2xl font-semibold mb-4">Account Information</h1>
      <form onSubmit={handleSubmit}>
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
          <input
            type="text"
            placeholder="Prefix"
            className="input"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
          />
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
        <button
          type="submit"
          className="bg-pink text-white py-2 px-4 rounded hover:bg-yellow"
        >
          Save Changes
        </button>
      </form>
    </div>
    </div>
  );
};

export default AccountInformationPage;
