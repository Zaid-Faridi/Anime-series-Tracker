import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { auth, storage } from '../../config/firebase';

export const uploadAvatar = async (userId: string, imageUri: string) => {
  if (!userId) throw new Error("User must be authenticated");

  try {
    // 1. Fetch the image data from the local URI
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // 2. Create a reference to the storage location
    const storageRef = ref(storage, `avatars/${userId}`);

    // 3. Upload the blob
    await uploadBytes(storageRef, blob);

    // 4. Get the download URL
    const downloadURL = await getDownloadURL(storageRef);

    // 5. Update Firebase Auth Profile
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        photoURL: downloadURL
      });
    }

    return downloadURL;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
};

export const updateDisplayName = async (displayName: string) => {
  if (!auth.currentUser) throw new Error("User must be authenticated");
  
  try {
    await updateProfile(auth.currentUser, {
      displayName
    });
    return true;
  } catch (error) {
    console.error("Error updating display name:", error);
    throw error;
  }
};
