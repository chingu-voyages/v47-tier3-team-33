import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import axios from 'axios';
interface AuthContextProps {
	login: boolean;
	setLogin: (value: boolean) => void;
	handleLogin: () => void;
	open: boolean;
	handleOpen: () => void;
	handleClose: () => void;
	loginUser: (userData: User) => Promise<string>;
	logoutUser: () => void;
	user: User | null;
	text: string;
	setText: (text: string) => void;
	conversationId: string;
	setConversationId: (text: string) => void;
	notifications: Notification[];
	setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export interface User {
	_id?: string;
	email: string;
	password: string;
	profile_img?: string;
	user?: {
		_id: string;
		profile_img: string;
		name: string;
		surname: string;
		email: string;
		password: string;
	};
}

interface Notification {
	_id: string;
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [login, setLogin] = useState<boolean>(true);
	const [user, setUser] = useState<User | null>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [text, setText] = useState<string>('dashboard');
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [conversationId, setConversationId] = useState<string>('');
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const loginUser = async (userData: User): Promise<string> => {
		try {
			const response = await axios.post(
				'https://omni-events-571e671c7a3f.herokuapp.com/users/login',
				userData
			);

			// Store user data in localStorage
			localStorage.setItem('user', JSON.stringify(response.data));
			// Set the logged-in user in the state
			setUser(response.data.user);

			// Return a success message
			return 'Login successful!';
		} catch (error: any) {
			throw new Error(error);
		}
	};

	const logoutUser = () => {
		setUser(null);
	};

	const handleLogin = () => {
		setLogin(!login);
	};

	useEffect(() => {
		// Check if there is a user object stored in local storage
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			// If user data exists, parse it and set the user state
			const parsedUser = JSON.parse(storedUser);
			setUser(parsedUser);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				setLogin,
				handleLogin,
				handleOpen,
				handleClose,
				loginUser,
				logoutUser,
				open,
				text,
				setText,
				conversationId,
				setConversationId,
				notifications,
				setNotifications,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
