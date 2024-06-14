import { jwtDecode } from "jwt-decode";
import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password, role }) {
  // An inelegant way to prevent loss of current session without using supabase service_key...
  const { data: currentSession } = await supabase.auth.getSession();

  const { data: userData, error: createUserError } = await supabase.auth.signUp(
    {
      email,
      password,
      options: { data: { fullName, avatar: "" } },
    }
  );

  if (createUserError) {
    console.log(createUserError.message);
    throw new Error(createUserError.message);
  }

  // Set back the session after signup
  const { error: setSessionError } = await supabase.auth.setSession(
    currentSession.session
  );

  // Get the user data from signup to create a new profile and add role

  const { user_metadata: user, id } = userData.user;

  const userProfile = {
    fullName: user.fullName,
    avatar: user.avatar,
    email: user.email,
    user_id: id,
    is_admin: role === "admin",
  };

  if (setSessionError) {
    console.log(setSessionError.message);
    throw new Error(setSessionError.message);
  }

  // Create a profile for the user
  const { error: createProfileError } = await supabase
    .from("profiles")
    .insert([userProfile]);

  if (createProfileError) {
    console.log(createProfileError.message);
    throw new Error(createProfileError.message);
  }

  return userData;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  const token = session.session.access_token;

  const decodedToken = jwtDecode(token);

  console.log(decodedToken);

  const isAdmin = decodedToken.user_metadata.admin ?? false;

  return isAdmin ? { ...data.user, isAdmin } : data.user;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: uploadAvatarError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadAvatarError) throw new Error(uploadAvatarError.message);

  const { data: updatedUser, error: updateAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateAvatarError) throw new Error(updateAvatarError.message);

  return updatedUser;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error("Error logging out");
}

export async function getAllUsers() {
  const { data: users, error } = await supabase.from("profiles").select("*");

  if (error) throw new Error("Failed to fetch all users");

  return users;
}
