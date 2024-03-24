"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
export default function LoginPage() {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.log(error.message);
    } else {
      router.push("/dashboard");
      console.log("Success");
    }
  };

  return (
    <div className="container flex flex-col">
      <Card className="mt-28">
        <CardHeader>Login</CardHeader>
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
            <Button type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>
      <p>
        {"Don't"} have an account? Sign up{" "}
        <a href="/signup" className="text-primary underline">
          here
        </a>
      </p>
    </div>
  );
}
