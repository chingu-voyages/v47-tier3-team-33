import './SideDrawer.css';//12
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
const SideDrawer = () => {
	return (
        <div className="text-center">
            
            <button className="bg-pink hover:bg-black text-white font-bold py-2 px-4 rounded">
                My Profile
            </button>
            <br/>
            <br/>
            <button className="bg-pink hover:bg-black text-white font-bold py-2 px-4 rounded">
                My Events
            </button>
            <br/>
            <br/>
            <button className="bg-pink hover:bg-black text-white font-bold py-2 px-4 rounded">
                
                <Link to="./dashboard">
                    My joined Events
                </Link>
            </button>
            <br/>
            <br/>
            <button className="bg-pink hover:bg-black text-white font-bold py-2 px-4 rounded">
                <Link to="./dashboard">
                    Click me
                </Link>
            </button>
        </div>
    );
};

export default SideDrawer;