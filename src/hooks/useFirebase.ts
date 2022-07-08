import { firestore } from "config/firebase";
import { Post, PostDoc } from "config/interfaces";
import { collection, addDoc, deleteDoc, updateDoc, doc, DocumentData } from "firebase/firestore";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { DataOptions } from "react-firebase-hooks/firestore/dist/firestore/types";

const COLLECTION_NAME = "posts";
const collectionRef = collection(firestore, COLLECTION_NAME);
const streamOptions: DataOptions<DocumentData> = {
  snapshotListenOptions: { includeMetadataChanges: true },
};

export const useMutations = () => {
  const createPost = async (todo: Post) => {
    const docRef = await addDoc(collectionRef, todo);
    return docRef;
  };

  const updatePost = async (docId: string, todo: Post) => {
    const docRef = doc(firestore, COLLECTION_NAME, docId);
    await updateDoc(docRef, todo as any);
  };

  const deletePost = (docId: string) => {
    const docRef = doc(firestore, COLLECTION_NAME, docId);
    deleteDoc(docRef);
  };

  return { createPost, updatePost, deletePost };
};

export const useCollectionDetails = () => {
  const [value, loading, error] = useCollection(collectionRef, streamOptions);
  const documents = value?.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as PostDoc[];

  return { documents, loading, error };
};

export const useDocumentDetails = (docId: string) => {
  const docRef = doc(firestore, COLLECTION_NAME, docId);
  const [value, loading, error] = useDocumentData(docRef, streamOptions);

  return { value, loading, error };
};
