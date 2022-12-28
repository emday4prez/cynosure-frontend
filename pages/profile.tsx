import { useFetchUser } from '../utils/authContext';

const Profile = () => {
  const { user, loading } = useFetchUser();

  return (
    <div className="flex flex-col items-center  min-h-screen">
      <h1 className="text-5xl font-bold">
        {' '}
        welcome back{' '}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-900">
          {user}
        </span>
      </h1>
    </div>
  );
};

export default Profile;
