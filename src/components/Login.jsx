import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Field from "./common/Field";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const onSubmit = async (formData) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
                formData
            );
            if (response.status === 200) {
                const { user, token } = response.data;
                if (token) {
                    const accessToken = token.accessToken;
                    const refreshToken = token.refreshToken;

                    setAuth({ user, accessToken, refreshToken });
                    navigate("/");
                }
                localStorage.setItem("user", JSON.stringify(user));
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setError("root.random", {
                type: "random",
                message: "Incorrect email or password!",
            });
        }
    };
    return (
        <section className="container">
            {/* <!-- Login Form into a box center of the page --> */}
            <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Field label="Email" error={errors.email}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            className={`w-full p-3 bg-[#030317] border ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-white/20"
                            }  rounded-md focus:outline-none focus:border-indigo-500`}
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                    </Field>
                    <Field label="Password" error={errors.password}>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className={`w-full p-3 bg-[#030317] border ${
                                errors.password
                                    ? "border-red-500"
                                    : "border-white/20"
                            } rounded-md focus:outline-none focus:border-indigo-500`}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be atleast 8 characters long",
                                },
                            })}
                        />
                    </Field>
                    <p className="text-sm text-red-500 my-2 text-center">
                        {errors.root?.random && errors.root?.random?.message}
                    </p>
                    <Field>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                        >
                            Login
                        </button>
                    </Field>
                    <p className="text-center">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-indigo-600 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Login;
