import mongoose from 'mongoose';
import {CategoryModel, EventModel, IEvent } from "./models/Event"; 
import connectDB from "./config/db";

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
	}];

    try {
        await CategoryModel.insertMany(categoriesData);
        console.log('Categories seeded successfully.');
    } catch (error) {
        console.error('Error seeding categories:', error);
        throw error;
    }
};

const updateCategoriesWithEvents = async (categoryMap: { [key: string]: mongoose.Types.ObjectId }) => {
    try {
        const events = await EventModel.find();
        

        // Update categories with events
        for (const categoryName in categoryMap) {
            if (Object.prototype.hasOwnProperty.call(categoryMap, categoryName)) {
                const categoryId = categoryMap[categoryName];
                if (categoryId) {
                    // Find events belonging to this category
                    const categoryEvents = events.filter(event => event.category.toString() === categoryId.toString());
                    
                    // Push event objects into the 'events' array of the category
                    await CategoryModel.findByIdAndUpdate(categoryId, { $push: { events: { $each: categoryEvents } } });
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
				category:'Music',
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
				category:'Music',
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
				category:'Sports and Fitness',
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
				category:'Sports and Fitness',
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
				category:'Tech and Innovation',
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
				category:'Tech and Innovation',
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
    ];

		const eventsToInsert: Partial<IEvent>[] = eventsData.map(event => ({
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