function SearchItemLoader() {
  return (
    <div className=" w-full flex gap-2 items-center p-3 justify-start  border-2 border-s-slate-200  rounded-lg animate-pulse ">
      <span>
        <div className="size-7 rounded-full bg-slate-300" />
      </span>
      <div className=" w-full flex flex-col gap-2">
        <div className=" bg-slate-300 rounded w-1/2 h-3"></div>
        <div className=" bg-slate-300 rounded w-1/3 h-2"></div>
      </div>
    </div>
  );
}

export default SearchItemLoader;
