import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import Layout from './Layout';
import AboutUs from 'pages/AboutUs';
import EventsPage from 'pages/EventsPage';
import CategoriesPage from 'pages/CategoriesPage';
import CreateEventPage from 'pages/CreateEventPage';
import AccountDashboard from 'pages/AccountDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YourCreatedEventsPage from 'pages/YourCreatedEventsPage';
import YourJoinedEventsPage from 'pages/YourJoinedEventsPage';

function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/categories/:id?' element={<CategoriesPage />} />
				<Route path='/contact' element={<ContactPage />} />
				<Route path='/about' element={<AboutUs />} />
				<Route path='/events' element={<EventsPage />} />
				<Route path='/create-event' element={<CreateEventPage />} />
				<Route path='/my-account' element={<AccountDashboard />} />
				<Route path='/your-created-event' element={<YourCreatedEventsPage />} />
				<Route path='/your-joined-event' element={<YourJoinedEventsPage />} />
			</Routes>
			<ToastContainer
				autoClose={5000}
				closeOnClick
				theme='light'
				hideProgressBar={false}
			/>
		</Layout>
	);
}

export default App;
