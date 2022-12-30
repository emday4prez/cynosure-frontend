import Fast from './fast';
function AllFasts({ fasts }) {
  console.log('allFasts.jsx fasts: ', fasts);
  return (
    <div>
      <div>AllFasts</div>
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 border-green-400 border-4">
        {fasts &&
          fasts.data.map((fast) => {
            return <Fast key={fast.id} fast={fast.attributes} />;
          })}
      </div>
    </div>
  );
}

export default AllFasts;
