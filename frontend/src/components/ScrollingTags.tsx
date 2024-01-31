import React, { useEffect, useState } from 'react';

const tagsData = [
	'Conference',
	'Workshop',
	'Seminar',
	'Networking',
	'Party',
	'Exhibition',
];

const ScrollingTags: React.FC = () => {
	const [tags, setTags] = useState(tagsData);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % tags.length);
		}, 3000);

		return () => clearInterval(interval);
	}, [tags.length]);

	return (
		<div className='flex items-center overflow-x-scroll  p-2 rounded-md bg-transparent'>
			{tags.map((tag, index) => (
				<div
					key={index}
					className={`px-4 py-2 mx-2 ${
						index === currentIndex
							? 'bg-pink text-white border-purple-600'
							: 'bg-white text-gray-800 border-gray-300'
					} rounded-full border transition-all duration-300`}
				>
					{tag}
				</div>
			))}
		</div>
	);
};

export default ScrollingTags;
