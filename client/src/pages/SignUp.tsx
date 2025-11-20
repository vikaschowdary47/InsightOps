import { useAppDispatch } from "../hooks";
import { login } from "../redux/authSlice";

const SignUp = () => {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(login({ name: "Vikas", email: "vikas@test.com" }));
  };
  return (
    <div>
      <form>
        <label htmlFor="email">Email</label>
        <input name="email" id="email" type="email" placeholder="Email" />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          placeholder="Password"
        />
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;
