// import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import s from './styles.module.scss';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
	deleteUser,
	getUsers,
	suspendOrApproveUser,
} from '../../redux/reducers/UsersReducer';
import toast from 'react-hot-toast';

const Users = () => {
	const [usersData, setUsersData] = useState([]);
	const { users } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const handleSuspendApprove = async (id, isActive) => {
		await toast.promise(
			dispatch(suspendOrApproveUser({ id, suspend: isActive })).unwrap(),
			{
				loading: isActive ? 'Suspending user...' : 'Approving user...',
				success: () =>
					`User ${isActive ? 'suspended' : 'approved'} successfully!`,
				error: err => `${err}`,
			}
		);
		console.log(`User with ID ${id} suspended.`);
	};

	const handleDelete = async id => {
		await toast.promise(dispatch(deleteUser({ id: id })).unwrap(), {
			loading: 'User deletion...',
			success: () =>
				`User successfully deleted!`,
			error: err => `${err}`,
		});
		console.log(`User with ID ${id} deleted.`);
	};

	const columns = [
		{ field: 'username', headerName: 'username', width: 150 },
		{ field: 'profile_type', headerName: 'Type', width: 100 },
		{
			field: 'payment',
			headerName: 'Subscription',
			width: 150,
			renderCell: params => {
				return params.row.payment?.membership_plan
					? params.row.payment.membership_plan
					: 'Free Plan';
			},
		},
		{
			field: 'gender',
			headerName: 'Gender',
			width: 150,
			renderCell: params => {
				if (params.row.profile_type === 'single' && params.row.gender) {
					return params.row.gender;
				} else if (
					params.row.profile_type === 'couple' &&
					params.row.couple.person1.gender &&
					params.row.couple.person2.gender
				) {
					return `${params.row.couple.person1.gender && 'Not specified'} | ${
						params.row.couple.person2.gender && 'Not specified'
					}`;
				} else {
					return 'Not specified';
				}
			},
		},
		{
			field: 'age',
			headerName: 'Age',
			width: 150,
			renderCell: params => {
				const calculateAge = dob => {
					if (!dob) return 'Not specified';
					const birthDate = new Date(dob);
					const today = new Date();
					let age = today.getFullYear() - birthDate.getFullYear();
					const monthDiff = today.getMonth() - birthDate.getMonth();
					if (
						monthDiff < 0 ||
						(monthDiff === 0 && today.getDate() < birthDate.getDate())
					) {
						age--;
					}
					if (age) {
						return age;
					} else {
						return 0;
					}
				};

				if (params.row.profile_type === 'single' && params.row.DOB) {
					return calculateAge(params.row.DOB);
				} else if (
					params.row.profile_type === 'couple' &&
					params.row.couple.person1.DOB &&
					params.row.couple.person2.DOB
				) {
					return `${calculateAge(
						params.row.couple.person1.DOB
					)} | ${calculateAge(params.row.couple.person2.DOB)}`;
				} else {
					return 0;
				}
			},
		},
		{
			field: 'status',
			headerName: 'Status',
			width: 150,
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
		dispatch(getUsers());
	}, []);

	useEffect(() => {
		setUsersData(users);
	}, [users]);

	useEffect(() => {
		console.log(usersData);
	}, [usersData]);

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	return (
		<div className={s.users}>
			<h2 className={s.title}>Users</h2>
			<ThemeProvider theme={darkTheme}>
				<DataGrid
					rows={usersData}
					columns={columns}
					getRowId={row => row._id}
					rowHeight={25}
					className={s.table}
				/>
			</ThemeProvider>
		</div>
	);
};

export default Users;
