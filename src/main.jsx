import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import './index.scss';
import { store } from './redux/store.js';
import { router } from './router/router.jsx';

// const router = createBrowserRouter([
// 	{
// 		path: '/',
// 		element: <App />

// 	},
// ]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Toaster
			position='top-right'
			toastOptions={{
				className: '',
				duration: 3000,
				style: {
					background: '#131313',
					color: 'white',
				},
			}}
		/>
		<Provider store={store}>
			<AuthProvider>
				<RouterProvider router={router}>
					<App />
				</RouterProvider>
			</AuthProvider>
		</Provider>
	</StrictMode>
);
