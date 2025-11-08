import React, { useMemo } from "react";
import dayjs from "dayjs";
import EventItem from "./EventItem";

const colorPalette = [
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-yellow-100 text-yellow-800",
  "bg-red-100 text-red-800",
  "bg-indigo-100 text-indigo-800"
];

function clampColor(id) {
  return colorPalette[id % colorPalette.length];
}

// naive overlap detection by same start time -> mark as conflict
function detectOverlaps(events) {
  // sort by start time
  const sorted = [...events].sort((a, b) => {
    if (a.time === b.time) return b.durationMinutes - a.durationMinutes;
    return a.time.localeCompare(b.time);
  });

  // annotate event.meta.overlapIndex (0..n-1)
  const groups = {};
  sorted.forEach((ev) => {
    const key = `${ev.time}`; // simple grouping by same start time
    if (!groups[key]) groups[key] = [];
    groups[key].push(ev);
  });

  const annotated = sorted.map((ev) => {
    const key = `${ev.time}`;
    const idx = groups[key].indexOf(ev);
    return { ...ev, meta: { overlapCount: groups[key].length, overlapIndex: idx } };
  });

  return annotated;
}

export default function DayColumn({ day, events }) {
  const today = dayjs();

  const annotatedEvents = useMemo(() => detectOverlaps(events), [events]);

  return (
    <div className="border rounded-xl p-3 min-h-[180px] flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className={`text-sm font-medium ${day.isSame(today, "day") ? "text-blue-600" : "text-gray-700"}`}>
            {day.format("ddd")}
          </div>
          <div className={`text-2xl font-bold ${day.isSame(today, "day") ? "text-blue-600" : "text-gray-900"}`}>
            {day.format("DD")}
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-hidden">
        {annotatedEvents.length === 0 && (
          <div className="text-xs text-gray-400">No events</div>
        )}

        {annotatedEvents.map((ev) => (
          <EventItem key={ev.id} event={ev} colorClass={clampColor(ev.id)} />
        ))}
      </div>
    </div>
  );
}
