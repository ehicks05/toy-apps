import { Link } from 'react-router-dom';

const Header = () => (
  <div className="mx-auto flex max-w-screen-lg items-center gap-4">
    <Link
      className="flex items-center gap-1 p-1 text-2xl"
      style={{ fontFamily: 'Urbanist' }}
      to="/"
    >
      WeatherMan
    </Link>
  </div>
);

export default Header;
