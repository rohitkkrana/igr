'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Registration successful
      router.push("/login?registered=true");
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-300">
      <div className="card w-96 shadow-xl border border-slate-50/[.22] bg-secondary/[.11]">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                placeholder="Enter your password"
                className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>

            {/* Confirm Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                className={`input input-bordered ${errors.confirmPassword ? 'input-error' : ''}`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
            </div>

            {/* Server Error Message */}
            {errors.submit && <span className="text-red-500 text-sm">{errors.submit}</span>}

            {/* Submit Button */}
            <div className="form-control mt-4">
              <button 
                type="submit" 
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 