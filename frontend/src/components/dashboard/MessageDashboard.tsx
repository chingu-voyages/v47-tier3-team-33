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
interface Notification {
	sender: string;
	message: string;
	type: string;
	createdAt: string;
}

interface RecieverProfile {
	_id: string;
	name: string;
	surname: string;
	email: string;
}
const MessageDashboard = () => {
	const [conversations, setConversations] = useState<IConversation[]>([]);
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [message, setMessage] = useState('');
	const [recieverProfile, setRecieverProfile] = useState<RecieverProfile>({
		_id: '',
		name: '',
		surname: '',
		email: '',
	});

	const {
		user,
		setConversationId,
		conversationId,
		notifications,
		setNotifications,
	} = useAuth();
	const userId = user?.user?._id;
	console.log('u:', userId);

	console.log('cid:', conversationId);

	const [selectedConversationId, setSelectedConversationId] = useState<
		string | null
	>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		socket.emit('typing', conversationId);
		setMessage(e.target.value);
	};
	const receivers = conversations?.map((convo) =>
		convo?.participants?.filter((a) => a !== userId)
	);
	console.log(receivers);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await axios.post(`http://localhost:8000/conversations/messages`, {
				conversationId: conversationId,
				sender: userId,
				text: message,
			});

			setMessage('');
			socket.emit('send_message', {
				conversationId,
				sender: userId,
				text: message,
			});

			socket.emit('send_notification', {
				sender: userId,
				reciever: receivers[0],
				message: message,
			});
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	useEffect(() => {
		const handleReceiveMessage = (message: IMessage) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		};

		socket.on('message', handleReceiveMessage);

		return () => {
			socket.off('message', handleReceiveMessage);
		};
	}, []);

	useEffect(() => {
		const handleReceiveNotification = (notification: any) => {
			console.log('Received notification:', notification);
			setNotifications((prevNotifications) => [
				...prevNotifications,
				notification,
			]);
		};

		socket.on('notification', handleReceiveNotification);

		return () => {
			socket.off('notification', handleReceiveNotification);
		};
	}, []);

	useEffect(() => {
		socket.on('notification', (notification) => {
			setNotifications((prevNotifications) => [
				...prevNotifications,
				notification,
			]);
		});
	}, []);

	const fetchUser = async () => {
		await axios
			.get(`http://localhost:8000/users/${receivers[0]?.[0]}`)
			.then((response) => {
				setRecieverProfile(response.data);
				console.log(response.data);
			});
	};

	useEffect(() => {
		if (receivers[0]?.[0]) fetchUser();
		const fetchConversations = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/conversations/user/${userId}`
				);
				setConversations(response.data);
				console.log('conversation:', conversations);
			} catch (error) {
				console.error('Error fetching conversations:', error);
			}
		};

		fetchConversations();

		return () => {
			socket.off('connect');
			socket.off('disconnect');
		};
	}, []);

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

	useEffect(() => {
		socket.on('recieve_message', (data) => {
			alert(data.message);
		});
	}, [socket]);

	console.log('notifications: ', notifications);

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
								selectedConversationId === conversation._id
									? 'bg-gray-200'
									: 'hover:bg-gray-100'
							} p-2 py-4 cursor-pointer flex items-center`}
							onClick={() => {
								setConversationId(conversation._id);
								handleConversationClick(conversation._id);
							}}
						>
							<div className='bg-pink text-white rounded-full w-8 h-8 text-center text-xl pt-[1px] mr-5'>
								{recieverProfile?.name?.slice(0, 1)}
							</div>
							<p className='text-xl'>
								{recieverProfile.name + ' ' + recieverProfile.surname}
							</p>
						</div>
					))}
				</div>
			</div>
			<div className='w-2/3 p-2 flex flex-col overflow-y-scroll'>
				{selectedConversationId ? (
					<>
						<div className='flex-grow'>
							<p className=''>{`Messages ${
								selectedConversationId ? `(${selectedConversationId})` : ''
							}`}</p>
							<div className='w-full'>
								{messages.map((message, idx) => (
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
