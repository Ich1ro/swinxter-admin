// import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import s from './styles.module.scss';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import {
	deleteClub,
	getClubs,
	suspendOrApproveClub,
} from '../../redux/reducers/ClubsReducer';
import { useNavigate } from 'react-router-dom'

const Clubs = () => {
	const [clubData, setClubsData] = useState([]);
	const { clubs } = useSelector(state => state.club);
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const handleSuspendApprove = async (id, isActive) => {
		await toast.promise(
			dispatch(suspendOrApproveClub({ id, suspend: isActive })).unwrap(),
			{
				loading: isActive ? 'Suspending business...' : 'Approving business...',
				success: () =>
					`Business ${isActive ? 'suspended' : 'approved'} successfully!`,
				error: err => `${err}`,
			}
		);
		console.log(`Business with ID ${id} suspended.`);
	};

	const handleDelete = async id => {
		// await toast.promise(dispatch(deleteClub({ id: id })).unwrap(), {
		// 	loading: 'Club deletion...',
		// 	success: () => `Club successfully deleted!`,
		// 	error: err => `${err}`,
		// });
		console.log(`Club with ID ${id} deleted.`);
		toast(
			(t) => (
				<div>
					<p style={{ marginBottom: '10px' }}>Are you sure you want to delete this business?</p>
					<div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
						<button
							onClick={async () => {
								await toast.promise(dispatch(deleteClub({ id: id })).unwrap(), {
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
		{ field: 'business_name', headerName: 'Name', width: 150 },
		{ field: 'owner_name', headerName: 'Owner', width: 200 },
		{ field: 'business_type', headerName: 'Type', width: 200 },
		{
			field: 'status',
			headerName: 'Status',
			sortable: false,
			width: 150,
			renderCell: params => {
				const isActive = params.row.isverify;
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
			sortable: false,
			headerName: 'Details',
			width: 100,
			renderCell: params => (
				<button
					onClick={() => navigate(`../club/${params.row._id}`)}
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
			sortable: false,
			headerName: 'Delete',
			width: 150,
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
		dispatch(getClubs());
	}, []);

	useEffect(() => {
		setClubsData(clubs);
	}, [clubs]);

	useEffect(() => {
		console.log(clubData);
	}, [clubs]);

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	return (
		<div className={s.clubs}>
			<h2 className={s.title}>Businesses</h2>
			<ThemeProvider theme={darkTheme}>
				<DataGrid
					rows={clubData}
					columns={columns}
					getRowId={row => row._id}
					rowHeight={25}
					className={s.table}
				/>
			</ThemeProvider>
		</div>
	);
};

export default Clubs;
