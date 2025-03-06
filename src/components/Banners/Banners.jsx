// import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import s from './styles.module.scss';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
	createBanner,
	deleteBanner,
	getBanners,
	suspendOrApproveBanner,
} from '../../redux/reducers/bannerReducer';

const Banners = () => {
	const [bannersData, setBannersData] = useState([]);
	const { banners } = useSelector(state => state.banner);
	// const [currentBanner, setCurrentBanner] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	// const [editMode, setEditMode] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [newBanner, setNewBanner] = useState({
		image: '',
		title: '',
		page: '',
		active: false,
	});

	const handleSuspendApprove = async (id, isApprove) => {
		await toast.promise(
			dispatch(suspendOrApproveBanner({ id, suspend: isApprove })).unwrap(),
			{
				loading: isApprove ? 'Suspending banner...' : 'Approving banner...',
				success: () =>
					`Banner ${isApprove ? 'suspended' : 'approved'} successfully!`,
				error: err => `${err}`,
			}
		);
		console.log(`Banner with ID ${id} suspended.`);
	};

	const handleDelete = async id => {
		// await toast.promise(dispatch(deleteBanner({ id: id })).unwrap(), {
		// 	loading: 'Banner deletion...',
		// 	success: () =>
		// 		`Banner successfully deleted!`,
		// 	error: err => `${err}`,
		// });
		toast(
			t => (
				<div>
					<p style={{ marginBottom: '10px' }}>
						Are you sure you want to delete this user?
					</p>
					<div
						style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}
					>
						<button
							onClick={async () => {
								await toast.promise(
									dispatch(deleteBanner({ id: id }))
										.unwrap()
										.then(() => dispatch(getBanners())),
									{
										loading: 'Banner deletion...',
										success: 'Banner successfully deleted!',
										error: err => `${err}`,
									}
								);
								console.log(`Banner with ID ${id} deleted.`);
								toast.dismiss(t.id);
							}}
							style={{
								padding: '2px 8px',
								backgroundColor: '#b64a4a',
								color: '#fff',
								border: 'none',
								borderRadius: '4px',
								cursor: 'pointer',
							}}
						>
							Yes
						</button>
						<button
							onClick={() => toast.dismiss(t.id)}
							style={{
								padding: '2px 8px',
								backgroundColor: '#4caf50',
								color: '#fff',
								border: 'none',
								borderRadius: '4px',
								cursor: 'pointer',
							}}
						>
							No
						</button>
					</div>
				</div>
			),
			{
				duration: Infinity,
			}
		);
	};

	const columns = [
		{ field: 'title', headerName: 'Title', width: 100 },
		{
			field: 'page',
			headerName: 'Page',
			width: 100,
		},
		{
			field: 'active',
			sortable: false,
			headerName: 'Active',
			width: 100,
			renderCell: params => {
				return `${params.row?.active ? 'Yes' : 'No'}`;
			},
		},
		{
			field: 'status',
			headerName: 'Status',
			sortable: false,
			width: 150,
			renderCell: params => {
				const isApprove = params.row.isApprove;
				return (
					<button
						onClick={() => handleSuspendApprove(params.row._id, isApprove)}
						style={{
							padding: '2px 8px',
							backgroundColor: isApprove ? '#f44336' : '#4caf50',
							color: '#fff',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
						}}
					>
						{isApprove ? 'Suspend' : 'Approve'}
					</button>
				);
			},
		},
		{
			field: 'details',
			headerName: 'Details',
			sortable: false,
			width: 100,
			renderCell: params => (
				<button
					onClick={() => navigate(`../banner/${params?.row?._id}`)}
					style={{
						padding: '2px 8px',
						backgroundColor: '#3f51b5',
						color: '#fff',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					Details
				</button>
			),
		},

		{
			field: 'delete',
			headerName: 'Delete',
			sortable: false,
			width: 100,
			renderCell: params => (
				<button
					onClick={() => handleDelete(params.row._id)}
					style={{
						padding: '2px 8px',
						backgroundColor: '#b64a4a',
						color: '#fff',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					Delete
				</button>
			),
		},
	];

	const handleSaveNewAdmin = async () => {
		console.log(newBanner);

		await dispatch(createBanner(newBanner))
			.unwrap()
			.then(() => dispatch(getBanners()));

		setIsModalOpen(false);
		setNewBanner({
			image: '',
			title: '',
			page: '',
			active: false,
		});
		// setEditMode(false);
	};

	useEffect(() => {
		dispatch(getBanners());
	}, []);

	useEffect(() => {
		setBannersData(banners);
	}, [banners]);

	useEffect(() => {
		console.log(banners);
	}, [banners]);

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	const handleAddNew = () => {
		setIsModalOpen(true);
	};

	return (
		<div className={s.users}>
			<div className={s.title}>
				<div className={s.empty}></div>
				<h2 className={s.title_item}>Banners</h2>
				<button onClick={handleAddNew}>Add new</button>
			</div>
			<ThemeProvider theme={darkTheme}>
				<DataGrid
					rows={bannersData}
					columns={columns}
					getRowId={row => row?._id || ''}
					rowHeight={25}
					className={s.table}
				/>
			</ThemeProvider>
			{isModalOpen && (
				<div className={s.modal}>
					<div className={s.modalContent}>
						<h3>Add New Banner</h3>
						<label>
							Image:
							<input
								type='file'
								// value={newBanner.name}
								accept='.jpg, .jpeg, .png'
								onChange={e =>
									setNewBanner({ ...newBanner, image: e.target.files[0] })
								}
							/>
						</label>
						<label>
							Title:
							<input
								type='text'
								value={newBanner.title}
								onChange={e =>
									setNewBanner({ ...newBanner, title: e.target.value })
								}
							/>
						</label>
						<label>
							Page:
							<select
								value={newBanner.page}
								onChange={e =>
									setNewBanner({ ...newBanner, page: e.target.value })
								}
							>
								<option value=''>Select Option</option>
								<option value='travel'>Travel</option>
								<option value='event'>Event</option>
								<option value='business'>Business</option>
							</select>
						</label>
						<label>
							Active:
							<input
								type='checkbox'
								checked={newBanner.active}
								onChange={e =>
									setNewBanner({ ...newBanner, active: e.target.checked })
								}
							/>
						</label>

						<div className={s.modalActions}>
							<button onClick={handleSaveNewAdmin}>Save</button>
							<button
								onClick={() => {
									setNewBanner({
										image: '',
										title: '',
										page: '',
										active: false,
									});
									setIsModalOpen(false);
									// setEditMode(false);
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Banners;
