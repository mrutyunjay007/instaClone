import { useEffect, useState } from "react";
import { searchUserIdName } from "../Firebase/SearchUserIdNameService";
import { MdKeyboardArrowRight } from "react-icons/md";
import Spiner from "./SmallComponents/loaders/Spiner";
import { useDispatch } from "react-redux";
import { updateUserIdName } from "../Redux/Slice/UserSlice";
import UserIdNameSchema from "../Schema/UserIdNameSchema";
import { authService } from "../Firebase/authService";

function UserIdName({
  changeLog,
  currentUserId,
}: {
  changeLog: () => void;
  currentUserId: string;
}) {
  const [userIdName, setUserIdName] = useState("");
  const [isAvailable, setAvailable] = useState("");
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    //Debouncing
    let timer: NodeJS.Timeout;
    if (userIdName.length > 0) {
      UserIdNameSchema.validate({
        userIdName,
      })
        .then(() => {
          timer = setTimeout(() => {
            // call server
            (async () => {
              setLoading(true);

              try {
                const present = await searchUserIdName.findUserIdName(
                  userIdName
                );
                console.log(present);

                if (present !== undefined) {
                  setAvailable(`${present ? "Available" : "Not Available"}`);
                  present &&
                    (await authService.updateUserIdName({
                      userId: currentUserId,
                      userIdName,
                    }));
                }

                setLoading(false);
              } catch (error) {
                console.log(error);
              }
            })();
          }, 500);
        })
        .catch((error) => {
          setAvailable(error.errors[0]);
        });
    } else {
      setAvailable("");
    }

    return () => clearTimeout(timer);
  }, [userIdName]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className=" flex flex-col gap-2 justify-center items-center h-1/2 w-1/2 md:w-1/2 lg:w-1/2 ">
        <input
          type="text"
          value={userIdName}
          onChange={(e) => {
            e.preventDefault();
            setUserIdName(e.target.value);
          }}
          placeholder="user Id"
          className=" w-full rounded h-1/5 px-3 focus:outline-none border-2 border-s-slate-300"
        />
        <div
          className={`pl-1 w-full text-sm flex font-semibold ${
            isAvailable === "Available" ? "text-green-500" : "text-red-600"
          }`}
        >
          {isLoading ? (
            <span>
              <Spiner w={6} h={6} />
            </span>
          ) : (
            <span>{`${isAvailable}`}</span>
          )}
        </div>

        <div
          className={`w-full flex justify-end items-center mt-5 cursor-pointer  ${
            isAvailable === "Available" ? "text-black" : "text-slate-400 "
          } `}
        >
          {"Next"}
          <MdKeyboardArrowRight
            className={`size-5 ${
              isAvailable === "Available" ? "text-black" : "text-slate-400 "
            }`}
            onClick={() => {
              if (isAvailable === "Available") changeLog();
              dispatch(updateUserIdName(userIdName));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default UserIdName;
