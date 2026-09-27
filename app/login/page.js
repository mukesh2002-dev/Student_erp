"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardBody, Button, Input, Alert } from "@/components/ui";
import { getErrorMessage } from "@/lib/errors";

/** Demo login — accepts any email, backed by /api/auth/login. */
export default function LoginPage() {
  const [email, setEmail] = useState("aman.kumar@student.demo");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password });
      router.push("/student");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f8fafc] dark:bg-[#0B1120]">
      <Card className="w-full max-w-md">
        <CardBody className="space-y-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center mx-auto">SE</div>
            <h1 className="text-xl font-bold mt-3">Student ERP</h1>
            <p className="text-sm text-slate-500">Demo login — any credentials work</p>
          </div>
          {error && <Alert variant="error">{error}</Alert>}
          <form onSubmit={submit} className="space-y-3">
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button className="w-full" loading={loading} type="submit">
              Sign in
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
