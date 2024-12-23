import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTravels = createAsyncThunk('travels', async () => {
	try {
		const res = await axios.get(
			'https://swinxter-back.onrender.com/api/search_travel'
		);

		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const suspendOrApproveTravel = createAsyncThunk(
	'suspend_or_approve_travel',
	async (data, { rejectWithValue }) => {
		try {
			const res = await axios.put(
				`https://swinxter-back.onrender.com/api/approve_travel/${data.id}`,
				{ suspend: data.suspend }
			);
			console.log(res.data);

			return res.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(
				error.request.status ? 'Travel not found' : 'Something went wrong'
			);
		}
	}
);

export const deleteTravel = createAsyncThunk(
	'delete_travel',
	async (data, { rejectWithValue }) => {
		try {
			const res = await axios.delete(
				`https://swinxter-back.onrender.com/api/delete_travel/${data.id}`
			);

			console.log(res.data);

			return res.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(
				error.request.status ? 'Travel not found' : 'Something went wrong'
			);
		}
	}
);
