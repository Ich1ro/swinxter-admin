import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Login from '../pages/Login/Login.jsx';
import Dashboard from '../components/Dashboard/Dashboard.jsx';
import Users from '../components/Users/Users.jsx'
import Events from '../components/Events/Events.jsx'
import Clubs from '../components/Clubs/Clubs.jsx'
import Admins from '../components/Admins/Admins.jsx'
import Travels from '../components/Travels/Travels.jsx'
import Signup from '../pages/Signup/Signup.jsx'
import UserDetails from '../components/Users/id/UserDetails.jsx'
import EventDetails from '../components/Events/id/EventDetails.jsx'
import ClubDetails from '../components/Clubs/id/ClubDetails.jsx'
import TravelDetails from '../components/Travels/id/TravelDetails.jsx'
import Banners from '../components/Banners/Banners.jsx'
import Banner from '../components/Banners/id/Banner.jsx'

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
				children: [
					{
						path: ':id',
						element: <UserDetails />,
					}
				]
			},
			{
				path: 'user/:id',
				element: <UserDetails />,
			},
			{
				path: 'events',
				element: <Events />,
			},
			{
				path: 'event/:id',
				element: <EventDetails />,
			},
			{
				path: 'clubs',
				element: <Clubs />,
			},
			{
				path: 'club/:id',
				element: <ClubDetails />,
			},
			{
				path: 'travels',
				element: <Travels />,
			},
			{
				path: 'travel/:id',
				element: <TravelDetails />,
			},
			{
				path: 'admins',
				element: <Admins />,
			},
			{
				path: 'banners',
				element: <Banners />,
			},
			{
				path: 'banner/:id',
				element: <Banner />,
			},
		],
	},
	{
		path: 'login',
		element: <Login />,
	},
	{
		path: 'signup',
		element: <Signup />,
	},
	// {
	// 	path: '/',
	// 	element: <App />
	// },
]);
