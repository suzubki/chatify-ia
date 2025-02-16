'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Split } from "@/components/ui/split";
import { Stack } from "@/components/ui/stack";
import { sessionStore } from "@/lib/states/session.state";
import { type LoginUserPayload, loginUserSchema } from "@/schemas/auth/auth.schema";
import { useLoginMutation } from "@/services/api/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { tryit } from "radash";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

export default function LoginPage() {
  const { login } = sessionStore();
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const [submitErrorMsg, setSubmitErrorMsg] = useState<string | null>(null);
  const { register, handleSubmit, formState } = useForm<LoginUserPayload>({
    resolver: zodResolver(loginUserSchema)
  })

  const onSubmit: SubmitHandler<LoginUserPayload> = async (data) => {
    const [error, response] = await tryit(loginMutation.mutateAsync)(data);
    if (error) {
      setSubmitErrorMsg(error.message);
      return;
    }

    setSubmitErrorMsg(null);
    const authenticatedUser = response.data
    login(authenticatedUser);
    router.push('/chat');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-xl p-8 bg-white shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-medium">Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="flex flex-col gap-4" disabled={formState.isSubmitting}>
              <Stack className="gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  autoComplete="email"
                />
                {formState.errors.email && <ErrorMessage>{formState.errors.email.message}</ErrorMessage>}
              </Stack>
              <Stack className="gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...register('password')}
                  autoComplete="current-password"
                />
                {formState.errors.password && <ErrorMessage>{formState.errors.password.message}</ErrorMessage>}
              </Stack>
              {submitErrorMsg && <ErrorMessage>We caught an error while trying to sign you in. Please review your credentials and try again.</ErrorMessage>}
              <Split className="justify-between">
                <Split className="gap-2">
                  <Checkbox id="remember-me" />
                  <Label htmlFor="remember-me" className="text-muted-foreground font-normal">
                    Remember me on this device
                  </Label>
                </Split>
                <a href="/" className="text-sm text-blue-600 hover:underline">Forgot your password?</a>
              </Split>
              <Button type="submit" size="lg">Sign in</Button>
              <div className="text-center text-sm mt-2">
                New to Chatify? <a href="/" className="text-blue-600 hover:underline">Create account</a>
              </div>
            </fieldset>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
