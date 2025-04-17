'use client'
import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", serverError: "" });
  const [loading, setLoading] = useState(false);

  // Check for registration success message
  useEffect(() => {
    if (searchParams.get('registered')) {
      setErrors(prev => ({
        ...prev,
        serverError: "Registration successful! Please login."
      }));
    }
  }, [searchParams]);

  const validate = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", serverError: "" };

    // Validate Email
    if (!email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email.";
      isValid = false;
    }

    // Validate Password
    if (!password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrors(prev => ({
          ...prev,
          serverError: "Invalid email or password."
        }));
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        serverError: "An error occurred. Please try again."
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-300">
      <div className="card w-96 shadow-xl border border-slate-50/[.22] bg-secondary/[.11]">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>

            {/* Server Error Message */}
            {errors.serverError && (
              <div className={`alert ${errors.serverError.includes('successful') ? 'alert-success' : 'alert-error'}`}>
                <span>{errors.serverError}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="form-control mt-4">
              <button 
                type="submit" 
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center mt-4">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
