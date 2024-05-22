import { useEffect, useState } from 'react';
import { DEFAULT_USER } from './data';

const loadUser = () => {
	const storedUser = localStorage.getItem('user');
	return storedUser ? JSON.parse(storedUser) : DEFAULT_USER;
};

export const useUser = () => {
	const [user, setUser] = useState(loadUser());

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(user));
	}, [user]);

	return [user, setUser];
};
