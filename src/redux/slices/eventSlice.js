import { createSlice } from '@reduxjs/toolkit';
import { deleteEvent, getEvents, suspendOrApproveEvent } from '../reducers/EventsReducer'

const initialState = {
	events: [],
	loading: false,
	error: null,
};

export const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {},
	extraReducers: builder => {
		//get events

		builder.addCase(getEvents.pending, state => {
			state.loading = true;
		});
		builder.addCase(getEvents.fulfilled, (state, action) => {
			state.loading = false;
			state.events = action.payload;
			state.error = false;
		});
		builder.addCase(getEvents.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});

		//approve or suspend event

		builder.addCase(suspendOrApproveEvent.pending, state => {
			state.loading = true;
		});
		builder.addCase(suspendOrApproveEvent.fulfilled, (state, action) => {
			state.loading = false;
			state.events = action.payload;
			state.error = false;
		});
		builder.addCase(suspendOrApproveEvent.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});

		//delete event

		builder.addCase(deleteEvent.pending, state => {
			state.loading = true;
		});
		builder.addCase(deleteEvent.fulfilled, (state, action) => {
			state.loading = false;
			state.events = action.payload;
			state.error = false;
		});
		builder.addCase(deleteEvent.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});
	},
});

export default eventSlice.reducer;