import React from 'react';

interface MessageConfirmationProps {
  onClose: () => void;
}

const MessageConfirmation: React.FC<MessageConfirmationProps> = ({ onClose }) => {
  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <p>Thank you for contacting us! Your message has been sent.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MessageConfirmation;
