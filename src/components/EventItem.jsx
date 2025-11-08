import React from "react";
import dayjs from "dayjs";

/**
 * event.meta.overlapCount / overlapIndex are optional (used to style overlapping)
 */

export default function EventItem({ event, colorClass = "bg-blue-100 text-blue-800" }) {
  const start = dayjs(`${event.date}T${event.time}`);
  const end = start.add(event.durationMinutes, "minute");
  const timeRange = `${start.format("h:mm A")} - ${end.format("h:mm A")}`;

  // If overlapCount > 1, slightly change style (border-left) to indicate conflict
  const conflict = event.meta && event.meta.overlapCount > 1;

  return (
    <div
      className={`p-2 rounded-lg text-sm font-medium shadow-sm clamp-2 ${colorClass} ${conflict ? "ring-1 ring-red-300" : ""}`}
      title={`${event.title} — ${timeRange}`}
    >
      <div className="flex items-center justify-between">
        <div className="truncate" style={{ maxWidth: "calc(100% - 56px)" }}>
          <div className="truncate">{event.title}</div>
          <div className="text-[11px] opacity-80">{timeRange}</div>
        </div>
        {conflict && <span className="text-xs ml-2 px-2 py-0.5 bg-red-50 text-red-700 rounded">Conflict</span>}
      </div>
    </div>
  );
}
