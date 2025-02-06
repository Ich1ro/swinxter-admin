// import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import s from './styles.module.scss';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import {
	createResort,
	deleteResort,
	deleteTravel,
	getResorts,
	getTravels,
	suspendOrApproveTravel,
	updateResort,
} from '../../redux/reducers/TravelsReducer';
import { useNavigate } from 'react-router-dom';

const Travels = () => {
	const [travelData, setTravelsData] = useState([]);
	const [resortData, setResortData] = useState([]);
	const [newResort, setNewResort] = useState({
		name: '',
	});
	const [isOpen, setIsOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [isTravel, setIsTravel] = useState(true);
	const { travels, resorts } = useSelector(state => state.travel);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSuspendApprove = async (id, isActive) => {
		await toast.promise(
			dispatch(suspendOrApproveTravel({ id, suspend: isActive })).unwrap(),
			{
				loading: isActive ? 'Suspending travel...' : 'Approving travel...',
				success: () =>
					`Travel ${isActive ? 'suspended' : 'approved'} successfully!`,
				error: err => `${err}`,
			}
		);
		console.log(`Travel with ID ${id} suspended.`);
	};

	const handleDelete = async id => {
		// await toast.promise(dispatch(deleteTravel({ id: id })).unwrap(), {
		// 	loading: 'Travel deletion...',
		// 	success: () => `Travel successfully deleted!`,
		// 	error: err => `${err}`,
		// });
		console.log(`Travel with ID ${id} deleted.`);
		toast(
			t => (
				<div>
					<p style={{ marginBottom: '10px' }}>
						Are you sure you want to delete this situationship?
					</p>
					<div
						style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}
					>
						<button
							onClick={async () => {
								await toast.promise(
									dispatch(deleteTravel({ id: id }))
										.unwrap()
										.then(() => dispatch(getTravels())),
									{
										loading: 'Situationship deletion...',
										success: 'Situationship successfully deleted!',
										error: err => `${err}`,
									}
								);
								console.log(`Situationship with ID ${id} deleted.`);
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

	const handleDeleteResort = async id => {
		// await toast.promise(dispatch(deleteTravel({ id: id })).unwrap(), {
		// 	loading: 'Travel deletion...',
		// 	success: () => `Travel successfully deleted!`,
		// 	error: err => `${err}`,
		// });
		console.log(`Travel with ID ${id} deleted.`);
		toast(
			t => (
				<div>
					<p style={{ marginBottom: '10px' }}>
						Are you sure you want to delete this resort?
					</p>
					<div
						style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}
					>
						<button
							onClick={async () => {
								await toast.promise(
									dispatch(deleteResort({ id: id }))
										.unwrap()
										.then(() => dispatch(getResorts())),
									{
										loading: 'Resort deletion...',
										success: 'Resort successfully deleted!',
										error: err => `${err}`,
									}
								);
								console.log(`Resort with ID ${id} deleted.`);
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

	const handleSaveNewResort = async () => {
		if (editMode) {
			await toast.promise(
				dispatch(
					updateResort({
						id: newResort._id,
						updatedData: {
							name: newResort.name,
						},
					})
				)
					.unwrap()
					.then(() => dispatch(getResorts())),
				{
					loading: 'Updating resort...',
					success: 'Resort updated successfully!',
					error: err => `${err}`,
				}
			);
		} else {
			await dispatch(createResort({ ...newResort })).then(() =>
				dispatch(getResorts())
			);
		}

		setIsOpen(false);
		setNewResort({
			name: '',
		});
		setEditMode(false);
	};

	const handleEdit = resortData => {
		setNewResort(resortData);
		// setCurrentAdmin(admin);
		setEditMode(true);
		setIsOpen(true);
	};

	const columns = [
		{ field: 'name', headerName: 'Name', width: 150 },
		{ field: 'resort', headerName: 'Type', width: 150 },
		{
			field: 'location',
			headerName: 'Location',
			sortable: false,
			width: 200,
			renderCell: params => {
				if (
					params?.row?.location?.address &&
					params?.row?.location?.city &&
					params?.row?.location?.state &&
					params?.row?.location?.country
				) {
					return `${params?.row?.location?.address}, ${params?.row?.location?.city}, ${params?.row?.location?.state}, ${params?.row?.location?.country}`;
				}
				
			},
		},
		{
			field: 'travelDuration',
			headerName: 'Travel Duration',
			sortable: false,
			width: 210,
			renderCell: params => {
				const { startDate, endDate } = params.row;

				if (!startDate || !endDate) {
					return 'Invalid dates';
				}

				const formatDate = dateString => {
					const date = new Date(dateString);
					const options = {
						day: '2-digit',
						month: 'short',
						year: 'numeric',
					};
					return date.toLocaleString('en-US', options);
				};

				const formattedStart = formatDate(startDate);
				const formattedEnd = formatDate(endDate);

				return `${formattedStart} - ${formattedEnd}`;
			},
		},
		{
			field: 'status',
			headerName: 'Status',
			sortable: false,
			width: 100,
			renderCell: params => {
				const isActive = params.row.isVerify;
				return (
					<button
						onClick={() => handleSuspendApprove(params.row._id, isActive)}
						style={{
							padding: '2px 8px',
							backgroundColor: isActive ? '#f44336' : '#4caf50',
							color: '#fff',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
						}}
					>
						{isActive ? 'Suspend' : 'Approve'}
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
					onClick={() => navigate(`../travel/${params.row._id}`)}
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

	const columns2 = [
		{ field: 'name', headerName: 'Name', width: 500 },
		{
			field: 'edit',
			headerName: 'Edit',
			width: 100,
			renderCell: params => (
				<button
					onClick={() => handleEdit(params.row)}
					style={{
						padding: '2px 8px',
						backgroundColor: '#3f51b5',
						color: '#fff',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					Edit
				</button>
			),
		},
		{
			field: 'delete',
			headerName: 'Delete',
			width: 100,
			renderCell: params => (
				<button
					onClick={() => handleDeleteResort(params.row._id)}
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

	useEffect(() => {
		dispatch(getTravels());
		dispatch(getResorts());
	}, []);

	useEffect(() => {
		setTravelsData(travels);
	}, [travels]);

	useEffect(() => {
		setResortData(resorts);
	}, [resorts]);

	useEffect(() => {
		console.log(travelData);
	}, [travels]);

	// useEffect(() => {
	// 	console.log(travelData);
	// }, [resort]);

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	return (
		<div className={s.travels}>
			{isOpen && (
				<div className={s.modal}>
					<div className={s.modalContent}>
						<h3>{editMode ? 'Edit Resort' : 'Add New Resort'}</h3>
						<label>
							Name:
							<input
								type='text'
								value={newResort.name}
								onChange={e =>
									setNewResort({ ...newResort, name: e.target.value })
								}
							/>
						</label>

						<div className={s.modalActions}>
							<button onClick={handleSaveNewResort}>Save</button>
							<button
								onClick={() => {
									setNewResort({
										name: '',
									});
									setIsOpen(false);
									setEditMode(false);
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
			{isTravel ? (
				<h2 className={s.title}>Situationships</h2>
			) : (
				<div className={s.title_wrapper}>
					<div className={s.empty}></div>
					<h2 className={s.title}>Situationships</h2>
					<button className={s.add_new} onClick={() => setIsOpen(true)}>
						Add New
					</button>
				</div>
			)}
			<div className={s.tabs}>
				<button onClick={() => setIsTravel(true)}>travels</button>
				<button onClick={() => setIsTravel(false)}>resorts</button>
			</div>
			{isTravel ? (
				<ThemeProvider theme={darkTheme}>
					<DataGrid
						rows={travelData}
						columns={columns}
						getRowId={row => row._id || ''}
						rowHeight={25}
						className={s.table}
					/>
				</ThemeProvider>
			) : (
				<ThemeProvider theme={darkTheme}>
					<DataGrid
						rows={resortData}
						columns={columns2}
						getRowId={row => row._id || ''}
						rowHeight={25}
						className={s.table}
					/>
				</ThemeProvider>
			)}
		</div>
	);
};

export default Travels;
