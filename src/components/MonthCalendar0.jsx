import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import eventsData from "../data/events.json";
import HeaderBar from "./HeaderBar";

export default function MonthCalendar0() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    durationMinutes: "",
  });

  useEffect(() => {
    setEvents(
      eventsData.map((e) => ({
        ...e,
        colorIndex: Math.floor(Math.random() * 6),
      }))
    );
  }, []);

  const handlePrev = () => setCurrentMonth((m) => m.subtract(1, "month"));
  const handleNext = () => setCurrentMonth((m) => m.add(1, "month"));
  const handleToday = () => setCurrentMonth(dayjs());
  const today = dayjs();

  const parseTimeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(":").map((p) => parseInt(p, 10) || 0);
    return h * 60 + m;
  };

  const findConflicts = (eventList) => {
    const cloned = eventList.map((e) => ({ ...e, conflict: false }));
    for (let i = 0; i < cloned.length; i++) {
      for (let j = i + 1; j < cloned.length; j++) {
        const a = cloned[i];
        const b = cloned[j];
        if (a.date === b.date) {
          const startA = parseTimeToMinutes(a.time);
          const endA = startA + (parseInt(a.durationMinutes, 10) || 60);
          const startB = parseTimeToMinutes(b.time);
          const endB = startB + (parseInt(b.durationMinutes, 10) || 60);
          if (startA < endB && endA > startB) {
            cloned[i].conflict = true;
            cloned[j].conflict = true;
          }
        }
      }
    }
    return cloned;
  };

  const conflictedEvents = useMemo(() => findConflicts(events), [events]);

  const eventsThisMonth = useMemo(() => {
    return conflictedEvents.filter((e) => {
      const eventDate = dayjs(e.date);
      return (
        eventDate.month() === currentMonth.month() &&
        eventDate.year() === currentMonth.year()
      );
    });
  }, [conflictedEvents, currentMonth]);

  const conflictList = useMemo(
    () => eventsThisMonth.filter((e) => e.conflict),
    [eventsThisMonth]
  );

  const getEventsForDay = (date) =>
    eventsThisMonth.filter((e) => e.date === date.format("YYYY-MM-DD"));

  const handleDateClick = (date) => {
    const dayEvents = getEventsForDay(date);
    if (dayEvents.length > 0) setSelectedDate(date);
  };
  const closeModal = () => setSelectedDate(null);

  const handleAddEventClick = () => setShowAddEvent(true);
  const closeAddEvent = () => setShowAddEvent(false);

  const handleAddEventSubmit = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;
    setEvents((prev) => [...prev, { ...newEvent, id: Date.now() }]);
    setShowAddEvent(false);
    setNewEvent({ title: "", date: "", time: "", durationMinutes: "" });
  };

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const days = [];
  let iter = startDate.clone();
  while (iter.isBefore(endDate, "day") || iter.isSame(endDate, "day")) {
    days.push(iter);
    iter = iter.add(1, "day");
  }

  const colorPalette = [
    "bg-gradient-to-r from-sky-100 to-blue-100 text-blue-800 border-sky-200",
    "bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border-indigo-200",
    "bg-gradient-to-r from-fuchsia-100 to-pink-100 text-fuchsia-800 border-fuchsia-200",
    "bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 border-teal-200",
    "bg-gradient-to-r from-cyan-100 to-sky-100 text-cyan-800 border-cyan-200",
    "bg-gradient-to-r from-green-100 to-lime-100 text-green-800 border-green-200",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      {/* 📅 Main Calendar Layout */}
      <div className="flex justify-center items-start mt-0">
        <div
          className="origin-top scale-[0.9] transform transition-all duration-300"
          style={{ transformOrigin: "top center" }}
        >
          <div className="max-w-[1400px] mx-auto px-6 pb-6 flex gap-6">
            {/* ⚠️ LEFT SIDE CONFLICT PANEL */}
            <div className="w-[320px] bg-gradient-to-b from-rose-50 to-red-50 border border-red-200 rounded-2xl shadow-md p-4 flex flex-col">
              <h2 className="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2">
                ⚠ Conflicts ({conflictList.length})
              </h2>

              {conflictList.length > 0 ? (
                <div className="space-y-2 overflow-y-auto flex-1 pr-1">
                  {conflictList.map((e) => (
                    <div
                      key={e.id}
                      className="bg-white border border-red-200 rounded-lg p-3 shadow-sm"
                    >
                      <p className="text-sm font-medium text-gray-800">
                        {e.title}
                      </p>
                      <p className="text-xs text-gray-600">
                        📅 {dayjs(e.date).format("MMM D, YYYY")}
                      </p>
                      <p className="text-xs text-gray-600">
                        ⏰ {e.time} – {e.durationMinutes} mins
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic mt-6 text-center">
                  No conflicts this month 🎉
                </p>
              )}
            </div>

            {/* 🗓️ MAIN CALENDAR SECTION */}
            <div className="flex-1">
              <HeaderBar
                currentMonth={currentMonth}
                handlePrev={handlePrev}
                handleNext={handleNext}
                handleToday={handleToday}
                onAddEventClick={handleAddEventClick}
              />

              {/* 📅 Weekday Headers */}
              <div className="grid grid-cols-7 text-center mt-4 mb-1 text-sm font-semibold text-gray-700">
                {weekDays.map((day, i) => (
                  <div
                    key={i}
                    className={`py-2 uppercase tracking-wide ${
                      i === 0 ? "text-blue-700" : ""
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* 🧭 Calendar Grid */}
              <div className="grid grid-cols-7 border border-gray-200 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-50 to-slate-100">
                {days.map((d, idx) => {
                  const inCurrentMonth = d.month() === currentMonth.month();
                  const dayEvents = getEventsForDay(d);
                  const hasConflict = dayEvents.some((ev) => ev.conflict);
                  const isToday = d.isSame(today, "day");
                  const isSunday = d.day() === 0;

                  return (
                    <div
                      key={idx}
                      onClick={() => handleDateClick(d)}
                      className={`relative min-h-[120px] p-3 flex flex-col cursor-pointer transition-all duration-300 overflow-hidden
                        ${
                          !inCurrentMonth
                            ? "bg-gray-100 text-gray-400"
                            : isSunday
                            ? "bg-gradient-to-br from-blue-100 via-sky-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200"
                            : "bg-gradient-to-br from-white via-sky-50 to-indigo-50 hover:from-sky-100 hover:to-indigo-100"
                        }
                        ${
                          hasConflict
                            ? "border-2 border-red-300 rounded-2xl"
                            : "border border-gray-100"
                        }
                      `}
                    >
                      <div className="text-sm font-semibold flex justify-between items-center">
                        <span
                          className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full ${
                            isToday
                              ? "bg-blue-500 text-white shadow-md ring-2 ring-blue-300"
                              : "text-gray-700"
                          }`}
                        >
                          {d.date()}
                        </span>

                        {hasConflict && (
                          <span
                            title="Conflicting events"
                            className="text-red-500 text-sm"
                          >
                            ⚠
                          </span>
                        )}
                      </div>

                      <div className="mt-2 space-y-1">
                        {dayEvents.slice(0, 2).map((e) => (
                          <div
                            key={e.id}
                            className={`text-xs font-medium rounded-lg px-2 py-0.5 truncate border shadow-sm ${
                              e.conflict
                                ? "bg-red-100 text-red-800 border-red-200"
                                : colorPalette[e.colorIndex % colorPalette.length]
                            }`}
                          >
                            {e.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-[11px] text-gray-500">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 💬 POPUP — Event Details */}
      {selectedDate && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-[380px] max-h-[80vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-800">
                {selectedDate.format("ddd, MMM D, YYYY")}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 text-lg hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>

            <div className="p-3 overflow-y-auto flex-1 bg-white">
              {getEventsForDay(selectedDate).map((event) => (
                <div
                  key={event.id}
                  className={`mb-2 p-3 rounded-xl border text-sm flex flex-col gap-1 transition ${
                    event.conflict
                      ? "bg-red-50 border-red-200 text-red-800"
                      : "bg-gray-50 border-gray-200 text-gray-800"
                  } hover:shadow-sm`}
                >
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-xs text-gray-600 flex items-center gap-1">
                    ⏰ {event.time} — {event.durationMinutes} mins
                    {event.conflict && (
                      <span className="text-red-500 font-medium">⚠ Conflict</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ➕ POPUP — Add Event */}
      {showAddEvent && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-[400px] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-800">
                Add New Event
              </h2>
              <button
                onClick={closeAddEvent}
                className="text-gray-500 text-lg hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddEventSubmit} className="p-4 space-y-3">
              <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="number"
                placeholder="Duration (mins)"
                value={newEvent.durationMinutes}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    durationMinutes: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-lg py-2 font-semibold hover:bg-blue-600 transition"
              >
                Add Event
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
