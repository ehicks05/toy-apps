import { useLocalStorage } from 'usehooks-ts';
import { APP_NAME } from '../constants/app';

export const VIEWS = ['year', 'month', 'week', '4day', 'day', 'schedule'] as const;

export type View = (typeof VIEWS)[number];

export interface Settings {
	view: View;
	isShowWeekend: boolean;
}

const DEFAULTS: Settings = {
	view: 'month',
	isShowWeekend: true,
};

export const useSettings = () => {
	const [settings, setSettings] = useLocalStorage(`${APP_NAME}-settings`, DEFAULTS);

	return {
		settings,
		setSettings,
		isShowWeekend: settings.isShowWeekend,
		setIsShowWeekend: (v: boolean) => setSettings({ ...settings, isShowWeekend: v }),
		view: settings.view,
		setView: (v: View) => setSettings({ ...settings, view: v }),
	};
};
