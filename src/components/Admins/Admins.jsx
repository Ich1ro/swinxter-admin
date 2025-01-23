// import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import s from './styles.module.scss';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import {
	deleteAdmin,
	getAdmins,
	updateAdmin,
} from '../../redux/reducers/AdminsReducer';
import { useAuth } from '../../hooks/AuthHook';
// import { register } from '../../../../../front/src/redux/actions/auth';

const Admins = () => {
	const [adminData, setAdminsData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { register, currentUser } = useAuth();
	const [currentAdmin, setCurrentAdmin] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [newAdmin, setNewAdmin] = useState({
		name: '',
		username: '',
		password: '',
		events: false,
		businesses: false,
		situationships: false,
		users: false,
		admins: false,
	});
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
			t => (
				<div>
					<p style={{ marginBottom: '10px' }}>
						Are you sure you want to delete this admin user?
					</p>
					<div
						style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}
					>
						<button
							onClick={async () => {
								await toast.promise(
									dispatch(deleteAdmin({ id: id })).unwrap().then(() => dispatch(getAdmins())),
									{
										loading: 'User deletion...',
										success: 'User successfully deleted!',
										error: err => `${err}`,
									}
								);
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

	const handleAddNew = () => {
		setIsModalOpen(true);
	};

	const handleSaveNewAdmin = async () => {
		if (editMode) {
			await toast.promise(
				dispatch(
					updateAdmin({
						id: currentAdmin._id,
						updatedData: {
							name: newAdmin.name,
							username: newAdmin.username,
							events: newAdmin.events,
							businesses: newAdmin.businesses,
							situationships: newAdmin.situationships,
							users: newAdmin.users,
							admins: newAdmin.admins,
						},
					})
				)
					.unwrap()
					.then(() => dispatch(getAdmins())),
				{
					loading: 'Updating admin...',
					success: 'Admin updated successfully!',
					error: err => `${err}`,
				}
			);
		} else {
			await register(newAdmin).then(() => dispatch(getAdmins()));
		}

		setIsModalOpen(false);
		setNewAdmin({
			name: '',
			username: '',
			password: '',
			events: false,
			businesses: false,
			situationships: false,
			users: false,
			admins: false,
		});
		setEditMode(false);
	};

	const handleEdit = admin => {
		setNewAdmin(admin);
		setCurrentAdmin(admin);
		setEditMode(true);
		setIsModalOpen(true);
	};

	const columns = [
		{ field: 'name', headerName: 'Name', width: 150 },
		{ field: 'username', headerName: 'Username', width: 150 },
		{ field: 'events', headerName: 'Events', width: 100 },
		{ field: 'clubs', headerName: 'Businesses', width: 100 },
		{ field: 'situationships', headerName: 'Situationships', width: 100 },
		{ field: 'users', headerName: 'Users', width: 100 },
		{ field: 'admins', headerName: 'Admins', width: 100 },
		{
			field: 'edit',
			headerName: 'Edit',
			width: 100,
			renderCell: params => {
				console.log(currentUser);
				if (
					currentUser._id !== params.row._id &&
					params.row._id !== '65ff1187509c08b450b65707'
				) {
					return (
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
					);
				}
			},
		},
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
			<div className={s.title}>
				<div className={s.empty}></div>
				<h2 className={s.title_item}>Admins</h2>
				<button onClick={handleAddNew}>Add New</button>
			</div>
			<ThemeProvider theme={darkTheme}>
				<DataGrid
					rows={adminData}
					columns={columns}
					getRowId={row => row._id}
					rowHeight={25}
					className={s.table}
				/>
			</ThemeProvider>
			{isModalOpen && (
				<div className={s.modal}>
					<div className={s.modalContent}>
						<h3>{editMode ? 'Edit Admin' : 'Add New Admin'}</h3>
						<label>
							Name:
							<input
								type='text'
								value={newAdmin.name}
								onChange={e =>
									setNewAdmin({ ...newAdmin, name: e.target.value })
								}
							/>
						</label>
						<label>
							Username:
							<input
								type='text'
								value={newAdmin.username}
								onChange={e =>
									setNewAdmin({ ...newAdmin, username: e.target.value })
								}
							/>
						</label>
						{!editMode && (
							<label>
								Password:
								<input
									type='password'
									value={newAdmin.password}
									onChange={e =>
										setNewAdmin({ ...newAdmin, password: e.target.value })
									}
								/>
							</label>
						)}
						<div className={s.access}>
							Access:
							<div className={s.modalAccess}>
								<label>
									<input
										type='checkbox'
										checked={newAdmin.events}
										onChange={e => {
											const updatedAccess = e.target.checked;

											setNewAdmin({ ...newAdmin, events: updatedAccess });
										}}
									/>
									Events
								</label>
								<label>
									<input
										type='checkbox'
										checked={newAdmin.clubs}
										onChange={e => {
											const updatedAccess = e.target.checked;

											setNewAdmin({ ...newAdmin, clubs: updatedAccess });
										}}
									/>
									Businesses
								</label>
								<label>
									<input
										type='checkbox'
										checked={newAdmin.situationships}
										onChange={e => {
											const updatedAccess = e.target.checked;

											setNewAdmin({
												...newAdmin,
												situationships: updatedAccess,
											});
										}}
									/>
									Situationships
								</label>
								<label>
									<input
										type='checkbox'
										checked={newAdmin.users}
										onChange={e => {
											const updatedAccess = e.target.checked;

											setNewAdmin({ ...newAdmin, users: updatedAccess });
										}}
									/>
									Users
								</label>
							</div>
						</div>
						<div className={s.modalActions}>
							<button onClick={handleSaveNewAdmin}>Save</button>
							<button
								onClick={() => {
									setNewAdmin({
										name: '',
										username: '',
										password: '',
										events: false,
										businesses: false,
										situationships: false,
										users: false,
										admins: false,
									});
									setIsModalOpen(false);
									setEditMode(false);
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

export default Admins;
