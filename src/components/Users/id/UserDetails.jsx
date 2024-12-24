// import React from 'react'
import s from './styles.module.scss';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getUserById } from '../../../redux/reducers/UsersReducer';
import UserCard from './UserCard';

const UserDetails = () => {
	const [userData, setUserData] = useState(null);
	const { user } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			dispatch(getUserById({ id: id }));
		}
	}, [id]);

	useEffect(() => {
		setUserData(user);
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
		</div>
	);
};

export default UserDetails;
