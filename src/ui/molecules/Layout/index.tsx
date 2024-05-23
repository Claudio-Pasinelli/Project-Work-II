import { Outlet } from 'react-router-dom';
import { Footer } from '../../atoms';
import Navbar from '../Navbar';

const Layout = () => {
  return (
    <section className="size-full overflow-x-hidden">
      <section className="w-full h-screen justify-between flex flex-col text-center">
        <Navbar />
        <section className="w-full h-auto">
          <Outlet />
        </section>
        <Footer />
      </section>
    </section>
  );
};

export default Layout;
