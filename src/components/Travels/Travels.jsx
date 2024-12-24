// import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import s from './styles.module.scss';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import {
	deleteTravel,
	getTravels,
	suspendOrApproveTravel,
} from '../../redux/reducers/TravelsReducer';
import { useNavigate } from 'react-router-dom'

const Travels = () => {
	const [travelData, setTravelsData] = useState([]);
	const { travels } = useSelector(state => state.travel);
	const dispatch = useDispatch();
	const navigate = useNavigate()

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
			(t) => (
				<div>
					<p style={{ marginBottom: '10px' }}>Are you sure you want to delete this situationship?</p>
					<div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
						<button
							onClick={async () => {
								await toast.promise(dispatch(deleteTravel({ id: id })).unwrap(), {
									loading: 'User deletion...',
									success: 'User successfully deleted!',
									error: err => `${err}`,
								});
								console.log(`User with ID ${id} deleted.`);
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
		{ field: 'name', headerName: 'Name', width: 150 },
		{ field: 'resort', headerName: 'Type', width: 150 },
    {
			field: 'location',
			headerName: 'Location',
			width: 200,
			renderCell: params => {
				

				return `${params.row.locationto.display_name}`;
			},
		},
		{
			field: 'travelDuration',
			headerName: 'Travel Duration',
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

	useEffect(() => {
		dispatch(getTravels());
	}, []);

	useEffect(() => {
		setTravelsData(travels);
	}, [travels]);

	useEffect(() => {
		console.log(travelData);
	}, [travels]);

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	return (
		<div className={s.travels}>
			<h2 className={s.title}>Situationships</h2>
			<ThemeProvider theme={darkTheme}>
				<DataGrid
					rows={travelData}
					columns={columns}
					getRowId={row => row._id}
					rowHeight={25}
					className={s.table}
				/>
			</ThemeProvider>
		</div>
	);
};

export default Travels;
