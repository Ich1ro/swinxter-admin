// import React from 'react'
import s from './styles.module.scss';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
	getUserById,
	updateUserMembership,
} from '../../../redux/reducers/UsersReducer';
import UserCard from './UserCard';
import toast from 'react-hot-toast';

const UserDetails = () => {
	const [userData, setUserData] = useState(null);
	const { user } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const { id } = useParams();
	const [isEditing, setIsEditing] = useState(false);
	const [membershipData, setMembershipData] = useState({
		membership: user?.payment?.membership || false,
		membership_plan: user?.payment?.membership_plan || 'Free Plan',
		membership_price: user?.payment?.membership_price || '',
		membership_expiry: user?.payment?.membership_expiry || '',
		membership_pause: user?.payment?.membership_pause || false,
	});

	const plans = [
		'Free Plan',
		'3 Days',
		'1 Week',
		'1 Month',
		'3 Months',
		'6 Months',
		'9 Months',
	];

	const handleInputChange = e => {
		const { name, value, type, checked } = e.target;
		setMembershipData({
			...membershipData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const handleSave = async () => {
		try {
			const data = {
				id: id,
				updatedData: {
					plan: membershipData.membership_plan,
					pause: membershipData.membership_pause,
				},
			};

			await dispatch(updateUserMembership(data))
				.unwrap()
				.then(() => dispatch(getUserById({ id: id })));
			toast.success('Membership updated successfully');
			setIsEditing(false);
		} catch (error) {
			toast.error(error || 'Failed to update membership');
			console.error('Error updating membership:', error);
		}
	};

	useEffect(() => {
		if (id) {
			dispatch(getUserById({ id: id }));
		}
	}, [id]);

	useEffect(() => {
		setUserData(user);
		setMembershipData({
			membership: user?.payment?.membership || false,
			membership_plan: user?.payment?.membership_plan || 'Free Plan',
			membership_price: user?.payment?.membership_price || '',
			membership_expiry: user?.payment?.membership_expiry || '',
			membership_pause: user?.payment?.membership_pause || false,
		});
	}, [user]);

	useEffect(() => {
		console.log(user);
	}, [user]);

	if (!user && userData?._id !== id && !userData) {
		return null;
	}

	return (
		<div className={s.details_page}>
			{userData?.profile_type === 'single' ? (
				<div className={s.couple_user}>
					<div className={s.title}>
						<Link to={'/users'}>{`<- Back`}</Link>
						<h2>User Details</h2>
						<div></div>
					</div>
					<UserCard
						profile_type={'single'}
						title={''}
						username={userData?.username}
						userData={userData}
						location={userData?.location}
						payment={userData?.payment}
					/>
				</div>
			) : (
				<div className={s.couple_user}>
					<div className={s.title}>
						<Link to={'/users'}>{`<- Back`}</Link>
						<h2>Couple Details</h2>
						<div></div>
					</div>
					<div className={s.couple_container}>
						<UserCard
							profile_type={'couple'}
							title={'Person 1'}
							username={userData?.couple?.person1?.person1_Name}
							userData={userData?.couple?.person1}
							location={userData?.location}
							payment={userData?.payment}
						/>
						<UserCard
							profile_type={'couple'}
							title={'Person 2'}
							username={userData?.couple?.person2?.person2_Name}
							userData={userData?.couple?.person2}
							location={userData?.location}
							payment={userData?.payment}
						/>
					</div>
				</div>
			)}

			<div className={s.single_user} style={{ marginTop: '20px' }}>
				<h3 style={{ marginTop: '0' }}>Membership Details</h3>

				{isEditing ? (
					<div className={s.inputs}>
						<label>
							Plan:
							<select
								name='membership_plan'
								value={membershipData.membership_plan}
								onChange={handleInputChange}
								disabled={membershipData.membership_pause}
							>
								{plans.map(plan => (
									<option key={plan} value={plan}>
										{plan}
									</option>
								))}
							</select>
						</label>
						<label>
							Pause Membership:
							<input
								type='checkbox'
								name='membership_pause'
								checked={membershipData.membership_pause}
								onChange={handleInputChange}
							/>
						</label>
						<button onClick={handleSave}>Save</button>
						<button onClick={() => setIsEditing(false)}>Cancel</button>
					</div>
				) : (
					<div className={s.inputs}>
						<p>
							<strong>Plan:</strong> {user?.payment?.membership_plan}
						</p>
						{user?.payment?.membership_price && (
							<p>
								<strong>Price:</strong> {user?.payment?.membership_price}
							</p>
						)}
						<p>
							<strong>Expiry:</strong>{' '}
							{new Date(user?.payment?.membership_expiry).toLocaleString()}
						</p>
						<p>
							<strong>Pause:</strong>{' '}
							{user?.payment?.membership_pause ? 'Yes' : 'No'}
						</p>
						<button onClick={() => setIsEditing(true)}>Edit</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserDetails;
