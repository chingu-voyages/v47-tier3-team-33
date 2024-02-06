import React from 'react';

interface MessageConfirmationProps {
  onClose: () => void;
}

const MessageConfirmation: React.FC<MessageConfirmationProps> = ({ onClose }) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='fixed inset-0 bg-black opacity-50'></div>
      <div className='modal z-10 bg-white p-6 rounded-lg shadow-md'>
        <p className='text-center text-lg font-semibold'>
          Thank you for contacting us! Your message has been sent.
        </p>
        <button
          onClick={onClose}
          className='mt-4 bg-pink text-white px-4 py-2 rounded hover:bg-yellow'
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MessageConfirmation;

