import { useState } from 'react';
import { fetcher } from '../utils/api';
import { getIdFromLocalCookie, getTokenFromServerCookie } from '../utils/auth';
import { useFetchUser } from '../utils/authContext';
import { useRouter } from 'next/router';
import AddFast from '../components/addFast';
import AllFasts from '../components/allFasts';
const Profile = ({ avatar }) => {
  const router = useRouter();
  const { user, loading } = useFetchUser();
  const [image, setImage] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const tempImg = event.target.files[0];
      setImage(tempImg);
    }
  };

  const uploadToServer = async () => {
    const formData = new FormData();
    const file = image;
    formData.append('inputFile', file);
    formData.append('user_id', await getIdFromLocalCookie());

    try {
      const responseData = await fetcher(`/api/upload`, {
        method: 'POST',
        body: formData,
      });
      console.log('profile pic upload responseData: ', responseData);
      if (responseData.message === 'success') {
        router.reload('/profile');
      }
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen dark:text-white ">
      <h1 className="text-5xl font-bold">
        {' '}
        welcome back{' '}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-900  dark:from-blue-200 dark:to-indigo-300 ">
          {user}
        </span>
      </h1>
      {avatar === 'default_avatar' && (
        <div>
          <h4>select an image to upload</h4>
          <input type="file" onChange={uploadToClient} />
          <button
            className="md:p-2 rounded py-2 text-black bg-blue-400 p-2  dark:bg-blue-200"
            type="submit"
            onClick={uploadToServer}
          >
            Set Profile Image
          </button>
        </div>
      )}
      {/* eslint-disable @next/next/no-img-element */}
      {avatar && (
        <img
          className="w-32 h-32 rounded-2xl"
          src={`https://res.cloudinary.com/dfyd1vtup/image/upload/${avatar}`}
          alt="profile"
        />
      )}
      <AddFast />
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
