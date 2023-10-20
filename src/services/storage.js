import firebaseApp from '../configs/firebase';
import { cuuid } from '../utils/cuuid';
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

const storage = getStorage(firebaseApp)

export const uploadFile = async (file, path) => {
  if (!file || !path) {
    throw Error('Missing file or path');
  }

  const storageRef = ref(storage, `${path}/${cuuid()}`);

  // 'file' comes from the Blob or File API
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef)

  return url;
};


export const deleteFileFromURL = (fileURL) => storage.refFromURL(fileURL).delete();
