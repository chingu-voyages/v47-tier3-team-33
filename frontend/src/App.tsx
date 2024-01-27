import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import EventsPage from './pages/EventsPage';
import Layout from './Layout';

function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/contact' element={<ContactPage />} />
				<Route path='/events' element={<EventsPage />} />

			</Routes>
		</Layout>
	);
}

export default App;
