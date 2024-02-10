import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const tagsData = [
    'Conference',
    'Workshop',
    'Seminar',
    'Networking',
    'Party',
    'Exhibition',
];

const ScrollingTags: React.FC = () => {
    const [tags] = useState([...tagsData, ...tagsData]); // Repeat tags twice

    return (
        <div className='flex items-center overflow-x-scroll p-2 rounded-md bg-transparent w-screen'>
            {tags.map((tag, index) => (
                <Link key={index} to={`/options/${tag}`} className="flex-shrink-0">
                    <div className="px-4 py-2 mx-2 bg-white text-gray-800 border-gray-300 rounded-full border transition-all duration-300 hover:bg-pink hover:text-white">
                        {tag}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ScrollingTags;


