import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getClubs = createAsyncThunk('clubs', async () => {
	try {
		const res = await axios.get('https://app-api.swinxter.com/api/search_club');

		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const getClubById = createAsyncThunk('clubById', async data => {
	try {
		const res = await axios.get(
			`https://app-api.swinxter.com/api/getClub/${data.id}`
		);

		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const suspendOrApproveClub = createAsyncThunk(
	'suspend_or_approve_club',
	async (data, { rejectWithValue }) => {
		try {
			const res = await axios.put(
				`https://app-api.swinxter.com/api/approve_club/${data.id}`,
				{ suspend: data.suspend }
			);
			console.log(res.data);

			return res.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(
				error.request.status ? 'Club not found' : 'Something went wrong'
			);
		}
	}
);

export const deleteClub = createAsyncThunk(
	'delete_club',
	async (data, { rejectWithValue }) => {
		try {
			const res = await axios.delete(
				`https://app-api.swinxter.com/api/delete_club/${data.id}`
			);

			console.log(res.data);

			return res.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(
				error.request.status ? 'Club not found' : 'Something went wrong'
			);
		}
	}
);
