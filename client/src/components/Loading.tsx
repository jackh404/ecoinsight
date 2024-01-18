const Loading = (props: { message?: string }) => {
  return (
    <div className="flex flex-col max-w-40 mx-auto">
      <h2>
        {props.message ? props.message : "Loading"}
        <span className="ellipsis-dot">.</span>
        <span className="ellipsis-dot">.</span>
        <span className="ellipsis-dot">.</span>
      </h2>
      <img src="/images/loading.gif" alt="loading" />
    </div>
  );
};

export default Loading;
