import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/images/logo.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { AUTH_USER_ID_KEY, getUserIdFromToken } from "@/hooks/useAuthUserId";
import { login } from "@/api/api";

const Signin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginValidation>) {
    try {
      setIsLoading(true);

      const data = await login(values);

      // Save token temporarily
      localStorage.setItem("token", data.token);
      const userId = getUserIdFromToken(data.token);
      if (userId) {
        localStorage.setItem(AUTH_USER_ID_KEY, userId);
      }
      window.dispatchEvent(new Event("auth-changed"));

      // Redirect after success
      navigate("/home");

    } catch (error: any) {
      const message =
        error?.message || "Login failed. Please try again.";
      form.setError("email", { message });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-[340px] flex-center flex-col">
        <img src={logo} className="w-[40%]" alt="Aura Logo" />
        <h1 className="text-light-3 small-medium md:base-regular mt-2">
          Login to Your Account
        </h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="shad-button_primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex gap-3">
                <Loader />
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don’t have an account?
            <Link
              to="/signup"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Create account
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default Signin;
