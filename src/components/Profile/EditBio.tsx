import { useEffect, useRef, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { EditingBio } from "../../Redux/Slice/UserSlice";
import { authService } from "../../Firebase/authService";
import Spiner from "../SmallComponents/loaders/Spiner";

function EditBio() {
  const currentUserBio = useSelector(
    (state: RootState) => state.UserInfos.userData.userBio
  );
  const currentUserId = useSelector(
    (state: RootState) => state.UserInfos.userData.userId
  );
  const dispatch = useDispatch();
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const [editedBio, setEditedBio] = useState(currentUserBio);
  const [bio, setBio] = useState(false);
  const [Load, setLoad] = useState(false);

  useEffect(() => {
    if (bio) {
      bioRef.current?.focus();
    }
  }, [bio]);

  return (
    <div className="w-1/2 relative flex flex-col justify-center rounded-lg  border-2 p-4  border-s-slate-200 cursor-pointer">
      <FiEdit2
        className={`size-4 cursor-pointer absolute top-4 right-4 text-slate-400 ${
          !bio ? "block" : "hidden"
        } hover:text-slate-600`}
        onClick={() => {
          setBio(true);
        }}
      />
      <span className="text-slate-500">Bio :</span>
      <span className=" font-semibold  ">
        {!bio ? (
          <span> {editedBio}</span>
        ) : (
          <>
            <textarea
              ref={bioRef}
              className="w-full focus:outline-none h-36 resize-none"
              value={editedBio}
              onChange={(e) => {
                e.preventDefault();
                setEditedBio(e.target.value);
              }}
            ></textarea>
            <div
              className="w-1/2  p-3 flex justify-center items-center cursor-pointer rounded-lg drop-shadow-lg text-center font-medium bg-blue-400 text-white"
              onClick={async () => {
                setLoad(true);
                await authService.updateUserBio({
                  userBio: currentUserBio,
                  userId: currentUserId,
                });
                setBio(false);
                dispatch(EditingBio(editedBio));
                setLoad(false);
              }}
            >
              {Load ? <Spiner w={6} h={6}></Spiner> : <span>Save</span>}
            </div>
          </>
        )}
      </span>
    </div>
  );
}

export default EditBio;
