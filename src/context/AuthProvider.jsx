import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [loadingUser, setLoadingUser] = useState(true);
	const [error, setError] = useState(null);

	const login = async details => {
		setLoading(true);
		setError(null);

		await toast.promise(
			axios
				.post('https://swinxter-back.onrender.com/admin/login', details)
				.then(res => {
					setCurrentUser(res.data);
				})
				.catch(err => {
					setError(err.message);
					throw new Error('Login error');
				})
				.finally(() => {
					setLoading(false);
				}),
			{
				loading: 'Logging in...',
				success: 'Login success!',
				error: 'Login error!',
			}
		);
	};

	const register = async details => {
		setLoading(true);
		setError(null);

		await toast.promise(
			axios
				.post('https://swinxter-back.onrender.com/admin/signup', details)
				// .then(res => {
				// 	// setCurrentUser(res.data);
				// })
				.catch(err => {
					setError(err.message);
					throw new Error('Login error');
				})
				.finally(() => {
					setLoading(false);
				}),
			{
				loading: 'Registration...',
				success: 'Registration success!',
				error: 'Registration error!',
			}
		);
	};

	const logout = () => {
		setCurrentUser(null);
		localStorage.removeItem('currentUser');
	};

	useEffect(() => {
		const savedUser = localStorage.getItem('currentUser');
		if (savedUser) {
			setCurrentUser(JSON.parse(savedUser));
		}
		setLoadingUser(false)
	}, []);

	useEffect(() => {
		if (currentUser) {
			localStorage.setItem('currentUser', JSON.stringify(currentUser));
		} else {
			localStorage.removeItem('currentUser');
		}
	}, [currentUser]);

	useEffect(() => {
		console.log(currentUser);	
	}, [currentUser]);

	if (loadingUser) {
		return null;
	}

	return (
		<AuthContext.Provider
			value={{ currentUser, setCurrentUser, login, register, logout, loading, error }}
		>
			{children}
		</AuthContext.Provider>
	);
};
