import Link from 'next/link';
import { useUser } from '../utils/authContext';
import { unsetToken } from '../utils/auth';
export default function Navbar() {
  const { user, loading } = useUser();

  const logout = () => {
    unsetToken();
  };
  return (
    <nav>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            CYNO
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {/* <li>
              <a>Item 1</a>
            </li> */}
            <li tabIndex={0}>
              <a>
                {user && !loading ? user : 'Account'}
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                {!loading && !user ? (
                  <>
                    <li>
                      <Link href="/login">Login</Link>
                    </li>
                    <li>
                      <Link href="/create-account">Sign Up</Link>
                    </li>
                  </>
                ) : (
                  ''
                )}
                {!loading && user ? (
                  <li>
                    <Link href="#" onClick={logout}>
                      Logout
                    </Link>
                  </li>
                ) : (
                  ''
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
