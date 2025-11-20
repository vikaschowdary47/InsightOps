import { redirect } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { login } from "../redux/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(login({ name: "Vikas", email: "vikas@test.com" }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="min-w-[600px] h-[300px] flex flex-col items-center justify-center">
      <div>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col ">
            <label htmlFor="email">Email</label>
            <input
              autoComplete="email"
              name="email"
              id="email"
              type="email"
              placeholder="Enter Email Address"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder=" Enter Password"
              autoComplete="current-password"
            />
          </div>

          <div className="flex flex-col items-center justify-center">
            <button
              type="submit"
              className="h-[30px] w-[200px] cursor-pointer rounded-3xl text-white mt-4 bg-blue-600"
            >
              Login
            </button>
            <span className="mt-1">OR</span>
            <button
              className="h-[30px] w-[200px] cursor-pointer rounded-3xl text-white mt-1 bg-blue-600"
              onClick={() => redirect("/register")}
            >
              Sign Ups
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
