
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../utils/authSlice";
import { todoList } from "../utils/todoSlice";
const Header = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((store: any) => store.user.user);
  const logout1 = async () => {
    await fetch("https://hi-todo-backend.onrender.com/api/auth/logout", {
      credentials: "include",
    });
    dispatch(logout());
    dispatch(todoList([]));
  };
  return (
    <div className="bg-blue-500 flex items-center justify-between text-white text-lg p-4">
      <Link to={"/"}>
        <p className="font-bold">Hi Darling!</p>
      </Link>
      <div className="flex gap-x-10">
        <Link to={"/about"}>About</Link>
        {!user ? (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Signup</Link>
          </>
        ) : (
          <button onClick={() => logout1()}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default Header;
