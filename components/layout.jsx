import Footer from './footer';
import Navbar from './navbar';
import { UserProvider } from '../utils/authContext';
export default function Layout({ children, user, loading = false }) {
  return (
    <>
      <UserProvider value={{ user, loading }}>
        <Navbar />
        <div>{children}</div>
        <Footer />
      </UserProvider>
    </>
  );
}
