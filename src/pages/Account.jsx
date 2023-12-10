import { useForm } from "react-hook-form";
import { useUser } from "../features/authentication/useUser";
import FileInput from "../ui/FileInput";
import InnerForm from "../ui/InnerForm";
import InnerInput from "../ui/InnerInput";
import InnerLabelInputDiv from "../ui/InnerLabelInputDiv";
import Title from "../ui/Title";
import { useUpdateUser } from "../features/authentication/useUpdateUser";
import toast from "react-hot-toast";

function Account() {
  const {
    email,
    user_metadata: { fullName },
  } = useUser();
  const { register, handleSubmit, setValue } = useForm();

  const { updateCurrentUser, isUpdatingUser } = useUpdateUser();

  function onSubmit(data) {
    if (!data.fullName) return;
    updateCurrentUser(
      { fullName: data.fullName, avatar: data?.avatar && data?.avatar[0] },
      {
        onSuccess: () => {
          toast.success("User data successfully updated");
          setValue("avatar", null);
        },
        onError: () => {
          toast.success("Error updating user data");
          setValue("avatar", null);
        },
      }
    );
  }
  return (
    <div>
      <Title as="h1">Account</Title>

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
          Update user account
        </h5>

        <InnerForm
          isLoading={isUpdatingUser}
          btnName={"Update account"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <InnerLabelInputDiv>
            <label>Email address</label>
            <InnerInput value={email} disabled={true} />
          </InnerLabelInputDiv>
          <InnerLabelInputDiv>
            <label>Full Name</label>
            <InnerInput
              type="text"
              defaultValue={fullName}
              {...register("fullName")}
              disabled={isUpdatingUser}
            />
          </InnerLabelInputDiv>
          <InnerLabelInputDiv>
            <label>Avatar image</label>
            <FileInput
              type="file"
              accept="image/*"
              {...register("avatar")}
              disabled={isUpdatingUser}
            />
          </InnerLabelInputDiv>
        </InnerForm>
      </div>
    </div>
  );
}

export default Account;
