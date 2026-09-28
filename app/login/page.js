"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardBody, Button, Input, Alert } from "@/components/ui";
import { getErrorMessage } from "@/lib/errors";
import { GraduationCap, Mail, Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Student login — production grade (task.md):
 * premium UI, inline field validation, submit loading state,
 * server errors shown inline. Token stays in storage + auth
 * header — never in URLs.
 */
export default function LoginPage() {
  const [email, setEmail] = useState("arju.kr@student.local");
  const [password, setPassword] = useState("Student@1234");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState("");
  const { login, loading } = useAuth();
  const router = useRouter();

  const validate = () => {
    const errors = { email: "", password: "" };
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!EMAIL_RE.test(email.trim())) {
      errors.email = "Enter a valid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setFieldErrors(errors);
    return !errors.email && !errors.password;
  };

  const submit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;
    try {
      await login({ email: email.trim(), password });
      router.push("/student");
    } catch (err) {
      setServerError(getErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-[#f8fafc] to-violet-50 dark:from-[#0B1120] dark:via-[#0B1120] dark:to-indigo-950/40 relative overflow-hidden">
      {/* decorative blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-300/30 dark:bg-indigo-600/10 rounded-full blur-3xl" aria-hidden />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-violet-300/30 dark:bg-violet-600/10 rounded-full blur-3xl" aria-hidden />

      <div className="w-full max-w-md relative">
        <Card className="shadow-xl border-slate-200/70 dark:border-[#243044]">
          <CardBody className="space-y-5 p-6 sm:p-8">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/25">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-bold mt-4 text-slate-900 dark:text-white">Student ERP</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sign in to your academic portal</p>
            </div>

            {serverError && (
              <Alert variant="error" role="alert">
                {serverError}
              </Alert>
            )}

            <form onSubmit={submit} noValidate className="space-y-4">
              <Input
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="you@school.edu"
                icon={Mail}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: "" }));
                }}
                error={fieldErrors.email}
              />
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  icon={Lock}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: "" }));
                  }}
                  error={fieldErrors.password}
                  inputClassName="pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 min-h-[24px] min-w-[24px] flex items-center justify-center"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Button className="w-full" size="lg" loading={loading} type="submit">
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </form>

            <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5" />
              Secured with encrypted session tokens
            </p>
          </CardBody>
        </Card>
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4">
          Facing trouble? Contact your class teacher.
        </p>
      </div>
    </div>
  );
}
