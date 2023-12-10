import supabase from "./supabase";
import { supabaseUrl } from "./supabaseUrl";

// all can be referred to supabase javascript client session docs

// SIGNUP USER
export async function createUserAccount({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
        userRole: "user",
        timetables: [],
      },
    },
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  //   "Error creating new user. Please try again"

  return data;
}

// LOGIN USER
export async function loginUserAccount({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("login", data);

  if (error) {
    console.log(error);
    throw new Error(error?.message);
  }

  return data;
}

// GET CURRENT USER
export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) return null;

  //   can only get current user if there is a session returned
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data?.user;
}

// UPDATE USER'S TIMETABLE DATA AS LONG AS ANY CHANGES/UPDATE IS MADE TO IT
export async function updateUserTimetableData(timetables) {
  const { data, error } = await supabase.auth.updateUser({
    data: { timetables },
  });

  if (error) {
    console.log(error);
    throw new Error("Error updating your timetable");
  }

  return data;
}

// LOGOUT USER
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

// UPDATE USER NAME OR (AND) AVATAR
export async function updateUser({ fullName, avatar, newpassword }) {
  // check if fullName exists then proceed to update it
  let userData = {};
  if (fullName) userData = { data: { fullName } };
  if (newpassword) userData.password = newpassword;

  const { data, error } = await supabase.auth.updateUser(userData);

  console.log(data, "data");

  if (error) throw new Error(error.message);

  // if user did not plan to update avatar return instantly
  if (!avatar) return data;

  // make a unique fileName for each avatar upload
  const fileName = `student_avatar-${
    "id" + Math.random().toString(16).slice(2)
  }`;

  // upload the file to supabase storage bucket
  const { error: uploadError } = await supabase.storage
    .from("student_avatar")
    .upload(fileName, avatar);

  // if there is an upload error throw
  if (uploadError) throw new Error(uploadError.message);

  // now update the current user with the same file name to tally with the uploaded avatar
  const { data: finalData, error: updateAvatarError } =
    await supabase.auth.updateUser({
      data: {
        // https://odtijfuiuuxjrqvipqxf.supabase.co/storage/v1/object/public/student_avatar/1200px-Near_East_University.svg.png
        // needs to look like something like this 👆🏾
        avatar: `${supabaseUrl}/storage/v1/object/public/student_avatar/${fileName}`,
      },
    });

  // if error updating avatar
  if (updateAvatarError) throw new Error(updateAvatarError.message);

  return finalData;
}

// having troubles with supabase password reset auth
// going through the nodejs way
// export async function forgotpassword({ email }) {
//   const token_id = `${"id" + Math.random().toString(16).slice(2)}`;

//   // token expires in 10mins
//   const expires_at = Date.now() + 600000;

//   const { error: resetTokenError } = await supabase
//     .from("reset_password_token")
//     .insert([{ user_email: email, token_id, expires_at }])
//     .select();

//   if (resetTokenError) throw new Error("Error creating token id");

//   const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
//     redirectTo: `/resetpassword?tokenid=${token_id}`,
//   });

//   if (error) throw new Error(error.message);

//   return data;
// }

export async function resetpassword({ token_id, password }) {
  const { data, error } = await supabase
    .from("reset_password_token")
    .select("*")
    .eq("token_id", token_id)
    .single();

  if (error) throw new Error(error.message);

  if (data.expires_at < Date.now()) {
    throw new Error(
      "Token already expired please request for a new password reset token"
    );
  }
}

export async function forgotpassword({ email }) {
  let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "/account",
  });

  if (error) throw new Error(error.message);

  return data;
}
