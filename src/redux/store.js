import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice'
import { eventSlice } from './slices/eventSlice'
import { clubSlice } from './slices/clubSlice'
import { travelSlice } from './slices/travelSlice'
import { adminSlice } from './slices/adminSlice'
import { bannerSlice } from './slices/bannerSlice'

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		event: eventSlice.reducer,
		club: clubSlice.reducer,
		travel: travelSlice.reducer,
		admin: adminSlice.reducer,
		banner: bannerSlice.reducer
	},
});

// setupListeners(store.dispatch);

export default store;