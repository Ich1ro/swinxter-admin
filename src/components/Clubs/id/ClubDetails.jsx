// import React from 'react'
import s from './styles.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getClubById } from '../../../redux/reducers/ClubsReducer';
import user_image from '../../../assets/user-profile.png';

const ClubDetails = () => {
	const [clubData, setClubData] = useState(null);
	const { club } = useSelector(state => state.club);
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			dispatch(getClubById({ id: id }));
		}
	}, [id]);

	useEffect(() => {
		setClubData(club);
	}, [club]);

	useEffect(() => {
		console.log(club);
	}, [club]);

	if (!event && clubData?._id !== id && !clubData) {
		return null;
	}

	return (
		<>
			<div className={s.title}>
				<Link to={'/clubs'}>{`<- Back`}</Link>
				<h2>Business Details</h2>
				<div></div>
			</div>
			<div className={s.details_page}>
				<div className={s.header}>
					<img
						src={clubData?.mainImage ? clubData?.mainImage : user_image}
						alt={clubData?.clubname}
						className={s.main_image}
					/>
					<h1>{clubData?.clubname}</h1>
				</div>

				<div className={s.info_section}>
					<p>
						<strong>Introduction:</strong>{' '}
						{clubData?.introduction || 'No introduction provided.'}
					</p>
					<p>
						<strong>Description:</strong>{' '}
						{clubData?.description || 'No description available.'}
					</p>
					<p>
						<strong>Type:</strong> {clubData?.clubtype}
					</p>
					<p>
						<strong>Contact:</strong>{' '}
						{clubData?.contact || 'No contact information.'}
					</p>
					<p>
						<strong>Email:</strong> {clubData?.email || 'No email provided.'}
					</p>
					<p>
						<strong>Website:</strong>{' '}
						{clubData?.website ? (
							<a
								href={clubData?.website}
								target='_blank'
								rel='noopener noreferrer'
							>
								{clubData?.website}
							</a>
						) : (
							'No website available.'
						)}
					</p>
					<p>
						<strong>Location:</strong>{' '}
						{clubData?.location?.display_name || 'No location specified.'}
					</p>
					<p>
						<strong>Verified:</strong> {clubData?.isverify ? 'Yes' : 'No'}
					</p>
				</div>

				{/* <div className={s.gallery}>
				<h2>Gallery</h2>
				{clubData?.image.length > 0 ? (
					<div className={s.image_grid}>
						{clubData?.image.map((img, idx) => (
							<img
								key={idx}
								src={img}
								alt={`Gallery ${idx + 1}`}
								className={s.gallery_image}
							/>
						))}
					</div>
				) : (
					<p>No images available.</p>
				)}
			</div> */}

				<div className={s.comments_section}>
					<h2>Comments</h2>
					{clubData?.comments.length > 0 ? (
						<>
							{clubData?.comments.map((comment, idx) => (
								<div key={idx} className={s.comment}>
									<p>
										<strong>{comment.username}:</strong> {comment.comment}
									</p>
									<p>
										<strong>Rating:</strong> {comment.rating}
									</p>
								</div>
							))}
						</>
					) : (
						<p>No comments yet.</p>
					)}
				</div>
			</div>
		</>
	);
};

export default ClubDetails;
