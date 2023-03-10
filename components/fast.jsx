import { formatDate } from '../utils/date';
import { formatTime } from '../utils/date';
function Fast({ fast }) {
  const { end, duration, username } = fast;
  return (
    <div className="dark:text-slate-100">
      <h1 className="text-xl">date: {end}</h1>
      <h1 className="text-xl">duration: {duration} </h1>
      <h1 className="text-xl">username: {username}</h1>
    </div>
  );
}

export default Fast;
