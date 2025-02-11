// import React from 'react'
import s from './styles.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { editBanner, getBannerById } from '../../../redux/reducers/bannerReducer';
import toast from 'react-hot-toast'

const Banner = () => {
	const [bannerData, setBannerData] = useState(null);
	const [isEdit, setIsEdit] = useState(false);
	const { banner } = useSelector(state => state.banner);
	const dispatch = useDispatch();
	const { id } = useParams();

	const handleSave = async () => {
		await toast.promise(
			dispatch(
				editBanner({
					id: bannerData._id,
					updatedData: {
						title: bannerData.title,
						page: bannerData.page,
						active: bannerData.active,
					},
				})
			)
				.unwrap()
				.then(() => dispatch(getBannerById({ id: id }))),
			{
				loading: 'Updating banner...',
				success: 'Banner updated successfully!',
				error: err => `${err}`,
			}
		);

		setIsEdit(false)
	};

	useEffect(() => {
		if (id) {
			dispatch(getBannerById({ id: id }));
		}
	}, [id]);

	useEffect(() => {
		setBannerData(banner);
	}, [banner]);

	useEffect(() => {
		console.log(banner);
	}, [banner]);

	if (!banner && bannerData?._id !== id && !bannerData) {
		return null;
	}

	return (
		<>
			<div className={s.title}>
				<Link to={'/banners'}>{`<- Back`}</Link>
				<h2>Banner Details</h2>
				<button onClick={() => setIsEdit(!isEdit)}>Edit</button>
			</div>
			<div className={s.details_page}>
				<div className={s.header}>
					<img
						src={bannerData?.imgUrl ? bannerData?.imgUrl : ''}
						alt={bannerData?.page}
						className={s.main_image}
					/>
					<h1>{bannerData?.title}</h1>
				</div>

				<div className={s.info_section}>
					{isEdit ? (
						<div>
							<p>
								<strong style={{ marginRight: '10px' }}>Page:</strong>
								<input
									type='text'
									value={bannerData?.page}
									onChange={e => {
										setBannerData({ ...bannerData, page: e.target.value });
									}}
								/>
							</p>
							<p>
								<strong style={{ marginRight: '10px' }}>Active:</strong>
								<input
									type='checkbox'
									checked={bannerData.active}
									onChange={e => {
										setBannerData({ ...bannerData, active: e.target.checked });
									}}
								/>
							</p>
							<button onClick={handleSave}>Save</button>
						</div>
					) : (
						<>
							<p>
								<strong>Page:</strong> {bannerData?.page || ''}
							</p>
							<p>
								<strong>Active:</strong> {bannerData?.active ? 'Yes' : 'No'}
							</p>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default Banner;
