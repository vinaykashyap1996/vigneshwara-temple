"use client";

import { useRouter } from "next/navigation";

interface MonthNavigatorProps {
  currentYear: number;
  currentMonth: number;
}

export default function MonthNavigator({
  currentYear,
  currentMonth,
}: MonthNavigatorProps) {
  const router = useRouter();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrevMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;

    if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }

    router.push(`/events?year=${newYear}&month=${newMonth}`);
  };

  const handleNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;

    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    }

    router.push(`/events?year=${newYear}&month=${newMonth}`);
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handlePrevMonth}
        className="rounded-full p-1.5 text-fg hover:bg-orange-50 transition-colors"
        aria-label="Previous month"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <h3 className="text-xl font-bold text-fg min-w-[200px] text-center">
        {monthNames[currentMonth - 1]} {currentYear}
      </h3>
      <button
        onClick={handleNextMonth}
        className="rounded-full p-1.5 text-fg hover:bg-orange-50 transition-colors"
        aria-label="Next month"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
}
