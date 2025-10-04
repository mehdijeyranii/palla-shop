import { useAuthStore } from "@/store/authStore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("رمز عبور باید حداقل 6 کاراکتر باشد");
      return;
    }
    const success = register(name, email, password);
    if (success) {
      navigate("/");
    } else {
      setError("این ایمیل قبلا ثبت شده است");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold">ثبت‌نام</h2>
        </div>
        <div className="">
          {error && (
            <p className="text-rose-600 text-sm mb-4 text-center">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">نام کامل</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div>
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
              ثبت‌نام
            </button>
            <p className="text-center text-sm text-zinc-600 mt-4">
              قبلاً حساب دارید؟{" "}
              <Link to="/login" className="text-sky-600 hover:underline">
                وارد شوید
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
