import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../firebase.js";

export async function handleUploadImage(image, reqFunc, isEdit) {
  if (isEdit) {
    if (image == null) {
      reqFunc();
      return;
    }
  }
  if (image == null) {
    reqFunc(
      "https://firebasestorage.googleapis.com/v0/b/fast-recipe-7aa79.appspot.com/o/recipe_image%2Fno-image.png?alt=media&token=dcbede3d-a115-4785-bfb9-1d91054b277f"
    );
    return;
  }
  const imageRef = ref(storage, `images/${image.name + v4()}`);
  await uploadBytes(imageRef, image).then((snapshot) => {
    getDownloadURL(snapshot.ref)
      .then((url) => {
        return url;
      })
      .then((url) => reqFunc(url));
  });
}
