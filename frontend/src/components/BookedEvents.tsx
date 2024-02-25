import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IEvent } from 'interface';
import Moment from 'react-moment';

interface BookedEventsProps {}

const BookedEvents: React.FC<BookedEventsProps> = () => {
    const [bookedEvents, setBookedEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        const fetchBookedEvents = async () => {
            try {
                const response = await axios.get('https://omni-events-571e671c7a3f.herokuapp.com/events/booked');
                setBookedEvents(response.data);
            } catch (error) {
                console.error('Error fetching booked events:', error);
            }
        };

        fetchBookedEvents();
    }, []);

    return (
        <div>
            <h2>Booked Events</h2>
            {bookedEvents.length === 0 ? (
                <p>No booked events</p>
            ) : (
                <div className="booked-events">
                    {bookedEvents.map(event => (
                        <div key={event._id} className="booked-event">
                            <h3>{event.title}</h3>
                            <p>
                                <strong>Date:</strong>{' '}
                                <Moment format="dddd, MMM DD, YYYY">{event.startDate}</Moment>
                            </p>
                            <p>
                                <strong>Time:</strong>{' '}
                                <Moment format="h:mm a">{event.startDate}</Moment>
                            </p>
                            <p>
                                <strong>Location:</strong> {event.location}
                            </p>
                            <p>
                                <strong>Description:</strong> {event.description}
                            </p>
                            <p>
                                <strong>Hosted by:</strong> {event.organizer}
                            </p>
                            
                        
                           
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookedEvents;
