import mongoose from 'mongoose';
import { CategoryModel, EventModel, IEvent } from './models/Event';
import connectDB from './config/db';

// Connect to the database
connectDB();

// Function to seed categories
const seedCategories = async () => {
	const categoriesData = [
		{
			name: 'Music',
			description:
				'Explore a world of musical experiences, from live concerts to music festivals. Immerse yourself in the rhythm and melodies of talented artists.',
			events: [],
			image:
				'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
		{
			name: 'Sports and Fitness',
			description:
				'Get active and experience the thrill of sports and fitness events. From marathons to fitness classes, find events that cater to your active lifestyle.',
			events: [],
			image:
				'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
		{
			name: 'Tech and Innovation',
			description:
				'Stay on the cutting edge of technology with events that showcase innovation, breakthroughs, and the latest trends in the tech industry.',
			events: [],
			image:
				'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
		{
			name: 'Arts & Theater',
			description:
				'Immerse yourself in the world of arts and theater with captivating performances, exhibitions, and cultural experiences.',
			events: [],
			image:
				'https://images.unsplash.com/photo-1640891175384-e599abd85c6d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
		{
			name: 'Food & Drink',
			description:
				'Savor the flavors of culinary delights and indulge in the finest beverages. From food festivals to wine tastings, discover events that tantalize your taste buds.',
			events: [],
			image:
				'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
		{
			name: 'Health & Wellness',
			description:
				'Nurture your mind, body, and soul with events focused on health and wellness. From yoga retreats to mindfulness workshops, embark on a journey to holistic well-being.',
			events: [],
			image:
				'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2720&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
		{
			name: 'Community & Charity',
			description:
				'Make a positive impact and connect with your community through charitable events and volunteer opportunities. Join hands to support worthy causes and foster a spirit of giving back.',
			events: [],
			image:
				'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
		{
			name: 'Travel & Outdoor',
			description:
				'Embark on adventures and explore the great outdoors with travel and outdoor events. From hiking expeditions to nature photography tours, satisfy your wanderlust and embrace the beauty of nature.',
			events: [],
			image:
				'https://images.unsplash.com/photo-1440186347098-386b7459ad6b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
	];

	try {
		await CategoryModel.insertMany(categoriesData);
		console.log('Categories seeded successfully.');
	} catch (error) {
		console.error('Error seeding categories:', error);
		throw error;
	}
};

const updateCategoriesWithEvents = async (categoryMap: {
	[key: string]: mongoose.Types.ObjectId;
}) => {
	try {
		const events = await EventModel.find();

		// Update categories with events
		for (const categoryName in categoryMap) {
			if (Object.prototype.hasOwnProperty.call(categoryMap, categoryName)) {
				const categoryId = categoryMap[categoryName];
				if (categoryId) {
					// Find events belonging to this category
					const categoryEvents = events.filter(
						(event) => event.category.toString() === categoryId.toString()
					);

					// Push event objects into the 'events' array of the category
					await CategoryModel.findByIdAndUpdate(categoryId, {
						$push: { events: { $each: categoryEvents } },
					});
				}
			}
		}

		console.log('Categories updated with events successfully.');
	} catch (error) {
		console.error('Error updating categories with events:', error);
		throw error;
	}
};

const seedEvents = async () => {
	try {
		const categories = await CategoryModel.find();
		const categoryMap: { [key: string]: mongoose.Types.ObjectId } = {};
		categories.forEach((category) => {
			const categoryName = category.name.trim().toLowerCase();
			categoryMap[categoryName] = category._id;
		});

		const eventsData = [
			{
				title: 'Summer Music Festival',
				category: 'Music',
				date: '2024-07-15',
				location: 'City Park Amphitheater',
				description:
					'Join us for a vibrant summer music festival featuring a lineup of diverse artists. Enjoy the tunes, food trucks, and a lively atmosphere!',
				image:
					'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				tickets: [
					{
						type: 'General Admission',
						price: 25.99,
					},
					{
						type: 'VIP Pass',
						price: 49.99,
					},
				],
			},
			{
				title: 'Acoustic Night: Unplugged Sessions',
				category: 'Music',
				date: '2024-08-02',
				location: 'Harmony Lounge',
				description:
					'An intimate evening of acoustic performances by talented local musicians. Unplug and unwind with soulful melodies and captivating lyrics.',
				image:
					'https://images.unsplash.com/photo-1621849221697-853a2a3a8513?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				tickets: [
					{
						type: 'Standard Entry',
						price: 15.99,
					},
				],
			},
			{
				title: 'City Marathon Challenge',
				category: 'Sports and Fitness',
				date: '2024-09-10',
				location: 'City Streets',
				description:
					'Join the annual city marathon and challenge yourself to conquer the streets. Run, jog, or walk—everyone is welcome!',
				image:
					'https://images.unsplash.com/photo-1596727362302-b8d891c42ab8?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				tickets: [
					{
						type: "Runner's Pass",
						price: 29.99,
					},
				],
			},
			{
				title: 'Yoga in the Park',
				category: 'Sports and Fitness',
				date: '2024-08-20',
				location: 'Central Park',
				description:
					'Experience tranquility with an outdoor yoga session in the heart of the city. Embrace the serenity of nature as you stretch and rejuvenate.',
				image:
					'https://images.unsplash.com/photo-1608405059861-b21a68ae76a2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				tickets: [
					{
						type: 'Yoga Mat Admission',
						price: 19.99,
					},
				],
			},
			{
				title: 'Tech Summit 2024',
				category: 'Tech and Innovation',
				date: '2024-10-05',
				location: 'Innovation Center',
				description:
					"Connect with industry leaders, explore emerging technologies, and gain insights into the future of tech at this year's Tech Summit.",
				image:
					'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				tickets: [
					{
						type: 'Full Summit Access',
						price: 149.99,
					},
				],
			},
			{
				title: 'HackathonX',
				category: 'Tech and Innovation',
				date: '2024-09-18',
				location: 'Tech Hub',
				description:
					'Unleash your coding skills and creativity at HackathonX. Collaborate with fellow developers to solve real-world challenges and win exciting prizes.',
				image:
					'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				tickets: [
					{
						type: 'Participant Pass',
						price: 49.99,
					},
				],
			},
			{
				title: 'TechConnect 2024',
				category: 'Tech and Innovation',
				date: '2024-10-25',
				location: 'Innovation Center',
				description:
					'Join TechConnect 2024, the premier tech conference of the year. Explore the latest trends in technology, attend insightful talks by industry experts, and network with like-minded professionals.',
				image:
					'https://images.unsplash.com/photo-1512257639384-2dab4d1b9e75?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				tickets: [
					{
						type: 'General Admission',
						price: 99.99,
					},
					{
						type: 'VIP Pass',
						price: 199.99,
					},
				],
			},
			{
				title: 'Concert Under the Stars',
				category: 'Music',
				date: '2024-08-12',
				location: 'Central Park Amphitheater',
				description:
					'Experience a magical evening with Concert Under the Stars. Enjoy live performances by top artists across genres under the open sky.',
				image:
					'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				tickets: [
					{
						type: 'General Admission',
						price: 29.99,
					},
					{
						type: 'VIP Pass',
						price: 99.99,
					},
				],
			},
			{
				title: 'Classical Symphony Night',
				category: 'Music',
				date: '2024-09-30',
				location: 'Symphony Hall',
				description:
					'Immerse yourself in the enchanting melodies of Classical Symphony Night. Be mesmerized by timeless compositions performed by world-class orchestras.',
				image:
					'https://images.unsplash.com/photo-1558980664-609371b0c1e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				tickets: [
					{
						type: 'General Admission',
						price: 39.99,
					},
					{
						type: 'Premium Seat',
						price: 79.99,
					},
				],
			},
			{
				title: 'Art Exhibition: Modern Masters',
				category: 'Arts & Theater',
				date: '2024-08-20',
				location: 'Metropolitan Art Gallery',
				description:
					'Explore the works of Modern Masters at this captivating art exhibition. Witness breathtaking paintings, sculptures, and installations by renowned contemporary artists.',
				image:
					'https://images.unsplash.com/photo-1520638148192-66d9e3a7d5fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				tickets: [
					{
						type: 'General Admission',
						price: 19.99,
					},
					{
						type: 'VIP Preview',
						price: 49.99,
					},
				],
			},
			{
				title: 'Shakespeare in the Park: Hamlet',
				category: 'Arts & Theater',
				date: '2024-09-15',
				location: 'Central Park Amphitheater',
				description:
					'Experience the timeless tale of Hamlet performed live in the enchanting setting of Central Park Amphitheater. Join us for an unforgettable evening of theater under the stars.',
				image:
					'https://images.unsplash.com/photo-1593624387288-fdf1bd2d3d7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				tickets: [
					{
						type: 'General Admission',
						price: 24.99,
					},
					{
						type: 'VIP Seating',
						price: 69.99,
					},
				],
			},
			{
				title: 'Gourmet Food Festival',
				category: 'Food & Drink',
				date: '2024-08-25',
				location: 'Downtown Culinary Square',
				description:
					'Indulge your taste buds in a culinary adventure at the Gourmet Food Festival. Experience exquisite dishes, fine wines, and a celebration of gastronomic delights.',
				image:
					'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				tickets: [
					{
						type: 'Tasting Pass',
						price: 39.99,
					},
					{
						type: 'VIP Experience',
						price: 99.99,
					},
				],
			},
			{
				title: 'Mindful Meditation Retreat',
				category: 'Health & Wellness',
				date: '2024-09-05',
				location: 'Serene Sanctuary Retreat Center',
				description:
					'Escape the hustle and bustle with a Mindful Meditation Retreat. Rejuvenate your mind and body through guided meditation, yoga sessions, and holistic wellness activities.',
				image:
					'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				tickets: [
					{
						type: 'Retreat Package',
						price: 149.99,
					},
				],
			},
			{
				title: 'Community Cleanup Day',
				category: 'Community & Charity',
				date: '2024-08-12',
				location: 'City Park',
				description:
					'Join hands for a day of community service! Community Cleanup Day is an opportunity to make a positive impact. Contribute to a cleaner, greener environment.',
				image:
					'https://images.unsplash.com/photo-1590874023110-f82d4c63b599?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				tickets: [
					{
						type: 'Volunteer Admission',
						price: 0.0,
					},
				],
			},
			{
				title: 'Adventure Backpacking Expedition',
				category: 'Travel & Outdoor',
				date: '2024-09-20',
				location: 'Mountain Base Camp',
				description:
					'Embark on a thrilling adventure with our Backpacking Expedition. Traverse scenic trails, camp under the stars, and connect with nature in this epic outdoor experience.',
				image:
					'https://images.unsplash.com/photo-1469026140142-cb239ea68152?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				tickets: [
					{
						type: 'Explorer Pass',
						price: 79.99,
					},
				],
			},
		];

		const eventsToInsert: Partial<IEvent>[] = eventsData.map((event) => ({
			...event,
			category: categoryMap[event.category.trim().toLowerCase()], // Use category name to get corresponding ObjectId
			date: new Date(event.date), // Convert 'date' to 'Date' object
		}));

		await EventModel.insertMany(eventsToInsert);

		await updateCategoriesWithEvents(categoryMap);

		console.log('Categories updated with events successfully.');
		console.log('Events seeded successfully.');
	} catch (error) {
		console.error('Error seeding events:', error);
		throw error;
	}
};

// Seed categories and events
(async () => {
	try {
		await seedCategories();
		await seedEvents();
		mongoose.connection.close();
	} catch (error) {
		console.error('Error seeding database:', error);
		mongoose.connection.close();
	}
})();
