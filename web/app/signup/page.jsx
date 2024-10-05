'use client'

import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import heroImg from '@/assets/heroImg.png'

function Signup() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.email && user.password) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onSignup = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            toast.success("Signup successful. Please check your email for verification.");
            router.push('/login');
        } catch (error) {
            console.error("signup failed", error);
            toast.error(error.message || "Failed to signup");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8"
             style={{
                 backgroundImage: `url(${heroImg.src})`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat'
             }}>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-[#45637e]">
                    Create your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white bg-opacity-90 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-[#45637e]">
                    <form className="space-y-6" onSubmit={onSignup}>
                        {/* Email input field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    required
                                    className="block w-full appearance-none rounded-md border input-field px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm bg-white border-[#45637e] focus:border-[#45637e] focus:ring focus:ring-[#45637e] focus:ring-opacity-50"
                                />
                            </div>
                        </div>

                        {/* Password input field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    autoComplete="new-password"
                                    required
                                    className="block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm bg-white border-[#45637e] focus:border-[#45637e] focus:ring focus:ring-[#45637e] focus:ring-opacity-50"
                                />
                            </div>
                        </div>

                        {/* Submit button */}
                        <div>
                            <button
                                type="submit"
                                disabled={buttonDisabled || loading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                    buttonDisabled || loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-[#45637e] hover:bg-[#3a526b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#45637e]'
                                }`}
                            >
                                {loading ? 'Signing up...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>

                    {/* Login link */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Or
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link href="/login" className="font-medium text-[#45637e] hover:text-[#3a526b]">
                                Already have an account? Log in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;