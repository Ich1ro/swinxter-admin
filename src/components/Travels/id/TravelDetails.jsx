// import React from 'react'
import s from './styles.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getTravelById } from '../../../redux/reducers/TravelsReducer';

const TravelDetails = () => {
	const [travelData, setTravelData] = useState(null);
	const { travel } = useSelector(state => state.travel);
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			dispatch(getTravelById({ id: id }));
		}
	}, [id]);

	useEffect(() => {
		setTravelData(travel);
	}, [travel]);

	useEffect(() => {
		console.log(travel);
	}, [travel]);

	return (
		<>
			<div className={s.title}>
				<Link to={'/travels'}>{`<- Back`}</Link>
				<h2>Situationship Details</h2>
				<div></div>
			</div>
			<div className={s.details_page}>
				<div className={s.header}>
					<img
						src={travelData?.image ? travelData?.image : 'Not specified'}
						alt={travelData?.name}
						className={s.main_image}
					/>
					<h1>{travelData?.name}</h1>
					<p className={s.verification_status}>
						<strong>Verified:</strong> {travelData?.isVerify ? 'Yes' : 'No'}
					</p>
				</div>

				<div className={s.info_section}>
					<p>
						<strong>Description:</strong>{' '}
						{travelData?.description || 'No description available.'}
					</p>
					<p>
						<strong>Location:</strong>{' '}
						{travelData?.locationto?.display_name || 'No location specified.'}
					</p>
					<p>
						<strong>Start Date:</strong>{' '}
						{new Date(travelData?.startDate).toLocaleString() || 'Not specified.'}
					</p>
					<p>
						<strong>End Date:</strong>{' '}
						{new Date(travelData?.endDate).toLocaleString() || 'Not specified.'}
					</p>
					<p>
						<strong>Resort:</strong> {travelData?.resort || 'No resort information.'}
					</p>
					<p>
						<strong>Interested:</strong>{' '}
						{travelData?.interested && travelData?.interested.length > 0
							? travelData?.interested.join(', ')
							: 'No interest data available.'}
					</p>
				</div>
			</div>
		</>
	);
};

export default TravelDetails;
