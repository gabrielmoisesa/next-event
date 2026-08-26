import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import React from 'react';

const events = [
  { image: '/images/event1.png', title: 'Event 1' },
  { image: '/images/event2.png', title: 'Event 2' },
];

const Page = () => {
  return (
    <section>
      <h1 className="text-center">
        O hub de todo evento dev <br /> que você não pode perder
      </h1>
      <p className="text-center mt-5">
        Hackathons, meetups e conferências, tudo em um só lugar.
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Eventos em Destaque</h3>
        <ul className="events">
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
