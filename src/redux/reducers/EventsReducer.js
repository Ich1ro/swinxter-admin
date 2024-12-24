import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getEvents = createAsyncThunk('events', async () => {
	try {
		const res = await axios.get('https://swinxter-back.onrender.com/api/allevents');

		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const getEventById = createAsyncThunk('eventById', async (data) => {
	try {
		const res = await axios.get(`https://swinxter-back.onrender.com/api/get_event/${data.id}`);

		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const suspendOrApproveEvent = createAsyncThunk(
	'suspend_or_approve_event',
	async (data, { rejectWithValue }) => {
		try {
			const res = await axios.post(
				`https://swinxter-back.onrender.com/api/approve_event/${data.id}`,
				{suspend: data.suspend}
			);
			console.log(res.data);

			return res.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(
				error.request.status ? "Event not found" : "Something went wrong"
			);
		}
	}
);

export const deleteEvent = createAsyncThunk(
	'delete_event',
	async (data, { rejectWithValue }) => {
		try {
			const res = await axios.delete(
				`https://swinxter-back.onrender.com/api/delete_event/${data.id}`
			);

			console.log(res.data);

			return res.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(
				error.request.status ? "Event not found" : "Something went wrong"
			);
		}
	}
);
