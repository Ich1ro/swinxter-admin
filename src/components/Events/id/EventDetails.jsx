// import React from 'react'
import { useEffect, useState } from 'react';
import s from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getEventById } from '../../../redux/reducers/EventsReducer';

const EventDetails = () => {
	const [eventData, setEventData] = useState(null);
	const { event } = useSelector(state => state.event);
	const dispatch = useDispatch();
	const { id } = useParams();

	const formatDate = date =>
		date ? new Date(date).toLocaleDateString() : 'Not specified';

	useEffect(() => {
		if (id) {
			dispatch(getEventById({ id: id }));
		}
	}, [id]);

	useEffect(() => {
		setEventData(event);
	}, [event]);

	useEffect(() => {
		console.log(event);
	}, [event]);

	if (!event && eventData?._id !== id && !eventData) {
		return null;
	}

	return (
		<>
			<div className={s.title}>
				<Link to={'/events'}>{`<- Back`}</Link>
				<h2>Event Details</h2>
				<div></div>
			</div>
			<div className={s.details_page}>
				<div className={s.header}>
					<img
						src={eventData?.mainImage}
						alt={`${eventData?.eventName}`}
						className={s.main_image}
					/>
					<h1>{eventData?.eventName}</h1>
				</div>

				<div className={s.info_section}>
					<p>
						<strong>Description:</strong>{' '}
						{eventData?.description || 'No description available.'}
					</p>
					<p>
						<strong>Type:</strong> {eventData?.type}
					</p>
					<p>
						<strong>Start Date:</strong> {formatDate(eventData?.Startdate)}
					</p>
					<p>
						<strong>End Date:</strong> {formatDate(eventData?.EndDate)}
					</p>
					<p>
						<strong>Contact:</strong>{' '}
						{eventData?.contact || 'No contact information.'}
					</p>
					<p>
						<strong>Location:</strong>{' '}
						{eventData?.location?.display_name || 'No location specified.'}
					</p>
					<p>
						<strong>Promoted:</strong> {eventData?.isPromoted ? 'Yes' : 'No'}
					</p>
					<p>
						<strong>Verified:</strong> {eventData?.isverify ? 'Yes' : 'No'}
					</p>
					<p>
						<strong>Participants:</strong>{' '}
						{eventData?.participants.length > 0
							? eventData?.participants.join(', ')
							: 'No participants yet.'}
					</p>
				</div>
			</div>
		</>
	);
};

export default EventDetails;
