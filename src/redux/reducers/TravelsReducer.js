import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTravels = createAsyncThunk('travels', async () => {
	try {
		const res = await axios.get(
			'https://app-api.swinxter.com/api/search_travel'
		);

		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const getTravelById = createAsyncThunk('travelById', async data => {
	try {
		const res = await axios.get(
			`https://app-api.swinxter.com/api/travel/${data.id}`
		);

		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const getResorts = createAsyncThunk('get_resorts', async () => {
	try {
		const res = await axios.get(`https://app-api.swinxter.com/api/get_resorts`);

		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const getResortById = createAsyncThunk('resortById', async data => {
	try {
		const res = await axios.get(
			`https://app-api.swinxter.com/api/get_resort/${data.id}`
		);

		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const createResort = createAsyncThunk('create_resort', async data => {
	try {
		const res = await axios.post(
			`https://app-api.swinxter.com/api/create_resort`,
			{
				data: data,
			}
		);

		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const updateResort = createAsyncThunk('update_resort', async data => {
	try {
		const res = await axios.post(
			`https://app-api.swinxter.com/api/update_resort/${data.id}`,
			{
				...data.updatedData,
			}
		);

		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const deleteResort = createAsyncThunk('delete_resort', async data => {
	try {
		const res = await axios.delete(
			`https://app-api.swinxter.com/api/delete_resort/${data.id}`
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
				`https://app-api.swinxter.com/api/approve_travel/${data.id}`,
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
				`https://app-api.swinxter.com/api/delete_travel/${data.id}`
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
