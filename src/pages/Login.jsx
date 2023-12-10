import { Link } from "react-router-dom";
import Button from "../ui/Button";
import DescriptionInForm from "../ui/DescriptionInForm";
import Form from "../ui/Form";
import Input from "../ui/Input";
import Title from "../ui/Title";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../ui/FormErrorMessage";
import { useLogin } from "../features/authentication/useLogin";
import SmallSpinner from "../ui/SmallSpinner";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { loginUser, isLoggingUser } = useLogin();

  function onSubmit(data) {
    loginUser(
      { ...data },
      {
        onSuccess: () => {
          setValue("email", "");
          setValue("password", "");
        },
      }
    );
  }

  return (
    <Form type="login" onSubmit={handleSubmit(onSubmit)}>
      <Title as="h1">Log in to your account</Title>
      <div style={{ width: "100%", marginBottom: "2rem" }}>
        <Input
          placeholder="Email"
          type="email"
          disabled={isLoggingUser}
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
          disabled={isLoggingUser}
          type="password"
          {...register("password", {
            required: "Please enter your password",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        <span
          style={{
            color: "#4d4d4d",
            textDecoration: "underline",
            fontSize: "1.3rem",
            marginLeft: "2rem",
            display: "inline-block",
            marginTop: "1rem",
          }}
        >
          <Link
            to="/forgotpassword"
            disabled={isLoggingUser}
            style={{ color: "#4d4d4d", marginRight: "1rem" }}
          >
            Forgot password?
          </Link>
        </span>
        {errors?.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </div>
      <Button name="Log in" disabled={isLoggingUser}>
        Login
        {isLoggingUser && <SmallSpinner />}
      </Button>
      <DescriptionInForm fade="yes">
        New to timetable maker?{" "}
        <span style={{ color: "#4d4d4d", textDecoration: "underline" }}>
          <Link to="/signup" disabled={isLoggingUser}>
            Sign up
          </Link>
        </span>
      </DescriptionInForm>
    </Form>
  );
}
// disabled={isLoggingUser} disabled={isLoggingUser}

export default Login;
