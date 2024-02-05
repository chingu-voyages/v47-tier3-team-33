import { Server } from 'socket.io';

const configureSocket = (server: any) => {
	try {
		const io = new Server(server);

		io.on('connection', (socket) => {
			console.log('A user connected');

			// Listen for new notifications
			socket.on('newNotification', (notification) => {
				// Broadcast the notification to all connected clients
				io.emit('newNotification', notification);
			});

			// Listen for messages from the client
			socket.on('clientMessage', (message) => {
				console.log(`Received message from client: ${message}`);
			});

			socket.on('disconnect', () => {
				console.log('User disconnected');
			});
		});

		console.log('Socket.IO server initialized');

		return io;
	} catch (error) {
		console.error('Error configuring socket:', error);
		throw error;
	}
};

export { configureSocket };
