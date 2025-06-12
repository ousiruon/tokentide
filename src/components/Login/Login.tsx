import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setLogin } from "../../store/Slices/loginSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const { isLoggedIn, credentialsFalse } = useSelector(
    (state: RootState) => state.login
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.username.value;
    const password = form.pwd.value;
    const rememberMe = form.rememberMe.checked;
    dispatch(setLogin({ username, password, rememberMe }));
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [dispatch, isLoggedIn]);
  return (
    <>
      <div className="flex w-full min-h-dvh items-center justify-center bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
        <div className="flex flex-col rounded bg-secondary-light dark:bg-secondary-dark px-8 py-8 gap-4 shadow-lg shadow-bg-light dark:shadow-bg-dark items-center justify-center">
          <div className="font-bold text-lg">Login</div>
          <form onSubmit={submitLogin} className="flex flex-col gap-6">
            <div className="flex gap-4 items-center justify-start w-full">
              <label
                htmlFor="username"
                className="text-sm font-semibold w-4/12"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                className="bg-bg-light dark:bg-bg-dark rounded p-2 text-xs border-1 border-text-light dark:border-text-dark focus:outline-none w-full"
              />
            </div>
            <div className="flex gap-4 items-center justify-start w-full">
              <label htmlFor="pwd" className="text-sm font-semibold w-4/12">
                Password
              </label>
              <input
                type="password"
                name="pwd"
                className="bg-bg-light dark:bg-bg-dark rounded p-2 text-xs border-1 border-text-light dark:border-text-dark focus:outline-none w-full"
              />
            </div>
            <div className="flex gap-2 items-center justify-start w-full">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="bg-bg-light dark:bg-bg-dark rounded p-2 text-xs border-1 border-text-light dark:border-text-dark focus:outline-none cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-sm font-semibold ">
                Remember Me
              </label>
            </div>
            <div className="flex gap-4 items-center justify-start w-full text-sm font-semibold">
              Enter "demo" for both username and password
            </div>
            <div className="flex flex-col gap-2 items-center justify-center w-full">
              <div className="flex items-center justify-center w-full gap-4">
                <button
                  className="bg-tertiary-light dark:bg-tertiary-dark p-2 rounded opacity-70 hover:opacity-100 cursor-pointer font-semibold text-sm"
                  type="submit"
                >
                  Login
                </button>
                <button
                  className="bg-tertiary-light dark:bg-tertiary-dark p-2 rounded opacity-70 hover:opacity-100 cursor-pointer font-semibold text-sm "
                  type="reset"
                >
                  Reset
                </button>
              </div>
              <div className="flex gap-4 items-center justify-center w-full text-xs font-semibold text-red-950 dark:text-red-400">
                {credentialsFalse === true &&
                  "Invalid username or password. Please try again."}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
