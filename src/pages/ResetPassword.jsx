import { useForm } from "react-hook-form";
import { useUser } from "../features/authentication/useUser";
import InnerForm from "../ui/InnerForm";
import InnerInput from "../ui/InnerInput";
import InnerLabelInputDiv from "../ui/InnerLabelInputDiv";
import Title from "../ui/Title";
import { useUpdateUser } from "../features/authentication/useUpdateUser";
import toast from "react-hot-toast";

function Account() {
  const { email } = useUser();
  const { register, handleSubmit, setValue } = useForm();

  const { updateCurrentUser, isUpdatingUser } = useUpdateUser();

  function onSubmit(data) {
    if (!data.newpassword) return;
    updateCurrentUser(
      { ...data },
      {
        onSuccess: () => {
          toast.success("User password successfully updated");
          setValue("newpassword", "");
        },
        onError: () => {
          toast.error("Error updating user password");
          setValue("newpassword", "");
        },
      }
    );
  }
  //
  return (
    <div>
      <Title as="h1">Password update</Title>

      <div
        style={{
          maxWidth: "50rem",
          margin: "0 auto",
          border: "1px solid #d6d6d6",
          padding: "5rem",
        }}
      >
        <h5
          style={{
            marginBottom: "2rem",
            fontSize: "2rem",
            fontWeight: 500,
          }}
        >
          Reset user password
        </h5>

        <InnerForm
          isLoading={isUpdatingUser}
          btnName={"Reset password"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <InnerLabelInputDiv>
            <label>Email address</label>
            <InnerInput value={email} disabled={true} />
          </InnerLabelInputDiv>
          <InnerLabelInputDiv>
            <label>New password</label>
            <InnerInput
              type="password"
              {...register("newpassword")}
              disabled={isUpdatingUser}
            />
          </InnerLabelInputDiv>
        </InnerForm>
      </div>
    </div>
  );
}

export default Account;
