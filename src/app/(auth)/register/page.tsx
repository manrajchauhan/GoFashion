"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { InputField } from "./InputField";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";

interface FormData {
  name: string;
  surname: string;
  email: string;
  password: string;
  mobile: string;
}

export default function Register() {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {

    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/user/dashboard");
    }
  }, [router]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      const token = result.token;
      localStorage.setItem("authToken", token);

      // Show success toast
      toast.success("User registered successfully! 🎉", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      reset();

      setTimeout(() => {
        router.push("/user/dashboard");
      }, 5000);

    } catch (err: any) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header/>
    <div className="Sign Up">
      {/* <Link href="/">
        <img src="logo.svg" alt="Logo" width={200} height={200} className="pt-10 pl-10" />
      </Link> */}

      <div className="flex flex-row gap-[16.5rem] row-start-2 px-32">
        <div className="px-20 py-32">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
            <h1 className="text-lg text-neutral-900 font-bold">Sign Up</h1>

            <div className="flex gap-10">
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <InputField
                    {...field}
                    label="Name"
                    type="text"
                    error={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="surname"
                control={control}
                defaultValue=""
                rules={{ required: "Surname is required" }}
                render={({ field }) => (
                  <InputField
                    {...field}
                    label="Surname"
                    type="text"
                    error={errors.surname?.message}
                  />
                )}
              />
            </div>

            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <InputField
                  {...field}
                  label="Business Email"
                  type="email"
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <InputField
                  {...field}
                  label="Password"
                  type="password"
                  error={errors.password?.message}
                />
              )}
            />

            <Controller
              name="mobile"
              control={control}
              defaultValue=""
              rules={{ required: "Mobile number is required" }}
              render={({ field }) => (
                <InputField
                  {...field}
                  label="Mobile"
                  type="tel"
                  error={errors.mobile?.message}
                />
              )}
            />

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full px-3 py-2.5 text-center text-white bg-neutral-900 rounded-md"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="flex gap-2.5 items-center mt-4 w-full text-xs font-medium text-center text-neutral-900">
            <img loading="lazy" src="/line.svg" alt="" className="object-contain flex-1" />
            <span className="mx-2">OR</span>
            <img loading="lazy" src="/line.svg" alt="" className="object-contain flex-1" />
          </div>

          <div className="flex gap-0.5 items-center mt-4 text-xs text-center">
            <span className="font-medium text-neutral-900">Already have an account? </span>
            <Link href="/login" className="font-bold text-neutral-900">Login</Link>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
    <Footer/>
    </>
  );
}
