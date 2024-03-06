import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Field from "./common/Field";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <section className="container">
            <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
                <h2 className="text-2xl font-bold mb-6">Register</h2>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <Field label="First Name" error={errors.firstName}>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter your first name"
                            className={`w-full p-3 bg-[#030317] border ${
                                errors.firstName
                                    ? "border-red-500"
                                    : "border-white/20"
                            }  rounded-md focus:outline-none focus:border-indigo-500`}
                            {...register("firstName", {
                                required: "First Name is required",
                            })}
                        />
                    </Field>
                    <Field label="Last Name" error={errors.lastName}>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter your last name"
                            className={`w-full p-3 bg-[#030317] border ${
                                errors.lastName
                                    ? "border-red-500"
                                    : "border-white/20"
                            }  rounded-md focus:outline-none focus:border-indigo-500`}
                            {...register("lastName", {
                                required: "Last Name is required",
                            })}
                        />
                    </Field>
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
                    <Field>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                        >
                            Create Account
                        </button>
                    </Field>
                    <p className="text-center">
                        Already have account?{" "}
                        <Link
                            to="/login"
                            className="text-indigo-600 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Register;
