import Link from 'next/link';

const HomePage = function () {
  return (
    <>
      <h1>Home Page</h1>

      <nav>
        <ul>
          <li>
            <Link href="/portfolio">Portfolio</Link>
          </li>
          <li>
            <Link href="/clients">Clients</Link>
          </li>
          <li></li>
        </ul>
      </nav>
    </>
  );
};

export default HomePage;
