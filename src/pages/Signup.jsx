import Form from "../ui/Form";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Title from "../ui/Title";
import DescriptionInForm from "../ui/DescriptionInForm";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../ui/FormErrorMessage";
import { useSignup } from "../features/authentication/useSignup";
import SmallSpinner from "../ui/SmallSpinner";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isSigningupUser, signupUser } = useSignup();

  function onSubmit(data) {
    signupUser({ ...data });
  }

  return (
    <div style={{ paddingLeft: "3rem", paddingRight: "3rem" }}>
      <Form type="signup" onSubmit={handleSubmit(onSubmit)}>
        <Title as="h4">Timetable Maker</Title>
        <DescriptionInForm fade="no">
          Start making your timetable with us
        </DescriptionInForm>
        <Title as="h1">Signup an account</Title>
        <div style={{ width: "100%", marginBottom: "2rem" }}>
          <Input
            type="text"
            placeholder="Full Name"
            disabled={isSigningupUser}
            {...register("fullName", {
              required: "Please enter your full name",
            })}
          />
          {errors?.fullName && (
            <FormErrorMessage>{errors.fullName.message}</FormErrorMessage>
          )}
        </div>
        <div style={{ width: "100%", marginBottom: "2rem" }}>
          <Input
            placeholder="Email"
            type="email"
            disabled={isSigningupUser}
            {...register("email", {
              required: "Please enter your email address",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
          {errors?.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </div>

        <div style={{ width: "100%", marginBottom: "2rem" }}>
          <Input
            placeholder="Password"
            type="password"
            disabled={isSigningupUser}
            {...register("password", {
              required: "Please enter your password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors?.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </div>
        <Button name="Sign up" disabled={isSigningupUser}>
          Sign up
          {isSigningupUser && <SmallSpinner />}
        </Button>
        <DescriptionInForm fade="yes">
          Already have an account?{" "}
          <span style={{ color: "#4d4d4d", textDecoration: "underline" }}>
            <Link to="/login" disabled={isSigningupUser}>
              Sign in
            </Link>
          </span>
        </DescriptionInForm>
      </Form>
    </div>
  );
}

export default Signup;
