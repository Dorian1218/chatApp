import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { UserAuth } from "./AuthContext";

export async function upload(file, user, setLoading) {
    const fileRef = ref(storage, "images/" + user.uid + "png")
    const snapshot = await uploadBytes(fileRef, file)
    setLoading(true)
    const photoURL = await getDownloadURL(fileRef)
    updateProfile(user, {photoURL: photoURL})
}