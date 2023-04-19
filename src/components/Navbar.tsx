import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="text-white flex flex-row items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
        <h1 className="text-red-600 font-bold text-4xl cursor-pointer">NETFLIX</h1>
      </Link>
      {!currentUser ? (
        <div>
          <Link to="/login">
            <button type="button" className="pr-4">
              SignIn
            </button>
          </Link>
          <Link to="/signUp">
            <button
              type="button"
              className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white
          ">
              SignUp
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/account">
            <button type="button" className="pr-4">
              Account
            </button>
          </Link>
          <button
            type="button"
            className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white
          "
            onClick={handleLogout}>
            LogOut
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
