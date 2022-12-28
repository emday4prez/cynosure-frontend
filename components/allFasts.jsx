import React from 'react';

function AllFasts({ fasts }) {
  console.log(fasts);
  return (
    <>
      <div>AllFasts</div>
      <div>
        {fasts &&
          fasts.data.map((fast) => {
            return <div key={fast.id}>{fast.attributes.start}</div>;
          })}
      </div>
    </>
  );
}

export default AllFasts;
