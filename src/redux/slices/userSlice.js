import { createSlice } from '@reduxjs/toolkit';
import { deleteUser, getUsers, suspendOrApproveUser } from '../reducers/UsersReducer';

const initialState = {
	users: [],
	loading: false,
	error: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		//get users

		builder.addCase(getUsers.pending, state => {
			state.loading = true;
		});
		builder.addCase(getUsers.fulfilled, (state, action) => {
			state.loading = false;
			state.users = action.payload;
			state.error = false;
		});
		builder.addCase(getUsers.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});

		//approve or suspend user

		builder.addCase(suspendOrApproveUser.pending, state => {
			state.loading = true;
		});
		builder.addCase(suspendOrApproveUser.fulfilled, (state, action) => {
			state.loading = false;
			state.users = action.payload;
			state.error = false;
		});
		builder.addCase(suspendOrApproveUser.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});

		//delete user

		builder.addCase(deleteUser.pending, state => {
			state.loading = true;
		});
		builder.addCase(deleteUser.fulfilled, (state, action) => {
			state.loading = false;
			state.users = action.payload;
			state.error = false;
		});
		builder.addCase(deleteUser.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});
	},
});

export default userSlice.reducer;
