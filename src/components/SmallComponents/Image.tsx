import { useState } from "react";

function Image({ url, rounded }: { url: string; rounded: boolean }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <div
        className={`w-full h-full  aspect-square ${
          !imageLoaded && "bg-slate-200 animate-pulse"
        } ${rounded && "rounded-full"}`}
      >
        <img
          className={`w-full h-full object-cover overflow-hidden ${
            rounded && "rounded-full"
          }`}
          loading="lazy"
          src={url}
          alt=""
          //checking image loading completion
          onLoad={() => {
            setImageLoaded(true);
          }}
        />
      </div>
    </>
  );
}

export default Image;
