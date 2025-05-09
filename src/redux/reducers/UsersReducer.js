import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk('users', async () => {
	try {
		const res = await axios.get('https://app-api.swinxter.com/api/users');

		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const getUserById = createAsyncThunk('user', async data => {
	try {
		const res = await axios.get(
			`https://app-api.swinxter.com/api/findOne/${data.id}`
		);

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
				`https://app-api.swinxter.com/api/approve_user/${data.id}`,
				{ suspend: data.suspend }
			);
			console.log(res.data);

			return res.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(
				error.request.status ? 'User not found' : 'Something went wrong'
			);
		}
	}
);

export const updateUserMembership = createAsyncThunk(
	'update-user-membership',
	async (data, { rejectWithValue }) => {
		try {
			const res = await axios.post(
				`https://app-api.swinxter.com/api/update-user-membership/${data.id}`,
				{ data: data.updatedData }
			);
			console.log(res.data);

			return res.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(
				error.request.status ? 'User not found' : 'Something went wrong'
			);
		}
	}
);

export const deleteUser = createAsyncThunk(
	'delete_user',
	async (data, { rejectWithValue }) => {
		try {
			const res = await axios.delete(
				`https://app-api.swinxter.com/api/delete_user/${data.id}`
			);

			console.log(res.data);

			return res.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(
				error.request.status ? 'User not found' : 'Something went wrong'
			);
		}
	}
);
