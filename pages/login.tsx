import { unsetToken } from '../utils/auth';
import { useUser } from '../utils/authContext';
import { useState } from 'react';
import { fetcher } from '../utils/api';
import { setToken } from '../utils/auth';
import Link from 'next/link';
function Login() {
  const [data, setData] = useState({
    identifier: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: data.identifier,
          password: data.password,
        }),
      }
    );
    setToken(responseData);
  };
  const logout = () => {
    unsetToken();
  };
  const { user, loading } = useUser();
  return (
    <div className="flex flex-col items-center justify-center bg-blue-600 text-white  min-h-screen ">
      {!loading &&
        (user ? (
          <>
            <li className="list-none">
              <a
                className="md:p-2  btn btn-ghost  hover:text-teal-400"
                onClick={logout}
                style={{ cursor: 'pointer' }}
              >
                Log out
              </a>
            </li>
            <li className="list-none">
              <Link
                href="/profile"
                className="md:p-2  btn btn-ghost  hover:text-teal-400"
                style={{ cursor: 'pointer' }}
              >
                profile
              </Link>
            </li>
          </>
        ) : (
          ''
        ))}
      {!loading &&
        (user ? (
          <li className="flex-none list-none">
            <p className="md:p-2 ">currently logged in as {user}</p>
          </li>
        ) : (
          ''
        ))}
      {!loading && !user ? (
        <div className="card md:w-96 w-64 bg-base-100 shadow-xl h-96">
          <form onSubmit={handleSubmit} className="card-body flex flex-col p-8">
            <input
              type="text"
              name="identifier"
              onChange={handleChange}
              placeholder="Username"
              className="md:p-2 form-input py-2  rounded mt-2 text-slate-900"
              required
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              className="md:p-2  form-input py-2 mt-2  text-slate-900 rounded"
              required
            />
            <button
              className="rounded text-black bg-purple-200 p-2 hover:bg-purple-100"
              type="submit"
            >
              login
            </button>
          </form>

          {/* <li className="flex-none ">
            <Link href="/create-account" className="btn  btn-ghost   p-0.5">
              Register
            </Link>
          </li> */}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Login;
