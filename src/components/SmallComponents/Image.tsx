import { useState } from "react";

function Image({ url }: { url: string }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <div
        className={`w-full h-full  aspect-square ${
          !imageLoaded && "bg-slate-200"
        }`}
      >
        <img
          className="w-full h-full object-cover overflow-hidden"
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
