import { useEffect, useState } from 'react';
import { type Benchmark, DEFAULT_USER } from './data';

const KEY = 'user';

const loadUser = () => {
	const user = localStorage.getItem(KEY);
	return user ? JSON.parse(user) : DEFAULT_USER;
};

export const useUser = () => {
	const userStateHook = useState<Benchmark>(loadUser());
	const [user] = userStateHook;

	useEffect(() => {
		localStorage.setItem(KEY, JSON.stringify(user));
	}, [user]);

	return userStateHook;
};
