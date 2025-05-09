import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAdmins = createAsyncThunk('admins', async () => {
	try {
		const res = await axios.get(
			'https://app-api.swinxter.com/admin/adminUsers'
		);

		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(error);
	}
});

// export const suspendOrApproveUser = createAsyncThunk(
// 	'suspend_or_approve_admins',
// 	async (data, { rejectWithValue }) => {
// 		try {
// 			const res = await axios.post(
// 				`https://app-api.swinxter.com/api/approve_user/${data.id}`,
// 				{ suspend: data.suspend }
// 			);
// 			console.log(res.data);

// 			return res.data;
// 		} catch (error) {
// 			console.log(error);
// 			return rejectWithValue(
// 				error.request.status ? 'User not found' : 'Something went wrong'
// 			);
// 		}
// 	}
// );

export const updateAdmin = createAsyncThunk(
	'update_user',
	async (data, { rejectWithValue }) => {
		try {
			const res = await axios.post(
				`https://app-api.swinxter.com/admin/update_user/${data.id}`,
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

export const deleteAdmin = createAsyncThunk(
	'delete_user',
	async (data, { rejectWithValue }) => {
		try {
			const res = await axios.delete(
				`https://app-api.swinxter.com/admin/delete_user/${data.id}`
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
