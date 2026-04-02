import { useState } from "react";
import axios from "axios";
import shape1 from "../assets/images/shape1.svg";
import shape2 from "../assets/images/shape2.svg";
import shape3 from "../assets/images/shape3.svg";
import darkShape1 from "../assets/images/dark_shape.svg";
import darkShape2 from "../assets/images/dark_shape1.svg";
import darkShape3 from "../assets/images/dark_shape2.svg";
import registrationImg from "../assets/images/registration.png";
import logo from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google.svg";

const Register = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                    password: form.password,
                },
                { withCredentials: true }
            );

            window.location.href = "/feed";
        } catch (error) {
            alert("Registration failed");
        }
    };

    return (
        <section className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4">
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-40 items-center">

                {/* Background Shapes */}
                <div className="pointer-events-none absolute inset-0 z-0 select-none">

                    <div className="absolute top-0 left-0">
                        <img src={shape1} className="w-32 md:w-40 opacity-80" />
                        <img src={darkShape1} className="absolute top-0 left-0 w-32 md:w-40 opacity-30" />
                    </div>

                    <div className="absolute top-0 right-10 md:right-20">
                        <img src={shape2} className="w-60 md:w-80 opacity-80" />
                        <img src={darkShape2} className="absolute top-0 right-0 w-60 md:w-80 opacity-20" />
                    </div>

                    <div className="absolute bottom-0 right-10 md:right-40">
                        <img src={shape3} className="w-60 md:w-80 opacity-80" />
                        <img src={darkShape3} className="absolute bottom-0 right-0 w-60 md:w-80 opacity-20" />
                    </div>

                </div>

                {/* LEFT SIDE */}
                <div className="hidden lg:flex justify-end items-center">
                    <img
                        src={registrationImg}
                        alt="register"
                        className="w-full max-w-2xl xl:max-w-3xl scale-110"
                    />
                </div>

                {/* RIGHT SIDE */}
                <div className="flex justify-center relative">
                    <div className="w-full max-w-md bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8">

                        {/* LOGO */}
                        <div className="flex justify-center mb-6">
                            <img src={logo} className="h-8" />
                        </div>

                        <p className="text-gray-500 text-sm text-center mb-1">
                            Get Started Now
                        </p>

                        <h2 className="text-2xl font-semibold text-center mb-6">
                            Registration
                        </h2>

                        {/* GOOGLE BUTTON */}
                        <button className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 transition py-3 rounded-lg text-sm font-medium text-gray-600">
                            <img src={googleIcon} className="h-5" />
                            Register with google
                        </button>

                        {/* DIVIDER */}
                        <div className="flex items-center my-6">
                            <div className="flex-1 border-t border-gray-200"></div>
                            <span className="px-3 text-xs text-gray-400">Or</span>
                            <div className="flex-1 border-t border-gray-200"></div>
                        </div>

                        {/* FORM */}
                        <form onSubmit={handleRegister} className="space-y-4">

                            {/* NAME FIELDS */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-600 block mb-1">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 block mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                    />
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div>
                                <label className="text-sm text-gray-600 block mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                />
                            </div>

                            {/* PASSWORD */}
                            <div>
                                <label className="text-sm text-gray-600 block mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                />
                            </div>

                            {/* REPEAT PASSWORD */}
                            <div>
                                <label className="text-sm text-gray-600 block mb-1">
                                    Repeat Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                />
                            </div>

                            {/* TERMS */}
                            <label className="flex items-center gap-2 text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    required
                                    className="accent-blue-600"
                                />
                                I agree to terms & conditions
                            </label>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="w-full bg-[#1b8fff] hover:bg-[#1b8fff] transition text-white py-3 rounded-lg font-medium"
                            >
                                Register now
                            </button>
                        </form>

                        {/* FOOTER */}
                        <p className="text-center text-sm text-gray-500 mt-6">
                           Already have an account?{" "}
                            <a href="/login" className="text-[#1b8fff] font-medium hover:underline">
                                Login
                            </a>
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;