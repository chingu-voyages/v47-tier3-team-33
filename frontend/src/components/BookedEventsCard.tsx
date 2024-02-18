import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSocket } from '../context/SocketContext';
import Moment from 'react-moment';
import 'moment-timezone';
import { IEvent } from 'interface';
import { Box, Modal } from '@mui/material';
import { style } from '@mui/system';
import EventsDetailPage from 'pages/EventsDetailPage';

interface BookedEventProps {
    event: IEvent;
}

const BookedEvent: React.FC<BookedEventProps> = ({ event }) => {
    // Define your state and other necessary logic here
    const [cardEvent, setCardEvent] = useState<IEvent | null>(null);
    const [open, setOpen] = useState(false);
    const socket = useSocket();

    useEffect(() => {
        fetchEvent();
    }, []);

    const fetchEvent = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/events/${event._id}`);
            setCardEvent(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <div
                onClick={handleOpen}
                className='cursor-pointer h-[370px] md:h-[430px] lg:h-[370px] xl:h-[430px] w-full border flex flex-grow rounded-md shadow-md'
            >
                <div className='w-full flex flex-col justify-between relative'>
                    <div className='relative'>
                        <img
                            src={cardEvent ? cardEvent?.image : event?.image}
                            alt='event image'
                            className='h-[200px] md:h-[250px] lg:h-[190px] xl:h-[250px] w-full object-cover'
                            onError={(e) => {
                                const imgElement = e.target as HTMLImageElement;
                                imgElement.src =
                                    'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
                            }}
                        />
                        <div className='p-2 text-lg'>
                            <p className='font-medium md:text-lg'>
                                {cardEvent ? cardEvent.title : event.title}
                            </p>
                            <p className=''>
                                Date:{' '}
                                <Moment format='ddd, MMM DD YYYY'>
                                    {cardEvent ? cardEvent.startDate : event.startDate}
                                </Moment>
                            </p>
                            <p className=''>
                                Time:{' '}
                                <Moment format='h:mma'>
                                    {cardEvent ? cardEvent.startDate : event.startDate}
                                </Moment>{' '}
                                -
                                <Moment format='h:mma'>
                                    {cardEvent ? cardEvent.endDate : event.endDate}
                                </Moment>
                            </p>
                            <p className=''>
                                Location: {cardEvent ? cardEvent.location : event.location}
                            </p>
                        </div>
                    </div>
                    <div className='flex justify-between p-2 w-full'>
                        <p className=''>
                            Attendees:{' '}
                            {cardEvent
                                ? cardEvent?.attendees?.length
                                : event?.attendees?.length}{' '}
                        </p>
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box >
                    <EventsDetailPage
                        event={cardEvent ? cardEvent : event}
                        handleClose={handleClose}
                    />
                </Box>
            </Modal>
        </div>
    );
};

export default BookedEvent;
