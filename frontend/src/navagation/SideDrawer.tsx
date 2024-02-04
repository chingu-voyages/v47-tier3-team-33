import './SideDrawer.css';//12
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
const SideDrawer = () => {
	return (
        <div>
            <button className='bg-pink pl-4 cursor-pointer z-50' >
                <span className='text-white text-4xl'>
                    <IoClose/>
                </span>
            </button>
            <Link to="./dashboard"className='text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300'>
                My Profile
            </Link>
            <br/>
            <Link to="./dashboard"className='text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300'>
                My Events
            </Link>
            <br/>
            <Link to="./dashboard"className='text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300'>
                My joined Events
            </Link>
            <br/>
            <Link to="./dashboard" className='bg-pink p-2 md:p-6 text-2xl md:text-4xl rounded-md mt-10 md:mt-28 text-white'>
            </Link>
        </div>
    );
};

export default SideDrawer;