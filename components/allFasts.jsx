import React from 'react';

function AllFasts({ fasts }) {
  return (
    <div>
      <div>AllFasts</div>
      <div>
        {fasts &&
          fasts.data.map((fast) => {
            return <div key={fast.id}>{fast.attributes.start}</div>;
          })}
      </div>
    </div>
  );
}

export default AllFasts;
