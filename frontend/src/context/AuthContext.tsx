import { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextProps {
	login: boolean;
	setLogin: (value: boolean) => void;
	handleLogin: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [login, setLogin] = useState<boolean>(true);

	const handleLogin = () => {
		setLogin(!login);
	};

	return (
		<AuthContext.Provider value={{ login, setLogin, handleLogin }}>
			{children}
		</AuthContext.Provider>
	);
};
