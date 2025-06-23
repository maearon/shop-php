// app/signup/page.tsx
"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import flashMessage from "@/components/shared/flashMessages";
import ShowErrors, { ErrorMessageType } from "@/components/shared/errorMessages";
import Link from "next/link";
import { useSignupMutation } from "@/api/hooks/useSignupMutation";

const SignupPage = () => {
  const router = useRouter();
  const signupMutation = useSignupMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<ErrorMessageType>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    signupMutation.mutate(formData, {
      onSuccess: (response: any) => {
        if (response.success) {
          flashMessage("success", response.message || "Signup successful.");
          router.push("/account-login");
        } else if (response.errors) {
          setErrors(response.errors);
        }
      },
      onError: (error: any) => {
        const res = error.response?.data;

        if (Array.isArray(res?.errors)) {
          const fieldErrors: ErrorMessageType = {};

          res.errors.forEach((err: any) => {
            const field = err?.cause?.field || "general";
            const message = err.defaultMessage || "Invalid input";

            if (!fieldErrors[field]) fieldErrors[field] = [];
            fieldErrors[field].push(message);
          });

          setErrors(fieldErrors);
        } else if (res?.message) {
          setErrors({ general: [res.message] });
        } else {
          flashMessage("error", "Something went wrong during signup.");
        }
      },
    });
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(errors).length > 0 && <ShowErrors errorMessage={errors} />}

        {errors.general && (
          <div className="text-red-600 text-sm bg-red-50 p-2 border border-red-300 rounded">
            {errors.general.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block font-medium">Name</label>
          <input
            className="form-control w-full"
            type="text"
            name="name"
            id="name"
            autoComplete="off"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium">Email</label>
          <input
            className="form-control w-full"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-medium">Password</label>
          <input
            className="form-control w-full"
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password_confirmation" className="block font-medium">Password Confirmation</label>
          <input
            className="form-control w-full"
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={signupMutation.isPending}
        >
          {signupMutation.isPending ? "Creating..." : "Create my account"}
        </button>

        <div className="mt-3 text-sm text-gray-600">
          Didn't get your activation email?{" "}
          <Link href="/account_activations/new" className="underline text-blue-600">
            Resend activation
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
