"use client"

import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function SignInPage() {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-purple-100">
            <div className="hidden md:flex items-center justify-center bg-purple-200 p-10">
                <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-purple-300">
                    <Image
                        src="/login.png"
                        alt="Login illustration"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            <div className="flex items-center justify-center p-6 md:p-12 bg-white">
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-purple-800">Welcome Back</h2>
                        <p className="mt-2 text-purple-600">Sign in to continue your magical journey ✨</p>
                    </div>

                    <div className="rounded-xl border border-purple-200 bg-purple-50/30 shadow-md p-6">
                       <SignIn
                        signUpUrl="/sign-up"
  appearance={{
    elements: {
      formButtonPrimary: "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
      card: "shadow-none bg-transparent",
    },
    variables: {
      colorPrimary: "#7e22ce",
    },
  }}
/>
                    </div>
                </div>
            </div>
        </div>
    )
}
