import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from 'context/AuthContext';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

interface IConversation {
	_id: string;
	participants: string[];
}

interface IMessage {
	_id: string;
	conversation: string;
	sender: string;
	text: string;
	createdAt: string;
}

const MessageDashboard = () => {
	const [conversations, setConversations] = useState<IConversation[]>([]);
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [newMessage, setNewMessage] = useState('');
	const { user, setConversationId, conversationId } = useAuth();
	const userId = user?.user?._id;

	const [selectedConversationId, setSelectedConversationId] = useState<
		string | null
	>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewMessage(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await axios.post(`http://localhost:8000/conversations/messages`, {
				conversationId: conversationId,
				sender: userId,
				text: newMessage,
			});

			// Clear the input field after sending a message
			setNewMessage('');

			// Emit the message directly to the server using Socket.IO
			socket.emit('sendMessage', {
				conversationId,
				sender: userId,
				text: newMessage,
			});
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	useEffect(() => {
		// Listen for new messages from the server
		socket.on('receiveMessage', (message) => {
			// Update the state with the new message
			setMessages((prevMessages) => [...prevMessages, message]);
		});

		return () => {
			// Cleanup socket event listeners if needed
			socket.off('receiveMessage');
		};
	}, []);

	useEffect(() => {
		const fetchConversations = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/conversations/user/${userId}`
				);
				setConversations(response.data);
			} catch (error) {
				console.error('Error fetching conversations:', error);
			}

			socket.on('connect', () => {
				console.log('Socket connected:', socket.id);
			});

			socket.on('disconnect', () => {
				console.log('Socket disconnected:', socket.id);
			});
		};

		fetchConversations();

		return () => {
			// Cleanup socket event listeners if needed
			socket.off('connect');
			socket.off('disconnect');
		};
	}, [userId]);

	const handleConversationClick = async (conversationId: string) => {
		try {
			const response = await axios.get(
				`http://localhost:8000/conversations/messages/${conversationId}`
			);
			setMessages(response.data);
			setSelectedConversationId(conversationId);
		} catch (error) {
			console.error('Error fetching messages:', error);
		}
	};

	return (
		<div className='flex h-[780px] w-full mb-40'>
			<div className='h-full w-1/3 border border-r-1'>
				<div className='border-2 border-gray-300 w-[80%] py-2 pl-2 mt-10 rounded-md flex items-center mx-auto'>
					<input
						type='text'
						placeholder='Search...'
						className='border-none outline-none w-full'
					/>
				</div>
				<div>
					{conversations.map((conversation) => (
						<div
							key={conversation._id}
							className={`${
								selectedConversationId === conversation._id
									? 'bg-gray-200'
									: 'hover:bg-gray-100'
							} p-2 cursor-pointer`}
							onClick={() => {
								setConversationId(conversation._id);
								handleConversationClick(conversation._id);
							}}
						>
							{/* You can display participant names or other details here */}
							{conversation.participants.join(', ')}
						</div>
					))}
				</div>
			</div>
			<div className='w-2/3 p-2 flex flex-col'>
				<div className='flex-grow'>
					<p className=''>{`Messages ${
						selectedConversationId ? `(${selectedConversationId})` : ''
					}`}</p>
					<div>
						{messages.map((message) => (
							<div
								key={message._id}
								className={
									message.sender === userId
										? 'bg-[#DCF8C6] align p-4 m-4 rounded-full items-end w-auto'
										: 'bg-[#EAEAEA] p-4 m-4 rounded-full items-start w-auto'
								}
							>
								{message.text}
							</div>
						))}
					</div>
				</div>
				<form className='flex items-center gap-2' onSubmit={handleSubmit}>
					<input
						type='text'
						name='newMessage'
						value={newMessage}
						onChange={handleChange}
						className='bg-white flex-grow border-2 border-pink p-2 rounded-md'
						placeholder='Type your message here'
					/>
					<button
						type='submit'
						className='bg-pink text-white h-full p-2 flex items-center justify-center text-center mx-auto rounded=md'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
							/>
						</svg>
					</button>
				</form>
			</div>
		</div>
	);
};

export default MessageDashboard;
