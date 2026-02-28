import { Outlet } from 'react-router';
import { Footer } from '~/components/ui/Footer/';
import { Header } from '~/components/ui/Header/';

export default function Layout() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
