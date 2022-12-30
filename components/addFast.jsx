import { useState } from 'react';
import { fetcher } from '../utils/api';
import { setToken } from '../utils/auth';
import { useUser } from '../utils/authContext';

function AddFast() {
  const [data, setData] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    duration: '',
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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
  const { user, loading } = useUser();
  return (
    <div>
      {!loading && user ? (
        <div className="card md:w-96 w-64 bg-base-100 shadow-xl h-96">
          <form onSubmit={handleSubmit} className="card-body flex flex-col p-8">
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              className="dark:text-slate-100 md:p-2 form-input py-2  rounded mt-2 text-slate-900"
              required
            />
            <input
              type="time"
              name="startTime"
              onChange={handleChange}
              className="dark:text-slate-100 md:p-2 form-input py-2  rounded mt-2 text-slate-900"
              required
            />
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              className="dark:text-slate-100 md:p-2  form-input py-2 mt-2  text-slate-900 rounded"
              required
            />
            <input
              type="time"
              name="endTime"
              onChange={handleChange}
              className="dark:text-slate-100 md:p-2 form-input py-2  rounded mt-2 text-slate-900"
              required
            />
            <button
              className="dark:text-slate-100 dark:bg-blue-800 dark:hover:bg-blue-900 rounded text-black bg-blue-200 p-2 hover:bg-blue-300"
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
