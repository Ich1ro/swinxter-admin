import { Outlet, useNavigate } from 'react-router';
import './App.scss';
import Sidebar from './components/Sidebar/Sidebar';
import { useAuth } from './hooks/AuthHook';
import { useEffect } from 'react';

function App() {
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser) {
			navigate('/login');
		}
	}, [currentUser]);

	if(!currentUser) {
		return null
	}

	return (
		<>
			<div className='main'>
				<div className='sidebar layout'>
					<Sidebar />
				</div>
				<div className='content layout'>
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default App;
