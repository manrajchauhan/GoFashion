"use client";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InputField } from "./InputField";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";

export default function Login() {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/user/dashboard");
    }
  }, [router]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("authToken", result.token);
        toast.success("Login Successful! 🎉");
        router.push("/user/dashboard");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Header/>
    <div className="login">
      {/* <Link href="/">
        <img src="logo.svg" width={200} height={200} className="pt-10 pl-10" />
      </Link> */}
      <div className="flex flex-row gap-[16.5rem] row-start-2 px-32">
        <div className="left px-20 py-32">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
            <h1 className="text-lg text-neutral-900 font-bold">Sign In</h1>

            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <InputField {...field} label="Email" type="email" placeholder="Enter Email Address" error={errors.email?.message?.toString()} />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <InputField {...field} label="Password" type="password" placeholder="Enter Password" error={errors.email?.message?.toString()} />
              )}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full px-3 py-2.5 text-center text-white bg-neutral-900 rounded-md"
            >
              {isLoading ? "Logging in..." : "Sign In"}
            </button>
          </form>

          <div className="flex gap-2.5 items-center mt-4 w-full text-xs font-medium text-center text-neutral-900">
            <img loading="lazy" src="/line.svg" alt="" className="object-contain flex-1" />
            <span className="mx-2">OR</span>
            <img loading="lazy" src="/line.svg" alt="" className="object-contain flex-1" />
          </div>

          <div className="flex gap-0.5 items-center mt-4 text-xs text-center">
            <span className="font-medium text-neutral-900">Don't have an account? </span>
            <Link href="/register" className="font-bold text-neutral-900">Register</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    <Footer/>
    </>
  );
}
