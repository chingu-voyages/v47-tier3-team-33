import React, { useState } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { FaFacebook, FaTwitterSquare, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';

interface Event {
  _id: string;
  title: string;
  category: string;
  date?: Date;
  location: string;
  organizer: string;
  description: string;
  image: string;
  tickets: {
    type: string;
    price: number;
  }[];
}

interface EventCardProps {
  event: Event;
}

const tagsData = [
  'Conference',
  'Workshop',
  'Seminar',
  'Networking',
  'Party',
  'Exhibition',
];

const ShareModal = ({ isOpen, onClose, url }: { isOpen: boolean; onClose: () => void; url: string }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md max-w-md">
        <h2 className="text-lg font-semibold mb-4">Share Event</h2>
        <div className="flex flex-col space-y-4">
          <FacebookShareButton url={url}>
            <div className="flex items-center cursor-pointer">
              <FaFacebook className="mr-2" />
              <span>Share on Facebook</span>
            </div>
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <div className="flex items-center cursor-pointer">
              <FaTwitterSquare className="mr-2" />
              <span>Share on Twitter</span>
            </div>
          </TwitterShareButton>
          <LinkedinShareButton url={url}>
            <div className="flex items-center cursor-pointer">
              <FaLinkedin className="mr-2" />
              <span>Share on LinkedIn</span>
            </div>
          </LinkedinShareButton>
          <a href={`https://www.instagram.com`} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center cursor-pointer">
              <FaInstagram className="mr-2" />
              <span>Share on Instagram</span>
            </div>
          </a>
        </div>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md mt-4 w-full" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const EventsDetailPage = ({
  close,
  event,
}: {
  close: () => void;
  event: Event;
}) => {
  const { user, setText, setConversationId } = useAuth();

  const eventId = event?._id;
  const eventOrganizerId = event?.organizer;
  const userId = user?.user?._id;

  const socket = useSocket();
  const navigate = useNavigate();

  const handleBookingEvent = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/events/rsvp', {
        userId: userId,
        eventId: eventId,
      });

      if (socket) {
        socket.emit('rsvp', {
          type: 'rsvp', // Notification type
          eventId: eventId,
          userId: userId,
          organizerId: eventOrganizerId,
        });
        console.log('RSVP socket event emitted successfully');
      }

      toast('You have successfully RSVPed to the event!', {
        style: {
          color: 'green',
        },
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handContactOrganizer = async () => {
    await axios
      .post('http://localhost:8000/conversations', {
        userId,
        eventOrganizerId,
      })
      .then((response) => {
        setConversationId(response.data.conversationId);
      });
  };

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <div className='h-full w-full overflow-y-auto md:px-[200px]'>
      <div className='text-xl mb-2'>
        <span className='flex items-center cursor-pointer' onClick={close}>
          <MdKeyboardArrowLeft />
          Go Back
        </span>
      </div>
      <div className='relative flex flex-col justify-center items-center mx-auto'>
        <img
          src={event.image}
          alt=''
          className='h-[350px]  md:h-[400px] w-full'
        />
        <h1 className='font-medium md:text-4xl absolute top-40 text-white ml-4 w-[300px]'>
          {event.title}
        </h1>
        <div className='bg-white  md:w-34 h-[290px] fixed md:absolute bottom-0 md:top-20 right-0 py-8 px-8 mx-auto rounded md:mr-8 shadow-5xl'>
          <p className='font-semibold text-xl text-black'>Date & Time</p>
          <p className='text-gray-400'>Saturday, Sep 14, 2019 at 20:30 PM</p>
          <div className='flex flex-col space-y-2 text-white text-lg mt-4'>
            <button
              className='bg-pink py-2 rounded-md font-medium'
              onClick={handleBookingEvent}
            >
              Book Now (Free)
            </button>
            <button
              className='bg-darkTeal py-2 rounded-md font-medium'
              onClick={() => setIsShareModalOpen(true)}
            >
              Share this event
            </button>
            <button
              className='bg-teal py-2 rounded-md font-medium'
              onClick={() => {
                navigate('/my-account');
                setText('messages');
                handContactOrganizer();
              }}
            >
              Contact event organizer
            </button>
          </div>
        </div>
        <div className='flex flex-col md:flex-row'>
          <div className='w-full md:w-[70%] p-8'>
            <div className=''>
              <p className='font-semibold text-black'>Description</p>
              <p className=''>{event.description}</p>
            </div>
            <div className='mt-20'>
              <p className='font-semibold text-black'>Agenda</p>
              <p className=''>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                s!
              </p>
            </div>
            <div className='mt-20'>
              <p className='font-semibold text-black'>
                How can I contact the organizer with any question?
              </p>
              <p className=''>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                s!
              </p>
            </div>
          </div>
          <div className='w-[35%] p-8 space-y-10'>
            <div className=''>
              <p className='font-semibold text-black'>Event Location</p>
              <div className='border rounded-md w-full h-40'></div>
            </div>
            <div className='w-full'>
              <p className='font-semibold text-black'>Tags</p>
              <div className='text-xs flex flex-wrap space-x-2 space-y-2 items-center mt-4 w-full'>
                {tagsData.map((tag, idx) => (
                  <div className='bg-gray-100 p-2 px-3 rounded-lg' key={idx}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={window.location.href}
      />
    </div>
  );
};

export default EventsDetailPage;


