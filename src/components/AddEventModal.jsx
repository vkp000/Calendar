// import React, { useState } from "react";

// export default function AddEventModal({ onAddEvent }) {
//   const [showForm, setShowForm] = useState(false);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     date: "",
//     time: "",
//     durationMinutes: "",
//   });

//   const handleAddEvent = () => {
//     if (!newEvent.title || !newEvent.date || !newEvent.time) {
//       alert("Please fill all required fields!");
//       return;
//     }

//     const eventToAdd = {
//       id: Date.now(),
//       title: newEvent.title,
//       date: newEvent.date,
//       time: newEvent.time,
//       durationMinutes: parseInt(newEvent.durationMinutes) || 60,
//     };

//     onAddEvent(eventToAdd);
//     setShowForm(false);
//     setNewEvent({ title: "", date: "", time: "", durationMinutes: "" });
//   };

//   return (
//     <>
//       {/* Main Button */}
//       <button
//         onClick={() => setShowForm(true)}
//         className="ml-3 px-4 py-1.5 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
//       >
//         ➕ Add Event
//       </button>

//       {/* Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
//           <div className="bg-white w-[420px] rounded-2xl shadow-2xl border border-gray-100 p-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               Add New Event
//             </h2>

//             <div className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Event Title"
//                 value={newEvent.title}
//                 onChange={(e) =>
//                   setNewEvent({ ...newEvent, title: e.target.value })
//                 }
//                 className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//               />
//               <input
//                 type="date"
//                 value={newEvent.date}
//                 onChange={(e) =>
//                   setNewEvent({ ...newEvent, date: e.target.value })
//                 }
//                 className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400"
//               />
//               <input
//                 type="time"
//                 value={newEvent.time}
//                 onChange={(e) =>
//                   setNewEvent({ ...newEvent, time: e.target.value })
//                 }
//                 className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400"
//               />
//               <input
//                 type="number"
//                 placeholder="Duration (minutes)"
//                 value={newEvent.durationMinutes}
//                 onChange={(e) =>
//                   setNewEvent({ ...newEvent, durationMinutes: e.target.value })
//                 }
//                 className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400"
//               />
//             </div>

//             <div className="flex justify-end mt-6 gap-3">
//               <button
//                 onClick={() => setShowForm(false)}
//                 className="px-4 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddEvent}
//                 className="px-4 py-1.5 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }




import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function AddEventModal({ onAddEvent }) {
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    durationMinutes: "",
  });

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      alert("Please fill all required fields!");
      return;
    }

    const eventToAdd = {
      id: Date.now(),
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      durationMinutes: parseInt(newEvent.durationMinutes) || 60,
    };

    onAddEvent(eventToAdd);
    setShowForm(false);
    setNewEvent({ title: "", date: "", time: "", durationMinutes: "" });
  };

  const modalContent = (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] flex items-center justify-center"
      style={{ position: "fixed", pointerEvents: "auto" }}
    >
      <div className="bg-white w-[90vw] sm:w-[420px] rounded-2xl shadow-2xl border border-gray-200 p-6 max-h-[90vh] overflow-y-auto transition-all scale-100 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Add New Event
          </h2>
          <button
            onClick={() => setShowForm(false)}
            className="text-gray-500 text-lg hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) =>
              setNewEvent({ ...newEvent, date: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400"
          />
          <input
            type="time"
            value={newEvent.time}
            onChange={(e) =>
              setNewEvent({ ...newEvent, time: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400"
          />
          <input
            type="number"
            placeholder="Duration (minutes)"
            value={newEvent.durationMinutes}
            onChange={(e) =>
              setNewEvent({ ...newEvent, durationMinutes: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={() => setShowForm(false)}
            className="px-4 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAddEvent}
            className="px-4 py-1.5 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Main Button */}
      <button
        onClick={() => setShowForm(true)}
        className="ml-3 px-4 py-1.5 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
      >
        ➕ Add Event
      </button>

      {/* Render Modal to body */}
      {showForm && createPortal(modalContent, document.body)}
    </>
  );
}
