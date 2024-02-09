import './SideDrawer.css';//12
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import "../assets/profile icon.png"
const SideDrawer = () => {
	return (
        <div className="text-left">
            

            <h1 className="text-center">Name</h1>
            <h2 className="text-center mb-[20px]">ss.id{}</h2>

            <hr className="text-center mb-[20px]"/>
            <button className="flex w-full bg-pink hover:bg-black text-white font-bold py-2 px-4 rounded">
                <Link to="./dashboard">
                    Browse Events
                </Link>
            </button>
            <hr/>
            <button className="flex bg-pink w-full hover:bg-black text-white font-bold py-2 px-4 rounded">
                <Link to="./dashboard">
                    Manage My Events
                </Link>
            </button>
            <hr/>
            <button className="flex bg-pink w-full hover:bg-black text-white font-bold py-2 px-4 rounded">
                <Link to="./dashboard">
                    My joined Events
                </Link>
            </button>
            <hr/>
            <button className="flex bg-pink w-full hover:bg-black text-white font-bold py-2 px-4 rounded">
                <Link to="./dashboard">
                    Account Settings
                </Link>
            </button>
            <br/>
            <hr/>
            <br/>
            <button className="flex bg-red-500 w-full hover:bg-black text-white font-bold py-2 px-4 rounded">
                <Link to="./">
                    Log Out
                </Link>
            </button>
        </div>
    );
};

export default SideDrawer;