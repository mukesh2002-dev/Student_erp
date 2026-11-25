"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Alert, Button, Card, CardBody, Input } from "@/components/ui";
import { getErrorMessage } from "@/lib/errors";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Student sign-in.
 * Inline field validation, submit loading state, server errors shown inline.
 * Token stays in storage and the auth header — never in the URL.
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

  const submit = async (event) => {
    event.preventDefault();
    setServerError("");
    if (!validate()) return;
    try {
      await login({ email: email.trim(), password });
      router.push("/student");
    } catch (error) {
      setServerError(getErrorMessage(error));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4 py-10">
      <div className="w-full max-w-[400px]">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-ink font-mono text-[11px] font-medium text-canvas">
            SE
          </span>
          <div>
            <p className="text-[13px] font-medium leading-5 text-ink">Student ERP</p>
            <p className="text-[11px] leading-4 text-ink-muted">Academic portal · Session 2026-27</p>
          </div>
        </div>

        <Card>
          <CardBody className="space-y-5 p-6 sm:p-7">
            <div>
              <h1 className="text-lg font-medium text-ink">Sign in</h1>
              <p className="mt-1 text-[13px] text-ink-secondary">Use the account issued to you by the school.</p>
            </div>

            {serverError && <Alert variant="error">{serverError}</Alert>}

            <form onSubmit={submit} noValidate className="space-y-4">
              <Input
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="you@school.edu"
                icon={Mail}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (fieldErrors.email) setFieldErrors((previous) => ({ ...previous, email: "" }));
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
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (fieldErrors.password) setFieldErrors((previous) => ({ ...previous, password: "" }));
                  }}
                  error={fieldErrors.password}
                  inputClassName="pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-7 flex h-8 w-8 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" strokeWidth={1.5} /> : <Eye className="h-4 w-4" strokeWidth={1.5} />}
                </button>
              </div>

              <Button className="w-full" size="lg" loading={loading} type="submit">
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </form>

            <p className="border-t border-hairline pt-4 text-xs text-ink-muted">
              Trouble signing in? Contact your class teacher.
            </p>
          </CardBody>
        </Card>

        <p className="record mt-6 text-center">Demo account · credentials pre-filled</p>
      </div>
    </div>
  );
}
