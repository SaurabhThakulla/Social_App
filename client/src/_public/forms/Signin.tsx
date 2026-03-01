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

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        form.setError("email", {
          message: data.error || "Login failed",
        });
        return;
      }

      // Save token temporarily
      localStorage.setItem("token", data.token);

      // Redirect after success
      navigate("/home");

    } catch (error) {
      console.error(error);
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