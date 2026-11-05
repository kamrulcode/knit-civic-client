// const eventMessages = [
//   "COMMUNITY CLEANUP",
//   "FOOD DONATION DRIVE",
//   "VOLUNTEER TOGETHER",
//   "EDUCATION FOR EVERYONE",
//   "MAKE A DIFFERENCE",
//   "SUPPORT YOUR COMMUNITY",
// ];

// export default function EventMarquee() {
//   const messages = [...eventMessages, ...eventMessages];

//   return (
//     <div className="event-marquee" aria-label="Community events and activities">
//       <div className="event-marquee-track" aria-hidden="true">
//         {messages.map((message, index) => (
//           <div key={index} className="event-marquee-item">
//             <span className="event-marquee-dot" />
//             <span>{message}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

const events = [
  "COMMUNITY CLEANUP",
  "FOOD DONATION DRIVE",
  "VOLUNTEER TOGETHER",
  "EDUCATION FOR EVERYONE",
  "MAKE A DIFFERENCE",
  "SUPPORT YOUR COMMUNITY",
];

export default function EventMarquee() {
  return (
    <aside aria-label="Community events" className="event-marquee">
      <div className="event-marquee-track">
        {[...events, ...events].map((event, index) => (
          <div key={`${event}-${index}`} className="event-marquee-item">
            <span className="event-marquee-dot" />
            <span>{event}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
