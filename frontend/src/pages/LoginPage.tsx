import { useAuthStore } from "@/store/authStore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(email, password);
    if (success) {
      navigate("/profile");
    } else {
      setError("ایمیل یا کلمه عبور اشتباه است");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold">ورود به حساب کاربری</h2>
        </div>
        <div className="">
          {error && (
            <p className="text-rose-600 text-sm mb-4 text-center">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">ایمیل</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                dir="ltr"
              />
            </div>
            <div className="">
              <label className="block text-sm font-medium mb-1">رمز عبور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                dir="ltr"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700"
            >
              ورود
            </button>
            <p className="text-center text-sm text-zinc-600 mt-4">
              حساب ندارید؟{" "}
              <Link to="/register" className="text-sky-600 hover:underline">
                ثبت‌نام کنید
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
