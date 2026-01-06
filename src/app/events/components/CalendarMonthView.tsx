import { DayPanchang } from "@/lib/panchang/types";
import CalendarDayCell from "./CalendarDayCell";

interface CalendarMonthViewProps {
  days: DayPanchang[];
}

export default function CalendarMonthView({ days }: CalendarMonthViewProps) {
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 grid grid-cols-7 text-center">
        {weekDays.map((day) => (
          <div key={day} className="text-sm font-semibold text-muted">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {days.map((dayData, index) => (
          <CalendarDayCell key={index} dayData={dayData} />
        ))}
      </div>
    </div>
  );
}
