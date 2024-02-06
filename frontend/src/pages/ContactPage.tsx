import React, { useState, FormEvent } from 'react';
import ContactHero from '../components/ContactHero';
import MessageConfirmation from '../components/MessegeConfirmation';
import emailjs, { init } from 'emailjs-com';

init('service_gl868wq'); // Replace 'user_your_user_id' with your EmailJS user ID

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serviceId = 'service_gl868wq';
    const templateId = 'template_4r3g9k9';
    const userId = 'lkKtYG8htjcfDXE3T';

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'Omni Events',
      message: message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log('Email sent successfully:', response);
        setName('');
        setEmail('');
        setMessage('');
        setShowConfirmation(true); // Show the confirmation modal
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  const closeConfirmationModal = () => {
    setShowConfirmation(false);
  };

  return (
    <div className='flex flex-col justify-between items-center bg-white h-screen w-full mt-24 mb-[700px] relative'>
      <div className='mb-30'>
        <ContactHero />
      </div>

      <>
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className='emailForm bg-white p-10 rounded-lg shadow-lg w-full mx-40'>
          <div className='mb-4'>
            <label htmlFor='name' className='block text-gray-700 text-sm font-bold mb-2'>
              Your Name
            </label>
            <input
              type='text'
              name='name'
              value={name}
              className='w-full p-2 border border-gray-300 rounded text-black'
              placeholder='Your Name'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>
              Your Email
            </label>
            <input
              type='email'
              name='email'
              value={email}
              className='w-full p-2 border border-gray-300 rounded text-black'
              placeholder='Your Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='message' className='block text-gray-700 text-sm font-bold mb-2'>
              How can we help?
            </label>
            <textarea
              name='message'
              value={message}
              rows={4}
              className='w-full p-2 border border-gray-300 rounded text-black'
              placeholder='How can we help?'
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button
            type='submit'
            className='bg-pink text-white font-bold py-2 px-4 rounded hover:bg-yellow'
          >
            Send Message
          </button>
        </form>

        {/* Message Confirmation Modal */}
        {showConfirmation && (
          <MessageConfirmation onClose={closeConfirmationModal} />
        )}
      </>
    </div>
  );
};

export default ContactPage;
