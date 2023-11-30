import React, { useState } from "react";
import { useClock } from "@/hooks";
import { Button, Dialog } from "@/components";
import { BUTTON_SIZES } from "@/constants";
import { HiPlus } from "react-icons/hi";
import { Geoname } from "@/services/geonames";
import { useLocalStorage } from "usehooks-ts";
import { getTimeParts } from "./utils";
import CityDialog from "./CityDialog";

const FONT_SIZES = {
  PRIMARY: "text-8xl sm:text-9xl",
  SECONDARY: "text-3xl sm:text-4xl md:text-5xl",
};

const City = ({ city }: { city: Geoname }) => {
  const { time, ampm, offset } = getTimeParts(new Date(), city.timeZoneId);
  return (
    <div className="w-full flex justify-between items-center gap-4 p-4 bg-sky-900 rounded-lg">
      <div className="flex flex-col">
        <div className="text-xl">{city.name}</div>
        <div className="text-sm">{offset}</div>
      </div>
      <div className="flex items-baseline gap-1">
        <div className={FONT_SIZES.SECONDARY}>{time}</div>
        <div>{ampm}</div>
      </div>
    </div>
  );
};

export const Clock = () => {
  const { date: _date } = useClock();
  const { time, ampm, date } = getTimeParts(_date);

  const [selectedCities] = useLocalStorage<Geoname[]>(
    "selectedCities",
    []
  );

  const [isCityDialogOpen, setIsCityDialogOpen] = useState(false);

  return (
    <div className="flex flex-col flex-grow items-center justify-center gap-4 px-2">
      <div className={`flex items-baseline gap-2`}>
        <div className={FONT_SIZES.PRIMARY}>{time}</div>
        <div className={FONT_SIZES.SECONDARY}>{ampm}</div>
      </div>
      <div className={FONT_SIZES.SECONDARY}>{date}</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
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
      <Dialog
        isOpen={isCityDialogOpen}
        onClose={() => setIsCityDialogOpen(false)}
      >
        <CityDialog />
      </Dialog>
    </div>
  );
};
