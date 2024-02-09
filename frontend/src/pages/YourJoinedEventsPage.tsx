import React, { useState, useEffect } from 'react';
import YourJoinedEvents from '../components/YourJoinedEvents';
import ScrollingTags from '../components/ScrollingTags';
import EventCard from 'components/EventCard';
import axios from 'axios';

const YourJoinedEventsPage = () => {

	return (
		<div className='h-full'>
			<YourJoinedEvents/>
		</div>
	);
};
export default YourJoinedEventsPage;
