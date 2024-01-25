import { ReactNode } from 'react';
import NavBar from './components/Navbar';
import Footer from './components/Footer';

interface LayoutProps {
	children: ReactNode;
}

function Layout({ children }: LayoutProps) {
	return (
		<>
			<NavBar />
			{children}
			<Footer />
		</>
	);
}

export default Layout;
