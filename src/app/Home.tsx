import { CalendarDemo } from "@/components/Calendar/Calendar";


export const Home = () => {
	return (
  <div className="max-w-screen-2xl mx-auto">
    <div className="flex flex-col gap-4 p-2 md:p-4 mt-7">
      <CalendarDemo />
    </div>
  </div>
	);
};
