import Image from 'next/image.js';
import Link from 'next/link.js';

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({ title, image }: Props) => {
  return (
    <Link href={`/events`} id="event card">
      <Image
        src={image}
        alt={title}
        width={410}
        height={300}
        className="poster"
      />
      <p className="title">{title}</p>
    </Link>
  );
};

export default EventCard;
