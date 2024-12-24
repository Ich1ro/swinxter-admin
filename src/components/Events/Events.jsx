// import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import s from './styles.module.scss';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import {
	deleteEvent,
	getEvents,
	suspendOrApproveEvent,
} from '../../redux/reducers/EventsReducer';
import { useNavigate } from 'react-router-dom'

const Events = () => {
	const [eventData, setEventsData] = useState([]);
	const { events } = useSelector(state => state.event);
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const handleSuspendApprove = async (id, isActive) => {
		await toast.promise(
			dispatch(suspendOrApproveEvent({ id, suspend: isActive })).unwrap(),
			{
				loading: isActive ? 'Suspending event...' : 'Approving event...',
				success: () =>
					`Event ${isActive ? 'suspended' : 'approved'} successfully!`,
				error: err => `${err}`,
			}
		);
		console.log(`Event with ID ${id} suspended.`);
	};

	const handleDelete = async id => {
		// await toast.promise(dispatch(deleteEvent({ id: id })).unwrap(), {
		// 	loading: 'Event deletion...',
		// 	success: () => `Event successfully deleted!`,
		// 	error: err => `${err}`,
		// });
		console.log(`Event with ID ${id} deleted.`);
		toast(
			(t) => (
				<div>
					<p style={{ marginBottom: '10px' }}>Are you sure you want to delete this event?</p>
					<div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
						<button
							onClick={async () => {
								await toast.promise(dispatch(deleteEvent({ id: id })).unwrap(), {
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
		{ field: 'eventName', headerName: 'Name', width: 150 },
		{ field: 'type', headerName: 'Type', width: 200 },
		{
			field: 'eventDuration',
			headerName: 'Event Duration',
			width: 300,
			renderCell: params => {
				const { Startdate, EndDate } = params.row;

				if (!Startdate || !EndDate) {
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

				const formattedStart = formatDate(Startdate);
				const formattedEnd = formatDate(EndDate);

				return `${formattedStart} - ${formattedEnd}`;
			},
		},
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
			field: 'details',
			headerName: 'Details',
			width: 100,
			renderCell: params => (
				<button
					onClick={() => navigate(`../event/${params.row._id}`)}
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
		dispatch(getEvents());
	}, []);

	useEffect(() => {
		setEventsData(events);
	}, [events]);

	useEffect(() => {
		console.log(eventData);
	}, [events]);

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	return (
		<div className={s.events}>
			<h2 className={s.title}>Events</h2>
			<ThemeProvider theme={darkTheme}>
				<DataGrid
					rows={eventData}
					columns={columns}
					getRowId={row => row._id}
					rowHeight={25}
					className={s.table}
				/>
			</ThemeProvider>
		</div>
	);
};

export default Events;
