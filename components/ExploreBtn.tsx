'use client';

import Image from 'next/image.js';
import posthog from 'posthog-js';

const ExploreBtn = () => {
  const handleExplore = () => {
    if (
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
      process.env.NEXT_PUBLIC_POSTHOG_HOST
    ) {
      posthog.capture('event_list_explored');
    }
  };

  return (
    <button
      type="button"
      id="explore-btn"
      className="mt-7 mx-auto"
      onClick={handleExplore}
    >
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
