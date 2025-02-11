import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBanners = createAsyncThunk('banners', async () => {
	try {
		const res = await axios.get(
			'https://swinxter-back.onrender.com/admin/get_banners'
		);

		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const getBannerById = createAsyncThunk('bannerById', async data => {
	try {
		const res = await axios.get(
			`https://swinxter-back.onrender.com/admin/get_banner_by_id/${data.id}`
		);

		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const createBanner = createAsyncThunk(
	'create_banner',
	async (data, { rejectWithValue }) => {
		try {
			const formData = new FormData();
			formData.append('image', data.image);
			formData.append('title', data.title);
			formData.append('page', data.page);
			formData.append('active', data.active);
			console.log(data);
			

			const res = await axios.post(
				`https://swinxter-back.onrender.com/admin/create_banner`,
				formData
			);
			console.log(res.data);

			return res.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(
				error.request.status ? 'Club not found' : 'Something went wrong'
			);
		}
	}
);

export const editBanner = createAsyncThunk(
	'edit_banner',
	async (data, { rejectWithValue }) => {
		try {
			const res = await axios.post(
				`https://swinxter-back.onrender.com/admin/update_banner/${data.id}`,
				{ ...data.updatedData }
			);
			console.log(res.data);

			return res.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(
				error.request.status ? 'Club not found' : 'Something went wrong'
			);
		}
	}
);

export const deleteBanner = createAsyncThunk(
	'delete_banner',
	async (data, { rejectWithValue }) => {
		try {
			const res = await axios.delete(
				`https://swinxter-back.onrender.com/admin/delete_banner/${data.id}`
			);

			console.log(res.data);

			return res.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(
				error.request.status ? 'Club not found' : 'Something went wrong'
			);
		}
	}
);
