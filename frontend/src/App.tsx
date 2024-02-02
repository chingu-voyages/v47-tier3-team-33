import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import Layout from './Layout';
import AboutUs from 'pages/AboutUs';
import EventsPage from 'pages/EventsPage';
import CategoriesPage from 'pages/CategoriesPage';
import CreateEventPage from 'pages/CreateEventPage';
import { useAuth } from 'context/AuthContext';
import { Navigate } from 'react-router';

function App() {
	const { user } = useAuth();
	console.log(user);

	return (
		<Layout>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/categories/:id?' element={<CategoriesPage />} />
				<Route path='/contact' element={<ContactPage />} />
				<Route path='/about' element={<AboutUs />} />
				<Route path='/events' element={<EventsPage />} />
				<Route path='/create-event' element={<CreateEventPage />} />
			</Routes>
		</Layout>
	);
}

export default App;
