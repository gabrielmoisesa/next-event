import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import { events } from '@/lib/constants';
import React from 'react';

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
