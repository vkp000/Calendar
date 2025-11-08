import React from "react";
import dayjs from "dayjs";

export default function WeekHeader({ startOfWeek, onPrev, onNext, onToday }) {
  const endOfWeek = startOfWeek.add(6, "day");
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={onPrev}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          aria-label="Previous week"
        >
          ←
        </button>

        <button
          onClick={onToday}
          className="px-3 py-2 rounded-lg bg-gray-50 border text-sm hover:bg-gray-100"
        >
          Today
        </button>

        <button
          onClick={onNext}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          aria-label="Next week"
        >
          →
        </button>
      </div>

      <div className="text-center">
        <div className="text-sm text-gray-500">Week</div>
        <div className="text-lg font-semibold">
          {startOfWeek.format("MMM D")} – {endOfWeek.format("MMM D, YYYY")}
        </div>
      </div>

      <div className="text-sm text-gray-500">
        <span className="hidden md:inline">Events loaded from static JSON</span>
      </div>
    </div>
  );
}
