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

const Clubs = () => {
	const [clubData, setClubsData] = useState([]);
	const { clubs } = useSelector(state => state.club);
	const dispatch = useDispatch();

	const handleSuspendApprove = async (id, isActive) => {
		await toast.promise(
			dispatch(suspendOrApproveClub({ id, suspend: isActive })).unwrap(),
			{
				loading: isActive ? 'Suspending club...' : 'Approving club...',
				success: () =>
					`Club ${isActive ? 'suspended' : 'approved'} successfully!`,
				error: err => `${err}`,
			}
		);
		console.log(`Club with ID ${id} suspended.`);
	};

	const handleDelete = async id => {
		await toast.promise(dispatch(deleteClub({ id: id })).unwrap(), {
			loading: 'Club deletion...',
			success: () => `Club successfully deleted!`,
			error: err => `${err}`,
		});
		console.log(`Club with ID ${id} deleted.`);
	};

	const columns = [
		{ field: 'clubname', headerName: 'Name', width: 150 },
		{ field: 'owner_name', headerName: 'Owner', width: 200 },
		{ field: 'clubtype', headerName: 'Type', width: 200 },
		{
			field: 'status',
			headerName: 'Status',
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
			field: 'delete',
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
			<h2 className={s.title}>Clubs</h2>
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