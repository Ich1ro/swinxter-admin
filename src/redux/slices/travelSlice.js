import { createSlice } from '@reduxjs/toolkit';
import { deleteTravel, getTravelById, getTravels, suspendOrApproveTravel } from '../reducers/TravelsReducer'

const initialState = {
	travels: [],
	travel: null,
	loading: false,
	error: null,
};

export const travelSlice = createSlice({
	name: 'travel',
	initialState,
	reducers: {},
	extraReducers: builder => {
		//get travels

		builder.addCase(getTravels.pending, state => {
			state.loading = true;
		});
		builder.addCase(getTravels.fulfilled, (state, action) => {
			state.loading = false;
			state.travels = action.payload;
			state.error = false;
		});
		builder.addCase(getTravels.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});

		//get travel by id

		builder.addCase(getTravelById.pending, state => {
			state.loading = true;
		});
		builder.addCase(getTravelById.fulfilled, (state, action) => {
			state.loading = false;
			state.travel = action.payload;
			state.error = false;
		});
		builder.addCase(getTravelById.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});

		//approve or suspend travel

		builder.addCase(suspendOrApproveTravel.pending, state => {
			state.loading = true;
		});
		builder.addCase(suspendOrApproveTravel.fulfilled, (state, action) => {
			state.loading = false;
			state.travels = action.payload;
			state.error = false;
		});
		builder.addCase(suspendOrApproveTravel.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});

		//delete travel

		builder.addCase(deleteTravel.pending, state => {
			state.loading = true;
		});
		builder.addCase(deleteTravel.fulfilled, (state, action) => {
			state.loading = false;
			state.travels = action.payload;
			state.error = false;
		});
		builder.addCase(deleteTravel.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});
	},
});

export default travelSlice.reducer;
