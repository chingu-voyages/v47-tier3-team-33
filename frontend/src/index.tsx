import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SocketProvider } from './context/SocketContext';
library.add(faSearch);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<SocketProvider>
			<AuthProvider>
				<Router>
					<App />
				</Router>
			</AuthProvider>
		</SocketProvider>
	</React.StrictMode>
);
