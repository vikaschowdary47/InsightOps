import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const res = await axios.post("http://localhost:4000/api/users/signup", {
        email,
        password,
      });

      console.log("Signup success:", res.data);

      alert("Account created! Please login.");
      navigate("/login");
    } catch (err: any) {
      console.error("Signup error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Signup failed");
    }
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
              autoComplete="new-password"
            />
          </div>

          <div className="flex flex-col items-center justify-center">
            <button
              type="submit"
              className="h-[30px] w-[200px] cursor-pointer rounded-3xl text-white mt-4 bg-blue-600"
            >
              Sign Up
            </button>

            <span className="mt-1">OR</span>

            <button
              type="button"
              className="h-[30px] w-[200px] cursor-pointer rounded-3xl text-white mt-1 bg-blue-600"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
