import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginSuccess, setError } from "../../redux/customerSlice";
import useAPI from "../../hooks/useAPI";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { callApi, loading } = useAPI();

  const validate = () => {
    let newErrors = {};
    if (
      !credentials.identifier.match(/^\S+@\S+\.\S+$/) &&
      !credentials.identifier.match(/^\d{10}$/)
    ) {
      newErrors.identifier = "Enter a valid email or 10-digit mobile number";
    }
    if (credentials.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await callApi({
      url: "api/customer/login",
      method: "POST",
      data: { ...credentials, location },
      headers: { "Content-Type": "application/json" },
    });

    if (result?.success) {
      dispatch(loginSuccess(result.customer));
      toast.success("Logged in successfully!");
      navigate("/");
      setCredentials({ identifier: "", password: "" });
    } else {
      dispatch(setError(result?.message));
      toast.error(result?.message);
    }
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-300 dark:border-gray-700">

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Login
        </h2>
        <form className="mt-6 space-y-6" >
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Email or Mobile Number</label>
            <input
              type="text"
              name="identifier"
              value={credentials.identifier}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
              required
            />
            {errors.identifier && <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            onClick={handleSubmit}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        {/* <div className="flex flex-col items-center mt-4 space-y-3">
          <button
            onClick={() => handleOAuthLogin("google")}
            className="w-full flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition"
          >
            Login with Google
          </button>
          <button
            onClick={() => handleOAuthLogin("github")}
            className="w-full flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-md transition"
          >
            Login with GitHub
          </button>
        </div> */}
        <div className="flex flex-col items-center mt-4">
          <Link to="/forgot-password" className="self-end text-sm text-blue-500 dark:text-blue-400 hover:underline">
            Forgot Password?
          </Link>
          <p className="text-center text-gray-700 dark:text-gray-300 mt-3">
            Don't have an account? {" "}
            <a href="/signup" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
