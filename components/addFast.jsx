import { useState } from 'react';
import { fetcher } from '../utils/api';
import { getTokenFromLocalCookie, setToken } from '../utils/auth';
import { useUser } from '../utils/authContext';
import { useRouter } from 'next/router';

function AddFast() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [data, setData] = useState({
    endDate: '',
    duration: '',
  });
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwt = getTokenFromLocalCookie();

    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/fasts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            data: {
              end: data.endDate,
              username: user,
              duration: data.duration,
            },
          }),
        }
      );
      router.reload();
    } catch (e) {
      console.error('error posting fast', e);
    }
  };

  return (
    <div>
      {!loading && user ? (
        <div className=" bg-sky-100 dark:bg-slate-900 m-4 md:w-96 w-64 bg-base-100 rounded shadow-xl ">
          <form
            onSubmit={handleSubmit}
            className="card-body flex flex-col items-center justify-center p-8"
          >
            <h1>add a fast</h1>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              className="dark:text-slate-100 md:p-2 form-input py-2  rounded mt-2 text-slate-900"
              required
            />
            <div className="my-4">
              <p className="text-center">hours</p>
              <input
                type="text"
                name="duration"
                onChange={handleChange}
                className="dark:text-slate-100 md:p-2 form-input py-2  rounded mt-2 text-slate-900"
                required
              />
            </div>

            <button
              className="dark:text-slate-100 dark:bg-blue-800 dark:hover:bg-blue-900 rounded text-black bg-blue-200 py-2 hover:bg-blue-300 w-full"
              type="submit"
            >
              submit
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

export default AddFast;
