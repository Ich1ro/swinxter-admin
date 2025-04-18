// import React from 'react'
import s from './styles.module.scss';
import user_image from '../../../assets/user-profile.png';

const UserCard = ({ profile_type, username, title, userData, location }) => {
	const formatDate = date =>
		date ? new Date(date).toLocaleDateString() : 'Not specified';
	return (
		<div className={profile_type === 'single' ? s.single_user : s.couple}>
			<h2>{title}</h2>
			<img
				src={userData?.image || user_image}
				alt={
					username
						? `${username}'s profile`
						: 'Not specified'
				}
				className={s.profile_image}
			/>
			<p>
				<strong>Username:</strong>{' '}
				{username ? username : 'Not specified'}
			</p>
			<p>
				<strong>Email:</strong>{' '}
				{userData?.email ? userData?.email : 'Not specified'}
			</p>
			<p>
				<strong>Gender:</strong> {userData?.gender || 'Not specified'}
			</p>
			<p>
				<strong>Date of Birth:</strong> {formatDate(userData?.DOB)}
			</p>
			<p>
				<strong>Location:</strong>{' '}
				{location?.city && location?.state && location?.country
					? `${location?.city}, ${location?.state}, ${location?.country}`
					: `${location?.address} ${location?.street}, ${location?.municipality}, ${location?.country}`}
			</p>
			{/* <p>
				<strong>Subscription Plan:</strong>{' '}
				{payment?.membership_plan || 'Free Plan'}
			</p>
			<p>
				<strong>Membership Expiry:</strong>{' '}
				{formatDate(payment?.membership_expiry)}
			</p> */}
		</div>
	);
};

export default UserCard;
