// import React from 'react'
import { useAuth } from '../../hooks/AuthHook';
import s from './styles.module.scss';
import user_image from '../../assets/user-profile.png';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
	const { currentUser } = useAuth();
	const { logout } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return (
		<div className={s.sidebar}>
			<div className={s.user}>
				<img src={user_image} alt='' width={50} />
				<p className={s.user_name}>Hello, {currentUser.name}</p>
			</div>
			<div className={s.nav}>
				<NavLink
					to={'/'}
					className={({ isActive, isPending }) =>
						isPending ? s.pending : isActive ? s.active : ''
					}
				>
					Dashboard
				</NavLink>
				{currentUser.users && (
					<NavLink
						to={'/users'}
						className={({ isActive, isPending }) =>
							isPending ? s.pending : isActive ? s.active : ''
						}
					>
						Users
					</NavLink>
				)}
				{currentUser.events && (
					<NavLink
						to={'/events'}
						className={({ isActive, isPending }) =>
							isPending ? s.pending : isActive ? s.active : ''
						}
					>
						Events
					</NavLink>
				)}
				{currentUser.clubs && (
					<NavLink
						to={'/clubs'}
						className={({ isActive, isPending }) =>
							isPending ? s.pending : isActive ? s.active : ''
						}
					>
						Businesses
					</NavLink>
				)}
				{currentUser.situationships && (
					<NavLink
						to={'/travels'}
						className={({ isActive, isPending }) =>
							isPending ? s.pending : isActive ? s.active : ''
						}
					>
						Situationships
					</NavLink>
				)}
				{currentUser.admins && (
					<NavLink
						to={'/banners'}
						className={({ isActive, isPending }) =>
							isPending ? s.pending : isActive ? s.active : ''
						}
					>
						Banners
					</NavLink>
				)}
				{currentUser.admins && (
					<NavLink
						to={'/admins'}
						className={({ isActive, isPending }) =>
							isPending ? s.pending : isActive ? s.active : ''
						}
					>
						Admins
					</NavLink>
				)}
			</div>
			<button className={s.logout} onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
};

export default Sidebar;
