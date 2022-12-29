import { fetcher } from '../utils/api';
import { getTokenFromServerCookie } from '../utils/auth';
import { useFetchUser } from '../utils/authContext';

const Profile = ({ avatar }) => {
  const { user, loading } = useFetchUser();
  const uploadToClient = (e) => {};

  const uploadToServer = async () => {};

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-5xl font-bold">
        {' '}
        welcome back{' '}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-900">
          {user}
        </span>
      </h1>
      {avatar === 'default_avatar' && (
        <div>
          <h4>select an image to upload</h4>
          <input type="file" onChange={uploadToClient} />
          <button
            className="md:p-2 rounded py-2 text-black bg-blue-400 p-2"
            type="submit"
            onClick={uploadToServer}
          >
            Set Profile Image
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;

export async function getServerSideProps({ req }) {
  const jwt = getTokenFromServerCookie(req);

  if (!jwt) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } else {
    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const avatar = responseData.avatar ? responseData.avatar : 'default_avatar';
    return {
      props: {
        avatar,
      },
    };
  }
}
