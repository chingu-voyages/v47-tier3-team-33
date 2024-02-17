import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextProps {
	children: ReactNode;
}

const SocketContext = createContext<Socket | null>(null);

export const useSocket = (): Socket | null => {
	return useContext(SocketContext);
};

const SOCKET_SERVER_URL = 'https://omnievents.vercel.app';

export const SocketProvider: React.FC<SocketContextProps> = ({ children }) => {
	const [socket, setSocket] = useState<Socket | null>(null);

	const userString = localStorage.getItem('user');

	useEffect(() => {
		const newSocket = io(SOCKET_SERVER_URL);
		setSocket(newSocket);

		if (userString) {
			try {
				const user = JSON.parse(userString);

				const userId = user?._id ? user?._id : user?.user?._id;

				newSocket.emit('userConnected', {
					userId: userId,
				});
			} catch (error) {
				console.error('Error parsing user string as JSON:', error);
			}
		} else {
			console.error('User string is null in local storage');
		}

		return () => {
			newSocket.disconnect();
		};
	}, []);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};
