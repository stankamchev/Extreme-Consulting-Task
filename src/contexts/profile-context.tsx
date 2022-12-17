import React, {
  useState,
  createContext,
  useContext,
  PropsWithChildren,
  ReactNode,
} from "react";
import { User, updateProfile, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import useGetUserProfilePicture from "../hooks/use-get-user-profile-picture";

interface ProfileContextProps {
  children: ReactNode;
}

interface UpdateUserProfileData {
  username?: string;
  imageUrl?: string;
}

interface IProfileContext {
  updateUserProfile: (
    user: User,
    { username, imageUrl }: UpdateUserProfileData
  ) => Promise<void>;

  profilePicture: string | undefined;
}

export const ProfileContext = createContext<IProfileContext>(
  {} as IProfileContext
);

export function ProfileProvider({
  children,
}: PropsWithChildren<ProfileContextProps>) {
  const [profilePicture, setProfilePicture] = useState<string>(
    "./anonymous-pic.png"
  );
  const getUserProfilePicture = useGetUserProfilePicture;

  const updateUserProfile = async (
    user: User,
    { username, imageUrl }: UpdateUserProfileData
  ) => {
    await updateProfile(user, {
      displayName: username,
      photoURL: imageUrl,
    });
    if (!imageUrl) return;
    setProfilePicture(imageUrl);
  };

  onAuthStateChanged(auth, async () => {
    const { currentUser } = auth;

    if (currentUser?.photoURL && currentUser?.uid) {
      const profilePicture = await getUserProfilePicture(currentUser.uid);
      if (profilePicture) setProfilePicture(profilePicture);
    } else {
      setProfilePicture("./anonymous-pic.png");
    }
  });

  return (
    <ProfileContext.Provider
      value={{
        updateUserProfile,
        profilePicture,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfileContext = () => useContext(ProfileContext);
