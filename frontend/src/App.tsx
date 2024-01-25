import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ContactPage from './pages/ContactPage';
import Layout from './Layout';

function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/contact' element={<ContactPage />} />
			</Routes>
		</Layout>
	);
}

export default App;
