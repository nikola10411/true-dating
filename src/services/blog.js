import firebaseApp from '../configs/firebase';
// import { API_URL } from 'enums';

import { getDoc, getDocs, collection, orderBy, query, doc, where, addDoc, getFirestore } from 'firebase/firestore';
import { getDateTime } from '../utils/date';
import { deleteFileFromURL } from './storage';

const BLOGS = 'blogs';


const firestore = getFirestore(firebaseApp)

export const addBlog = (blog) => addDoc(collection(firestore, BLOGS), { createdAt: new Date(), ...blog })

export const getBlog = async (id) => {
  if (!id) return;
  const docRef = doc(firestore, BLOGS, id)
  const blogData = (await getDoc(docRef)).data();
  return blogData
    ? {
        ...blogData,
        createdAt: getDateTime(blogData.createdAt),
      }
    : blogData;
};

export const getBlogBySlug = async (slug) => {
  if (!slug) return;
  const q = query(collection(firestore, BLOGS), where('seoTitle', '==', slug))
  const blogData = (await getDocs(q)).docs.map((doc) => {
    const blogData = doc.data();
    return {
      ...blogData,
      id: doc.id,
      createdAt: getDateTime(blogData.createdAt),
      updatedAt: getDateTime(blogData.updatedAt),
    };
  });

  if (blogData.length > 0) {
    return blogData[0]
  }
  return null;
}

export const getAllBlogs = async () => {
  const q = query(collection(firestore, BLOGS), orderBy('createdAt', 'asc'))
  const blogData = (await getDocs(q)).docs.map((doc) => {
    const blogData = doc.data();
    console.log(blogData)
    return {
      ...blogData,
      id: doc.id,
      createdAt: getDateTime(blogData.createdAt),
      updatedAt: getDateTime(blogData.updatedAt),
    };
  });

  return blogData
}

export const updateBlog = ({ id, ...blogDetails }) =>
  firestore.doc(`${BLOGS}/${id}`).update(
    {
      ...blogDetails,
      updatedAt: new Date(),
    }
  );

export const deleteBlogs = (blogs) => {
  if (!blogs) return;

  const batch = firestore.batch();
  blogs.forEach((blog) => {
    const { id, imgUrl } = blog;
    const blogRef = firestore.doc(`blogs/${id}`);
    if (blogRef) {
      batch.delete(blogRef);
      if (imgUrl) {
        deleteFileFromURL(imgUrl);
      }
    }
  });
  return batch.commit();
};

// export const addCommentToBlog = (users, blogId) =>
//   Promise.all(
//     users.map((user) =>
//       fetch(`${API_URL}/inviteUser`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           user,
//           blogId,
//         }),
//       })
//     )
//   ).catch((err) => console.log(err));
