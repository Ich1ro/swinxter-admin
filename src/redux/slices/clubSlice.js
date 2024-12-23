import { createSlice } from '@reduxjs/toolkit';
import { deleteClub, getClubs, suspendOrApproveClub } from '../reducers/ClubsReducer'

const initialState = {
	clubs: [],
	loading: false,
	error: null,
};

export const clubSlice = createSlice({
	name: 'club',
	initialState,
	reducers: {},
	extraReducers: builder => {
		//get clubs

		builder.addCase(getClubs.pending, state => {
			state.loading = true;
		});
		builder.addCase(getClubs.fulfilled, (state, action) => {
			state.loading = false;
			state.clubs = action.payload;
			state.error = false;
		});
		builder.addCase(getClubs.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});

		//approve or suspend club

		builder.addCase(suspendOrApproveClub.pending, state => {
			state.loading = true;
		});
		builder.addCase(suspendOrApproveClub.fulfilled, (state, action) => {
			state.loading = false;
			state.clubs = action.payload;
			state.error = false;
		});
		builder.addCase(suspendOrApproveClub.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});

		//delete club

		builder.addCase(deleteClub.pending, state => {
			state.loading = true;
		});
		builder.addCase(deleteClub.fulfilled, (state, action) => {
			state.loading = false;
			state.clubs = action.payload;
			state.error = false;
		});
		builder.addCase(deleteClub.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});
	},
});

export default clubSlice.reducer;
