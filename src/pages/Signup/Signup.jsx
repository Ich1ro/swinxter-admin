// import React from 'react'
import { useEffect, useState } from 'react';
import s from './styles.module.scss';
import { useAuth } from '../../hooks/AuthHook';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
	const { register, currentUser } = useAuth();
	const [details, setDetails] = useState({
		username: '',
		password: '',
	});
	const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();
		await register({
			...details,
			name: details.username,
			events: true,
			situationships: true,
			clubs: true,
			users: true,
			admins: true,
		});
		navigate('/');
	};

	useEffect(() => {
		if (currentUser) {
			navigate('/');
		}
	}, [currentUser]);

	return (
		<div className={s.login}>
			<form action='' onSubmit={handleSubmit}>
				<h3>Sign Up</h3>
				<input
					type='text'
					placeholder='Username'
					onChange={e =>
						setDetails(prev => ({ ...prev, username: e.target.value }))
					}
				/>
				<input
					type='password'
					placeholder='Password'
					onChange={e =>
						setDetails(prev => ({ ...prev, password: e.target.value }))
					}
				/>
				<button type='submit'>Sign Up</button>
			</form>
		</div>
	);
};

export default Signup;
