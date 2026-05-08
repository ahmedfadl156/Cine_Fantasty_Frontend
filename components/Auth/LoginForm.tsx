"use client";
import { useGoogleLogin, useFacebookLogin, useLogin } from "@/hooks/auth/useAuth"
import { LoginSchema, loginSchema } from "@/lib/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;

const loadFacebookSDK = (appId: string) => {
    if (typeof window === "undefined") return;
    if ((window as any).FB) return; // already loaded

    (window as any).fbAsyncInit = () => {
        (window as any).FB.init({
            appId,
            cookie: true,
            xfbml: false,
            version: "v19.0",
        });
    };

    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
};

const GoogleLoginButton = () => {
    const { mutate: googleLoginMutate, isPending } = useGoogleLogin();

    return (
        <div className="w-full">
            {isPending ? (
                <div className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-md border border-[#3a342c] bg-[#1a1612] text-[#EEE4D4] text-sm font-medium opacity-60">
                    Signing in…
                </div>
            ) : (
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        if (credentialResponse.credential) {
                            googleLoginMutate(credentialResponse.credential);
                        }
                    }}
                    onError={() => {}}
                    theme="filled_black"
                    shape="rectangular"
                    size="large"
                    width="100%"
                    text="signin_with"
                    logo_alignment="left"
                />
            )}
        </div>
    );
};

const LoginForm = () => {
    const [visible, setVisible] = useState(false);
    const { mutate: login, isPending } = useLogin();
    const { mutate: facebookLoginMutate, isPending: isFacebookPending } = useFacebookLogin();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" }
    });

    useEffect(() => {
        if (FACEBOOK_APP_ID) loadFacebookSDK(FACEBOOK_APP_ID);
    }, []);

    const onSubmit = (data: LoginSchema) => login(data);

    const handleFacebookLogin = () => {
        if (!(window as any).FB) {
            alert("Facebook SDK is still loading, please try again in a moment.");
            return;
        }
        (window as any).FB.login(
            (response: any) => {
                if (response.authResponse?.accessToken) {
                    facebookLoginMutate(response.authResponse.accessToken);
                }
            },
            { scope: "public_profile,email" }
        );
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-4">
                <h1 className="text-6xl font-bold text-primary">CGM</h1>
                <div className="flex items-center gap-2">
                    <div className="w-20 md:w-32 lg:w-40 h-0.5 bg-[#9C8E7E]"></div>
                    <p className="text-base font-medium text-[#9C8E7E]">Bureau of cinema</p>
                    <div className="w-20 md:w-32 lg:w-40 h-0.5 bg-[#9C8E7E]"></div>
                </div>
            </div>

            <div className="flex flex-col items-start justify-start w-full max-w-md gap-2 mt-10">
                <h1 className="italic text-[#EEE4D4] text-4xl tracking-wide">Welcome back</h1>
                <p className="text-md text-[#9C8E7E]">Enter your credentials to access the vault.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start justify-start w-full max-w-md gap-4 mt-12">
                <div className="flex flex-col items-start justify-start w-full gap-2">
                    <label htmlFor="email" className="text-md text-[#EEE4D4]">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        {...register("email")}
                        placeholder="cinematic@gmail.com"
                        className="w-full text-[#EEE4D4] placeholder-[#2D2924] focus:outline-none border-b border-b-[#9C8E7E] py-3 px-2"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div className="relative flex flex-col items-start justify-start w-full gap-2 mt-10">
                    <label htmlFor="password" className="text-md text-[#EEE4D4]">Password</label>
                    <input
                        type={visible ? "text" : "password"}
                        id="password"
                        {...register("password")}
                        placeholder="********"
                        className="w-full text-[#EEE4D4] placeholder-[#2D2924] focus:outline-none border-b border-b-[#9C8E7E] py-3 px-2"
                    />
                    <button
                        type="button"
                        onClick={() => setVisible(!visible)}
                        className="absolute right-4 top-12 text-[#5c554d] hover:text-[#9c8e7e] transition-colors"
                    >
                        {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full px-4 py-[14px] mt-10 cursor-pointer text-lg font-medium rounded-md bg-primary text-[#EEE4D4] hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 transition-opacity"
                >
                    {isPending ? "Logging in..." : "Login"}
                </button>
            </form>

            {/* ── Divider ── */}
            <div className="flex items-center w-full max-w-md gap-3 mt-8">
                <div className="flex-1 h-px bg-[#3a342c]" />
                <span className="text-xs text-[#5c554d] tracking-widest uppercase">or continue with</span>
                <div className="flex-1 h-px bg-[#3a342c]" />
            </div>

            {/* ── Social buttons ── */}
            <div className="flex flex-col w-full max-w-md gap-3 mt-4">

                {/* Google — uses GoogleLogin component (returns id_token, not access_token) */}
                {GOOGLE_CLIENT_ID && (
                    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                        <GoogleLoginButton />
                    </GoogleOAuthProvider>
                )}

                {/* Facebook — only shown when App ID is configured */}
                {FACEBOOK_APP_ID && (
                    <button
                        type="button"
                        id="facebook-login-btn"
                        onClick={handleFacebookLogin}
                        disabled={isFacebookPending}
                        className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-md border border-[#3a342c] bg-[#1a1612] hover:bg-[#221e19] text-[#EEE4D4] text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                fill="#1877F2"
                                d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.884v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
                            />
                        </svg>
                        {isFacebookPending ? "Signing in…" : "Sign in with Facebook"}
                    </button>
                )}
            </div>

            <div className="flex items-center justify-center w-full max-w-md gap-2 mt-8">
                <p className="text-md text-[#9C8E7E]">Don't have an account?</p>
                <Link href="/signup" className="text-md text-primary">Join now</Link>
            </div>
            <p className="text-center text-sm text-[#9C8E7E] mt-16">© 2026 CINEMAGM ARCHIVE. ALL RIGHTS RESERVED.</p>
        </div>
    )
}

export default LoginForm;