import React, { useState } from "react";
import { useClock } from "@/hooks";
import { Button, Dialog, PageContainer } from "@/components";
import { BUTTON_SIZES } from "@/constants";
import { HiPlus } from "react-icons/hi";
import { Geoname } from "@/services/geonames";
import { useLocalStorage } from "usehooks-ts";
import { getTimeParts } from "./utils";
import CityDialog from "./CityDialog";
import { formatInTimeZone, getTimezoneOffset } from "date-fns-tz";
import { format } from "date-fns";

const FONT_SIZES = {
  PRIMARY: "text-8xl sm:text-9xl",
  SECONDARY: "text-3xl sm:text-4xl md:text-5xl",
};

const getRelativeOffset = (timeZoneId: string) => {
  const offsetMillis =
    getTimezoneOffset(timeZoneId) -
    getTimezoneOffset(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const hour = offsetMillis / 1000 / 60 / 60;
  const minute = (offsetMillis / 1000 / 60) % 60;
  const offset = `${offsetMillis > 0 ? "+" : "-"}${hour + "h"}${
    minute ? ":" + minute : ""
  }`;

  const localDate = format(new Date(), "dd");
  const nonLocalDate = formatInTimeZone(new Date(), timeZoneId, "dd");

  const relativeDate =
    nonLocalDate > localDate
      ? " tomorrow"
      : nonLocalDate < localDate
        ? " yesterday"
        : "";

  return `${offset}${relativeDate}`;
};

const City = ({ city }: { city: Geoname }) => {
  const { time, ampm, offset } = getTimeParts(new Date(), city.timeZoneId);
  return (
    <div className="w-full flex justify-between items-center gap-4 p-4 bg-slate-900 rounded-lg">
      <div className="flex flex-col">
        <div className="text-xl">{city.name}</div>
        <div className="text-sm" title={`utc offset: ${offset}`}>
          {getRelativeOffset(city.timeZoneId)}</div>
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

  const [selectedCities] = useLocalStorage<Geoname[]>("selectedCities", []);

  const [isCityDialogOpen, setIsCityDialogOpen] = useState(false);

  return (
    <PageContainer>
      <div className="flex flex-col flex-grow items-center justify-center gap-4">
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
    </PageContainer>
  );
};
