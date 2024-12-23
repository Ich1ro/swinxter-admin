import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk('users', async () => {
	try {
		const res = await axios.get('https://swinxter-back.onrender.com/api/users');

		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const suspendOrApproveUser = createAsyncThunk(
	'suspend_or_approve_user',
	async (data, { rejectWithValue }) => {
		try {
			const res = await axios.post(
				`https://swinxter-back.onrender.com/api/approve_user/${data.id}`,
				{suspend: data.suspend}
			);
			console.log(res.data);

			return res.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(
				error.request.status ? "User not found" : "Something went wrong"
			);
		}
	}
);

export const deleteUser = createAsyncThunk(
	'delete_user',
	async (data, { rejectWithValue }) => {
		try {
			const res = await axios.delete(
				`https://swinxter-back.onrender.com/api/delete_user/${data.id}`
			);

			console.log(res.data);

			return res.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(
				error.request.status ? "User not found" : "Something went wrong"
			);
		}
	}
);
