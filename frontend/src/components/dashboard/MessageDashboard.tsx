import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';

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
interface RecieverProfile {
	_id: string;
	name: string;
	surname: string;
	email: string;
}

const MessageDashboard = () => {
	const socket = useSocket();

	const [conversations, setConversations] = useState<IConversation[]>([]);
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [message, setMessage] = useState('');

	const [recieverProfiles, setRecieverProfiles] = useState<RecieverProfile[]>(
		[]
	);

	const { user, setConversationId, conversationId } = useAuth();

	const userId = user?._id ? user?._id : user?.user?._id;

	const [selectedConversationId, setSelectedConversationId] = useState<
		string | null
	>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	};

	const receivers = conversations
		?.map((convo) => convo?.participants?.filter((a) => a !== userId))
		.flat();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				`https://omnievents.vercel.app/conversations/messages`,
				{
					conversationId: conversationId,
					sender: userId,
					text: message,
				}
			);

			setMessages((prevMessages) => [...prevMessages, response.data]);
			setMessage('');

			if (socket) {
				socket
					.emit('message', {
						conversationId,
						sender: userId,
						recipient: receivers[0],
						text: response.data.text,
					})
					.emit('sendNotification', {
						sender: userId,
						recipient: receivers[0],
					});
			}
		} catch (error: any) {
			console.error('Error sending message:', error);
		}
	};

	const handleConversationClick = async (conversationId: string) => {
		try {
			const response = await axios.get(
				`https://omnievents.vercel.app/conversations/messages/${conversationId}`
			);
			setMessages(response.data);
			setSelectedConversationId(conversationId);
		} catch (error) {
			console.error('Error fetching messages:', error);
		}
	};

	useEffect(() => {
		const handleReceiveMessage = (message: IMessage) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		};

		if (socket) {
			socket.on('message', handleReceiveMessage);

			socket.on('getNotification', (notificationData) => {
				// Handle notification data as needed
				console.log('Notification received:', notificationData);
			});

			return () => {
				socket.off('message', handleReceiveMessage);
				socket.off('getNotification');
			};
		}

		if (conversationId) {
			handleConversationClick(conversationId);
		}
	}, [socket]);

	useEffect(() => {
		if (conversationId) {
			handleConversationClick(conversationId);
			setSelectedConversationId(conversationId);
		}
	}, [conversationId]);

	const fetchRecipientUser = async () => {
		try {
			const profiles = [];

			for (const r of receivers) {
				const response = await axios.get(
					`https://omnievents.vercel.app/users/${r}`
				);
				profiles.push(response.data);
			}

			setRecieverProfiles(profiles);
		} catch (error) {
			console.error('Error fetching user profiles:', error);
		}
	};

	useEffect(() => {
		fetchRecipientUser();
	}, [receivers]);

	const fetchConversations = async () => {
		try {
			const response = await axios.get(
				`https://omnievents.vercel.app/conversations/user/${userId}`
			);
			setConversations(response.data);
		} catch (error) {
			console.error('Error fetching conversations:', error);
		}
	};

	useEffect(() => {
		fetchConversations();

		return () => {
			socket && socket.off('connect');
			socket && socket.off('disconnect');
		};
	}, []);

	useEffect(() => {
		socket &&
			socket.on('recieve_message', (data) => {
				alert(data.message);
			});
	}, [socket]);

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
				<div className='overflow-y-scroll mt-6'>
					{conversations.map((conversation, idx) => (
						<div
							key={idx}
							className={`${
								selectedConversationId === conversation._id ||
								conversationId === conversation._id
									? 'bg-gray-200 '
									: 'hover:bg-gray-100 '
							} py-6 border-b-2 border-b-gray-200 p-2 cursor-pointer flex items-center`}
							onClick={() => {
								setConversationId(conversation._id);
								setSelectedConversationId(conversation._id);
								handleConversationClick(conversation._id);
							}}
						>
							<div className='bg-pink text-white rounded-full w-8 h-8 text-center text-xl pt-[1px] mr-5'>
								{recieverProfiles[idx]?.name?.slice(0, 1)?.toUpperCase()}
							</div>
							<p className='text-xl'>
								{recieverProfiles[idx]?.name +
									' ' +
									recieverProfiles[idx]?.surname}
							</p>
						</div>
					))}
				</div>
			</div>
			<div className='w-2/3 p-2 flex flex-col overflow-y-scroll'>
				{selectedConversationId || conversationId ? (
					<>
						<p className=''>{`Messages ${
							selectedConversationId || conversationId
								? `(${selectedConversationId || conversationId})`
								: ''
						}`}</p>
						<div className='flex-grow overflow-y-scroll'>
							<div className='w-full'>
								<div className=''>
									{messages?.map((message, idx) => (
										<div
											key={idx}
											className={
												message.sender === userId
													? 'bg-[#DCF8C6] align p-4 m-4 rounded-full w-[50%] text-l'
													: 'bg-[#EAEAEA] p-4 m-4 rounded-full  w-[50%] text-lg'
											}
											style={{
												marginLeft: message.sender === userId ? 'auto' : '0',
											}}
										>
											{message.text}
										</div>
									))}
								</div>
							</div>
						</div>
						<form className='flex items-center gap-2' onSubmit={handleSubmit}>
							<input
								type='text'
								name='message'
								value={message}
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
					</>
				) : (
					<div className='h-full w-full flex justify-center items-center'>
						<p className='text-3xl'>Select Conversation</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default MessageDashboard;
