import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import Layout from './Layout';
import AboutUs from 'pages/AboutUs';

function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/contact' element={<ContactPage />} />
        <Route path='/about' element={<AboutUs />} />
			</Routes>
		</Layout>
	);
}

export default App;
