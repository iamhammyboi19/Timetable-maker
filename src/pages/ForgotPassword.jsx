import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../ui/Button";
import DescriptionInForm from "../ui/DescriptionInForm";
import Form from "../ui/Form";
import Input from "../ui/Input";
import FormErrorMessage from "../ui/FormErrorMessage";
import SmallSpinner from "../ui/SmallSpinner";
import { useForgotPassword } from "../features/authentication/useForgotPassword";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { mutate, isLoading } = useForgotPassword();

  function onSubmit(data) {
    console.log(data);
    mutate(
      { ...data },
      {
        onSuccess: () => {
          setValue("email", "");
        },
      }
    );
  }

  return (
    <div style={{ paddingLeft: "3rem", paddingRight: "3rem" }}>
      <Form type="login" onSubmit={handleSubmit(onSubmit)}>
        <DescriptionInForm>
          Enter the email address linked to your timetable maker account to
          reset your password
        </DescriptionInForm>
        <div style={{ width: "100%", marginBottom: "2rem", marginTop: "2rem" }}>
          <Input
            placeholder="Email"
            type="email"
            disabled={isLoading}
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

        <Button name="Log in" disabled={isLoading}>
          Continue
          {isLoading && <SmallSpinner />}
        </Button>
        <DescriptionInForm fade="yes">
          Do not have an account?{" "}
          <span style={{ color: "#4d4d4d", textDecoration: "underline" }}>
            <Link to="/signup" disabled={isLoading}>
              Sign up
            </Link>
          </span>
        </DescriptionInForm>
      </Form>
    </div>
  );
}
// disabled={isLoggingUser} disabled={isLoggingUser}

export default ForgotPassword;
