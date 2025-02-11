import { createSlice } from '@reduxjs/toolkit';
import { createBanner, deleteBanner, editBanner, getBannerById, getBanners } from '../reducers/bannerReducer'

const initialState = {
	banners: [],
	banner: null,
	loading: false,
	error: null,
};

export const bannerSlice = createSlice({
	name: 'banner',
	initialState,
	reducers: {},
	extraReducers: builder => {
		//get banners

		builder.addCase(getBanners.pending, state => {
			state.loading = true;
		});
		builder.addCase(getBanners.fulfilled, (state, action) => {
			state.loading = false;
			state.banners = action.payload;
			state.error = false;
		});
		builder.addCase(getBanners.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});

		//get banner by id

		builder.addCase(getBannerById.pending, state => {
			state.loading = true;
		});
		builder.addCase(getBannerById.fulfilled, (state, action) => {
			state.loading = false;
			state.banner = action.payload;
			state.error = false;
		});
		builder.addCase(getBannerById.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});

		//get banner by id

		builder.addCase(createBanner.pending, state => {
			state.loading = true;
		});
		builder.addCase(createBanner.fulfilled, (state, action) => {
			state.loading = false;
			state.banner = action.payload;
			state.error = false;
		});
		builder.addCase(createBanner.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});

		//edit banner

		builder.addCase(editBanner.pending, state => {
			state.loading = true;
		});
		builder.addCase(editBanner.fulfilled, (state, action) => {
			state.loading = false;
			state.banners = action.payload;
			state.error = false;
		});
		builder.addCase(editBanner.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});

		//delete club

		builder.addCase(deleteBanner.pending, state => {
			state.loading = true;
		});
		builder.addCase(deleteBanner.fulfilled, (state, action) => {
			state.loading = false;
			state.banners = action.payload;
			state.error = false;
		});
		builder.addCase(deleteBanner.rejected, (state, error) => {
			state.loading = false;
			state.error = error.error.message;
		});
	},
});

export default bannerSlice.reducer;
