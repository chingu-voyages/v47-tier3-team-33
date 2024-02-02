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
	loginUser: (userData: User) => void;
	logoutUser: () => void;
	user: User | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface User {
	_id?: string;
	email: string;
	password: string;
	user?: {
		_id: string;
	};
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

	const loginUser = async (userData: User) => {
		try {
			// Make a request to the backend to log in the user
			const response = await axios.post(
				'http://localhost:8000/users/login',
				userData
			);

			// Store user data in localStorage
			localStorage.setItem('user', JSON.stringify(response.data));
			// Set the logged-in user in the state
			setUser(response.data.user);
		} catch (error: any) {
			console.error('Login failed:', error.response.data.message);
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
			value={{ user, login, setLogin, handleLogin, loginUser, logoutUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};
