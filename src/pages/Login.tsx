import { useState } from "react";
import axios from "axios";

import shape1 from "../assets/images/shape1.svg";
import shape2 from "../assets/images/shape2.svg";
import shape3 from "../assets/images/shape3.svg";
import darkShape1 from "../assets/images/dark_shape.svg";
import darkShape2 from "../assets/images/dark_shape1.svg";
import darkShape3 from "../assets/images/dark_shape2.svg";
import loginImg from "../assets/images/login.png";
import logo from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google.svg";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email: form.email,
                    password: form.password,
                },
                { withCredentials: true }
            );

            window.location.href = "/feed";
        } catch (error) {
            alert("Login failed");
        }
    };

    return (
        <section className="min-h-screen bg-[#F0F2F5] relative overflow-hidden flex items-center justify-center px-4">

            {/* ✅ BACKGROUND SHAPES (FIXED) */}
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

            {/* MAIN CONTENT */}
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                {/* LEFT IMAGE */}
                <div className="hidden lg:block lg:col-span-8">
                    <img
                        src={loginImg}
                        alt="Login"
                        className="w-full max-w-2xl mx-auto"
                    />
                </div>

                {/* RIGHT FORM */}
                <div className="lg:col-span-4 relative z-20">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">

                        {/* Logo */}
                        <div className="flex justify-center lg:justify-start mb-8">
                            <img src={logo} alt="Logo" className="h-10" />
                        </div>

                        <p className="text-gray-600 text-center lg:text-left mb-1">
                            Welcome back
                        </p>

                        <h2 className="text-3xl font-semibold text-center lg:text-left mb-8">
                            Login to your account
                        </h2>

                        {/* Google Button */}
                        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 transition py-3.5 rounded-xl mb-6">
                            <img src={googleIcon} alt="Google" className="h-5" />
                            <span className="font-medium text-gray-700">
                                Or sign-in with Google
                            </span>
                        </button>

                        {/* Divider */}
                        <div className="relative text-center my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <span className="relative bg-white px-4 text-sm text-gray-400">
                                Or
                            </span>
                        </div>

                        {/* FORM */}
                        <form onSubmit={handleLogin} className="space-y-5">

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl px-4 py-3 outline-none transition"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl px-4 py-3 outline-none transition"
                                />
                            </div>

                            {/* Remember */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 accent-[#1b8fff]"
                                    />
                                    <span className="text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </div>

                                <span className="text-sm text-[#1b8fff] cursor-pointer hover:underline">
                                    Forgot password?
                                </span>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-[#1b8fff] hover:bg-[#1b8fff] transition text-white font-medium py-3.5 rounded-xl text-base"
                            >
                                Login now
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="text-center mt-6 text-sm text-gray-600">
                            Don't have an account?{" "}
                            <a
                                href="/register"
                                className="text-[#1b8fff] font-medium hover:underline"
                            >
                                Create New Account
                            </a>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default Login;