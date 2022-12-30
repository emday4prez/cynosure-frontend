import { formatDateTime } from '../utils/date';

function AllFasts({ fasts }) {
  return (
    <div>
      <div>AllFasts</div>
      <div>
        {fasts &&
          fasts.data.map((fast) => {
            return (
              <div key={fast.id}>{formatDateTime(fast.attributes.start)}</div>
            );
          })}
      </div>
    </div>
  );
}

export default AllFasts;
