import ExploreBtn from '@/components/ExploreBtn';
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
    </section>
  );
};

export default Page;
