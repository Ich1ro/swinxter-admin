import { createSlice } from '@reduxjs/toolkit';
import { deleteAdmin, getAdmins } from '../reducers/AdminsReducer'

const initialState = {
	admins: [],
	loading: false,
	error: null,
};

export const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {},
	extraReducers: builder => {
		//get admins

		builder.addCase(getAdmins.pending, state => {
			state.loading = true;
		});
		builder.addCase(getAdmins.fulfilled, (state, action) => {
			state.loading = false;
			state.admins = action.payload;
			state.error = false;
		});
		builder.addCase(getAdmins.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});

		//delete admin

		builder.addCase(deleteAdmin.pending, state => {
			state.loading = true;
		});
		builder.addCase(deleteAdmin.fulfilled, (state, action) => {
			state.loading = false;
			state.admins = action.payload;
			state.error = false;
		});
		builder.addCase(deleteAdmin.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});
	},
});

export default adminSlice.reducer;
