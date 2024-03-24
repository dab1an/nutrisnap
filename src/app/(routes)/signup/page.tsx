"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FormEvent, useState } from "react";
export default function LoginPage() {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.log(error.message);
    } else {
      console.log("Success");
      setSuccess(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };
  return (
    <div className="container flex flex-col">
      <Card className="mt-28">
        <CardHeader>Sign Up</CardHeader>
        <CardContent>
          <form
            action="submit"
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-3"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email..."
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password..."
            />
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password..."
            />
            {success && (
              <p className="text-green-500">
                Success! Check your email for validation!
              </p>
            )}
            <Button type="submit">Sign Up</Button>
          </form>
        </CardContent>
      </Card>
      <p>
        Already have an account? Login{" "}
        <a href="/login" className="text-primary underline">
          here
        </a>
      </p>
    </div>
  );
}
