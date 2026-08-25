'use client';

import Image from 'next/image.js';

const ExploreBtn = () => {
  return (
    <button type="button" id="explore-btn" className="mt-7 mx-auto">
      <a href="#events">Explorar Eventos</a>
      <Image
        src="../icons/arrow-down.svg"
        alt="arrow-down"
        width={24}
        height={24}
        className="ml-1"
      />
    </button>
  );
};

export default ExploreBtn;
