import { useLocalStorage } from '@uidotdev/usehooks';

export interface Settings {
	view: 'year' | 'month' | 'week' | '4day' | 'day' | 'schedule';
	isShowWeekend: boolean;
}

const DEFAULTS: Settings = {
	view: 'month',
	isShowWeekend: true,
};

export const useSettings = () => {
	const [settings, setSettings] = useLocalStorage('ecal-settings', DEFAULTS);

	return {
		settings,
		setSettings,
		isShowWeekend: settings.isShowWeekend,
		setIsShowWeekend: (v: boolean) => setSettings({ ...settings, isShowWeekend: v }),
	};
};
