import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { login } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const res = await axios.post("http://localhost:4000/api/users/login", {
        email,
        password,
      });

      console.log("Backend response:", res.data);

      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-w-[600px] h-[300px] flex flex-col items-center justify-center">
      <div>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col ">
            <label htmlFor="email">Email</label>
            <input
              autoComplete="email"
              name="email"
              id="email"
              type="email"
              required
              placeholder="Enter Email Address"
            />
          </div>

          <div className="flex flex-col ">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              required
              placeholder="Enter Password"
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
              type="button"
              className="h-[30px] w-[200px] cursor-pointer rounded-3xl text-white mt-1 bg-blue-600"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
