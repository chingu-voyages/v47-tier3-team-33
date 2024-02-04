import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import EventCard from 'components/EventCard';

// Mock axios request
const mockAxios = new MockAdapter(axios);

const mockEvent = {
	_id: '123',
	title: 'Sample Event',
	category: 'Sample Category',
	date: new Date(),
	location: 'Sample Location',
	description: 'Sample Description',
	image: 'sample-image.jpg',
	tickets: [
		{ type: 'General', price: 10 },
		{ type: 'VIP', price: 50 },
	],
};

describe('EventCard Component', () => {
	beforeEach(() => {
		mockAxios.reset();
	});

	test('renders event card with correct data', async () => {
		mockAxios.onGet('http://localhost:8000/events/123').reply(200, mockEvent);
	});

	type EventCard = any;
	// Render the component

	// Check if the compoenent renders the event data
	expect(screen.getByText('Sample Event')).toBeInTheDocument();
	expect(
		screen.getByText('Date: Saturday, January 13, 2024')
	).toBeInTheDocument();
	expect(screen.getByText('Location: Sample Location')).toBeInTheDocument();
});
