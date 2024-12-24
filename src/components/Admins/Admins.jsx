// import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import s from './styles.module.scss';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import { deleteAdmin, getAdmins } from '../../redux/reducers/AdminsReducer'


const Admins = () => {
	const [adminData, setAdminsData] = useState([]);
	const { admins } = useSelector(state => state.admin);
	const dispatch = useDispatch();

	// const handleSuspendApprove = async (id, isActive) => {
	// 	await toast.promise(
	// 		dispatch(suspendOrApproveAdmin({ id, suspend: isActive })).unwrap(),
	// 		{
	// 			loading: isActive ? 'Suspending admin...' : 'Approving admin...',
	// 			success: () =>
	// 				`Admin ${isActive ? 'suspended' : 'approved'} successfully!`,
	// 			error: err => `${err}`,
	// 		}
	// 	);
	// 	console.log(`Admin with ID ${id} suspended.`);
	// };

	const handleDelete = async id => {
		// await toast.promise(dispatch(deleteAdmin({ id: id })).unwrap(), {
		// 	loading: 'Admin deletion...',
		// 	success: () => `Admin successfully deleted!`,
		// 	error: err => `${err}`,
		// });
		console.log(`Admin with ID ${id} deleted.`);
		toast(
			(t) => (
				<div>
					<p style={{ marginBottom: '10px' }}>Are you sure you want to delete this admin user?</p>
					<div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
						<button
							onClick={async () => {
								await toast.promise(dispatch(deleteAdmin({ id: id })).unwrap(), {
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
		{ field: 'username', headerName: 'Username', width: 150 },
		{ field: 'events', headerName: 'Events', width: 100 },
		{ field: 'clubs', headerName: 'Clubs', width: 100 },
		{ field: 'situationships', headerName: 'Situationships', width: 100 },
		{ field: 'users', headerName: 'Users', width: 100 },
		{ field: 'admins', headerName: 'Admins', width: 100 },
		// {
		// 	field: 'status',
		// 	headerName: 'Status',
		// 	width: 150,
		// 	renderCell: params => {
		// 		const isActive = params.row.isverify;
		// 		return (
		// 			<button
		// 				onClick={() => handleSuspendApprove(params.row._id, isActive)}
		// 				style={{
		// 					padding: '2px 8px',
		// 					backgroundColor: isActive ? '#f44336' : '#4caf50',
		// 					color: '#fff',
		// 					border: 'none',
		// 					borderRadius: '4px',
		// 					cursor: 'pointer',
		// 				}}
		// 			>
		// 				{isActive ? 'Suspend' : 'Approve'}
		// 			</button>
		// 		);
		// 	},
		// },
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
		dispatch(getAdmins());
	}, []);

	useEffect(() => {
		setAdminsData(admins);
	}, [admins]);

	useEffect(() => {
		console.log(adminData);
	}, [admins]);

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	return (
		<div className={s.admins}>
			<h2 className={s.title}>Admins</h2>
			<ThemeProvider theme={darkTheme}>
				<DataGrid
					rows={adminData}
					columns={columns}
					getRowId={row => row._id}
					rowHeight={25}
					className={s.table}
				/>
			</ThemeProvider>
		</div>
	);
};

export default Admins;
