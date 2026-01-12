import * as React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "/assets/images/logo.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignupValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
/* ---------------- Component ---------------- */
const Signin = () => {
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const isloading = false;
  function onSubmit(values: z.infer<typeof SignupValidation>) {
    console.log("Form Submitted", values);
  }

  return (
    <Form {...form}>
      <div className="sm:w-[340px] flex-center flex-col">
        <img src={logo} alt="" />
        <h1 className="text-light-3 small-medium md:base-regular mt-2">
          Login to Your Account
        </h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full  space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="enter email" {...field} />
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
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="give a strong"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isloading ? (
              <div className="flex gap-3 shad-button-secoundary">
                <Loader />
                Creating....
              </div>
            ) : (
              "Signup"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2 cursor-pointer">
            Dont Have an account?
            <Link
              to="/signup"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default Signin;
