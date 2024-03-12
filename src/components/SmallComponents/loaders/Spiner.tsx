import { RiLoader4Line } from "react-icons/ri";
function Spiner({ w, h }: { w: number; h: number }) {
  return (
    <RiLoader4Line
      className={`animate-spin rounded-full h-${h} w-${w} text-slate-300`}
    />
  );
}

export default Spiner;
