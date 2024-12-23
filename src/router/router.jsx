import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Login from '../pages/Login/Login.jsx';
import Dashboard from '../components/Dashboard/Dashboard.jsx';
import Users from '../components/Users/Users.jsx'
import Events from '../components/Events/Events.jsx'
import Clubs from '../components/Clubs/Clubs.jsx'
import Admins from '../components/Admins/Admins.jsx'
import Travels from '../components/Travels/Travels.jsx'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '',
				element: <Dashboard />,
			},
			{
				path: 'users',
				element: <Users />,
			},
			{
				path: 'events',
				element: <Events />,
			},
			{
				path: 'clubs',
				element: <Clubs />,
			},
			{
				path: 'travels',
				element: <Travels />,
			},
			{
				path: 'admins',
				element: <Admins />,
			},
		],
	},
	{
		path: 'login',
		element: <Login />,
	},
	// {
	// 	path: '/',
	// 	element: <App />
	// },
]);
