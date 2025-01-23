import { createSlice } from '@reduxjs/toolkit';
import { createResort, deleteResort, deleteTravel, getResortById, getResorts, getTravelById, getTravels, suspendOrApproveTravel, updateResort } from '../reducers/TravelsReducer'

const initialState = {
	travels: [],
	resorts: [],
	resort: null,
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

		//get resorts

		builder.addCase(getResorts.pending, state => {
			state.loading = true;
		});
		builder.addCase(getResorts.fulfilled, (state, action) => {
			state.loading = false;
			state.resorts = action.payload;
			state.error = false;
		});
		builder.addCase(getResorts.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});

		//get resort by id

		builder.addCase(getResortById.pending, state => {
			state.loading = true;
		});
		builder.addCase(getResortById.fulfilled, (state, action) => {
			state.loading = false;
			state.resort = action.payload;
			state.error = false;
		});
		builder.addCase(getResortById.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});

		//create resort

		builder.addCase(createResort.pending, state => {
			state.loading = true;
		});
		builder.addCase(createResort.fulfilled, (state, action) => {
			state.loading = false;
			state.resorts = action.payload;
			state.error = false;
		});
		builder.addCase(createResort.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});

		//update resort

		builder.addCase(updateResort.pending, state => {
			state.loading = true;
		});
		builder.addCase(updateResort.fulfilled, (state, action) => {
			state.loading = false;
			state.resort = action.payload;
			state.error = false;
		});
		builder.addCase(updateResort.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});

		//delete resort

		builder.addCase(deleteResort.pending, state => {
			state.loading = true;
		});
		builder.addCase(deleteResort.fulfilled, (state, action) => {
			state.loading = false;
			state.resorts = action.payload;
			state.error = false;
		});
		builder.addCase(deleteResort.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});
	},
});

export default travelSlice.reducer;
