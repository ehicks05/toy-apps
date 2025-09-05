import { useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import { useLocalStorage } from 'usehooks-ts';
import { Button, Dialog, PageContainer } from '@/jikan/components';
import { BUTTON_SIZES } from '@/jikan/constants';
import { useClock } from '@/jikan/hooks';
import type { Geoname } from '@/jikan/services/geonames';
import { City } from './City';
import CityDialog from './CityDialog';
import { FONT_SIZES } from './constants';
import { getTimeParts } from './utils';

export const Clock = () => {
	const { date: _date } = useClock();
	const { time, ampm, date } = getTimeParts(_date);

	const [selectedCities] = useLocalStorage<Geoname[]>('selectedCities', []);

	const [isCityDialogOpen, setIsCityDialogOpen] = useState(false);

	return (
		<PageContainer>
			<div className="flex flex-col flex-grow items-center justify-center gap-4">
				<div className="flex items-baseline gap-2">
					<div className={FONT_SIZES.PRIMARY}>{time}</div>
					<div className={FONT_SIZES.SECONDARY}>{ampm}</div>
				</div>
				<div className={FONT_SIZES.SECONDARY}>{date}</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 w-full">
					{selectedCities.map((city) => (
						<City key={city.geonameId} city={city} />
					))}
				</div>
				<Button
					className="flex items-center"
					onClick={() => setIsCityDialogOpen(true)}
				>
					<HiPlus className={BUTTON_SIZES.PRIMARY} />
				</Button>
				<Dialog isOpen={isCityDialogOpen} onClose={() => setIsCityDialogOpen(false)}>
					<CityDialog />
				</Dialog>
			</div>
		</PageContainer>
	);
};
