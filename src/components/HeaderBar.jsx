import React from "react";
import AddEventModal from "./AddEventModal";

export default function HeaderBar({
  currentMonth,
  handlePrev,
  handleNext,
  handleToday,
  onAddEvent,
}) {
  return (
    <div className="flex justify-between items-center mb-8 p-4 rounded-2xl shadow-md bg-gradient-to-r from-blue-50 via-white to-green-50 border border-gray-100">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">
          {currentMonth.format("MMMM YYYY")}
        </h1>
        <p className="text-gray-500 text-sm">Your monthly schedule overview</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
        >
          ←
        </button>
        <button
          onClick={handleToday}
          className="px-4 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Today
        </button>
        <button
          onClick={handleNext}
          className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
        >
          →
        </button>
        <AddEventModal onAddEvent={onAddEvent} />
      </div>
    </div>
  );
}
