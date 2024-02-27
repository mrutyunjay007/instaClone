function Spiner({ w, h }: { w: number; h: number }) {
  return (
    <div
      className={`animate-spin rounded-full h-${h} w-${w} border-b-2 border-l-2  border-slate-200`}
    ></div>
  );
}

export default Spiner;
