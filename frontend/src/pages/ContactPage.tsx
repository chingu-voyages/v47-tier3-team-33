// ContactPage.tsx

const ContactPage= () => {
  return (
    <div className=" flex items-center justify-center bg-white h-screen">
      <div className="justify-center container mx-auto px-4 rounded-md">
        <h1 className="text-4xl font-bold mb-6 text-darkTeal ">Contact Us</h1>
        <div>
        {/* Contact Form */}
        <form className="bg-white p-10 rounded-md shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="How can we help?"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-yellow text-white font-bold py-2 px-4 rounded hover:bg-darkTeal"
          >
            Send Message
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;


