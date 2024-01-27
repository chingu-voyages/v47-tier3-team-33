import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import Layout from './Layout';
import EventsPage from 'pages/EventsPage';
import CategoriesPage from 'pages/CategoriesPage';

function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/categories' element={<CategoriesPage />} />
				<Route path='/contact' element={<ContactPage />} />
				<Route path='/events' element={<EventsPage />} />
			</Routes>
		</Layout>
	);
}

export default App;
