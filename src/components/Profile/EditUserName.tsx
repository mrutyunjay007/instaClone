import { useEffect, useRef, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { EditingUserName } from "../../Redux/Slice/UserSlice";
import { authService } from "../../Firebase/authService";
import Spiner from "../SmallComponents/loaders/Spiner";

function EditUserName() {
  const currentUserName = useSelector(
    (state: RootState) => state.UserInfos.userData.userName
  );
  const currentUserId = useSelector(
    (state: RootState) => state.UserInfos.userData.userId
  );
  const dispatch = useDispatch();
  const userNameRef = useRef<HTMLInputElement>(null);
  const [editedUserName, setEditedUserName] = useState(currentUserName);
  const [userName, setuserName] = useState(false);
  const [Load, setLoad] = useState(false);

  useEffect(() => {
    if (userName) {
      userNameRef.current?.focus();
    }
  }, [userName]);

  return (
    <div className="w-1/2 relative flex flex-col justify-center rounded-lg  border-2 p-4  border-s-slate-200 cursor-pointer">
      <FiEdit2
        className={`size-4 cursor-pointer absolute top-4 right-4 text-slate-400 ${
          !userName ? "block" : "hidden"
        } hover:text-slate-600`}
        onClick={() => {
          setuserName(true);
        }}
      />
      <span className="text-slate-500">User Name :</span>
      <span className=" font-semibold  ">
        {!userName ? (
          <span> {editedUserName}</span>
        ) : (
          <>
            <input
              ref={userNameRef}
              value={editedUserName}
              onChange={(e) => {
                e.preventDefault();
                setEditedUserName(e.target.value);
              }}
              className="w-full h-10 p-2 border-2 border-s-slate-200 focus:outline-none"
            ></input>
            <div
              className="w-1/2 mt-1 p-3 flex justify-center items-center cursor-pointer rounded-lg drop-shadow-lg text-center font-medium bg-blue-400 text-white"
              onClick={async () => {
                setLoad(true);
                await authService.updateUserName({
                  userId: currentUserId,
                  userName: currentUserName,
                });
                setuserName(false);
                dispatch(EditingUserName(editedUserName));
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

export default EditUserName;
