import React, { useState } from 'react';

const MessageConfirmation: React.FC = () => {
  const [messageSent, setMessageSent] = useState<boolean>(false);

  const handleSubmit = () => {
    // Logic to send message (e.g., using Axios or fetch)
    // Assuming message is successfully sent
    setMessageSent(true);
  };

  return (
    <div>
      <h1>Contact Us</h1>
      {!messageSent ? (
        <form onSubmit={handleSubmit}>
          <label>
            Message:
            <textarea />
          </label>
          <button type="submit">Send</button>
        </form>
      ) : (
        <div>
          <p>Thank you for contacting us! Your message has been sent.</p>
          {/* Optionally, you can provide a button to reset the form or redirect elsewhere */}
          <button onClick={() => setMessageSent(false)}>Send Another Message</button>
        </div>
      )}
    </div>
  );
};

export default MessageConfirmation;
