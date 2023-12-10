import { Link } from "react-router-dom";
import Button from "../ui/Button";
import DescriptionInForm from "../ui/DescriptionInForm";
import Form from "../ui/Form";
// import Input from "../ui/Input";
import { useForm } from "react-hook-form";
// import FormErrorMessage from "../ui/FormErrorMessage";
import SmallSpinner from "../ui/SmallSpinner";
import { useResetPassword } from "../features/authentication/useResetPassword";

function ResetPassword() {
  const {
    // register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useResetPassword();

  function onSubmit() {
    mutate();
  }

  return (
    <Form type="login" onSubmit={handleSubmit(onSubmit)}>
      <DescriptionInForm>
        Enter a new password in the prompt window for your timetable maker
        account
      </DescriptionInForm>

      {/* <div style={{ width: "100%", marginBottom: "2rem", marginTop: "2rem" }}>
        <Input
          placeholder="Password"
          disabled={isLoading}
          type="password"
          {...register("newPassword", {
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
      </div> */}
      <Button name="Log in" disabled={isLoading}>
        Reset password
        {isLoading && <SmallSpinner />}
      </Button>
      <DescriptionInForm fade="yes">
        New to timetable maker?{" "}
        <span style={{ color: "#4d4d4d", textDecoration: "underline" }}>
          <Link to="/signup" disabled={isLoading}>
            Sign up
          </Link>
        </span>
      </DescriptionInForm>
    </Form>
  );
}
// disabled={isLoggingUser} disabled={isLoggingUser}

export default ResetPassword;
