import Image from 'next/image.js';
import Link from 'next/link.js';

const NavBar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          <p>NextEvent</p>
        </Link>
        <ul>
          <Link href="/">Início</Link>
          <Link href="/">Eventos</Link>
          <Link href="/">Criar Evento</Link>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
