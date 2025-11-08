import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import eventsData from "../data/events.json";
import WeekHeader from "./WeekHeader";
import DayColumn from "./DayColumn";

export default function WeekCalendar() {
  // startOfWeek uses Sunday by default; adjust if you prefer Monday: .startOf('week').add(1, 'day') or use weekday plugin
  const [startOfWeek, setStartOfWeek] = useState(dayjs().startOf("week"));
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // load events (static JSON)
    setEvents(eventsData.map((e) => ({ ...e })));
  }, []);

  const days = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push(startOfWeek.add(i, "day"));
    }
    return arr;
  }, [startOfWeek]);

  const gotoPrevWeek = () => setStartOfWeek((s) => s.subtract(1, "week"));
  const gotoNextWeek = () => setStartOfWeek((s) => s.add(1, "week"));
  const gotoToday = () => setStartOfWeek(dayjs().startOf("week"));

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <WeekHeader
        startOfWeek={startOfWeek}
        onPrev={gotoPrevWeek}
        onNext={gotoNextWeek}
        onToday={gotoToday}
      />

      <div className="mt-6 grid grid-cols-7 gap-4">
        {days.map((d) => (
          <DayColumn
            key={d.format("YYYY-MM-DD")}
            day={d}
            events={events.filter((ev) => ev.date === d.format("YYYY-MM-DD"))}
          />
        ))}
      </div>
    </div>
  );
}
