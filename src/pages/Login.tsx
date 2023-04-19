import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const err = error.split(".");

  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await login(email, password);
    if (res.error) {
      setError(res.error);
    } else {
      navigate("/");
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="h-screen w-full ">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/61e79073-50cf-4f7b-9a23-73290e6f7dca/d0322828-6d63-4f5f-92fb-30f492e7cca4/IN-en-20230410-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="background-img"
        className="h-full w-full absolute object-cover"
      />
      <div className="bg-black/80 fixed top-0 left-0 w-full h-screen" />
      <div className="fixed w-full px-4 py-24 z-50">
        <div className="max-w-[450px] h-[660px] mx-auto bg-black/75  text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-4xl font-bold ">Sign In</h1>
            <form onSubmit={(e) => handleLogin(e)}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="my-4 rounded-md text-md p-4 focus:outline-none w-full bg-gray-600"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="my-4 rounded-md text-md p-4 focus:outline-none w-full bg-gray-700"
                autoComplete="none"
              />
              {error !== "" ? (
                <div className="text-red-500">
                  {err.map((e, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <p key={i}>{e}</p>
                  ))}
                </div>
              ) : null}
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="disabled:bg-gray-700 w-full my-4 p-4 bg-red-600 rounded-md text-lg font-bold">
                Sign In
              </button>
            </form>
            <div className="flex flex-row justify-between text-sm font-light text-gray-400 items-center">
              <p>
                <label htmlFor="remember">
                  <input type="checkbox" id="remember" className="mr-1 " />
                  Remember Me
                </label>
              </p>
              <p>Need Help?</p>
            </div>
            <div className="flex items-center mt-16 text-lg">
              <p className="mr-2 text-gray-500">New to Netflix?</p>
              <Link to="/signUp">Sign up now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
