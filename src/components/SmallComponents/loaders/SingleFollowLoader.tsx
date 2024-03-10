function SingleFollowLoader() {
  return (
    <div className="flex mt-3 animate-pulse p-5 justify-between drop-shadow-lg bg-white items-center px-4">
      <div className="flex-1 flex justify-start items-center gap-3 my-4 ">
        {/* profile pic */}
        <div className=" size-10 rounded-full bg-slate-200"></div>
        {/* userName */}
        <div className=" w-20 h-2 rounded-lg bg-slate-200 "></div>
      </div>

      {/* follow un-follow btn */}
      <div
        className={` flex justify-center items-center w-32 h-12 
          rounded-md p-2 bg-slate-200 `}
      ></div>
    </div>
  );
}

export default SingleFollowLoader;
