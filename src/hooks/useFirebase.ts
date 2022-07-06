import { firestore } from "config/firebase";
import { Todo } from "config/interfaces";
import { collection, addDoc, updateDoc, doc, DocumentData } from "firebase/firestore";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { DataOptions } from "react-firebase-hooks/firestore/dist/firestore/types";

const COLLECTION_NAME = "todos";
const collectionRef = collection(firestore, COLLECTION_NAME);
const streamOptions: DataOptions<DocumentData> = {
  snapshotListenOptions: { includeMetadataChanges: true },
};

export const useMutations = () => {
  const addTodo = async (todo: Todo) => {
    const docRef = await addDoc(collectionRef, todo);
    return docRef;
  };

  const updateTodo = async (docId: string, todo: Todo) => {
    const docRef = doc(firestore, COLLECTION_NAME, docId);
    await updateDoc(docRef, todo as any);
  };

  return { addTodo, updateTodo };
};

export const useCollectionDetails = () => {
  const [value, loading, error] = useCollectionData(collectionRef, streamOptions);

  return { value, loading, error };
};

export const useDocumentDetails = (docId: string) => {
  const docRef = doc(firestore, COLLECTION_NAME, docId);
  const [value, loading, error] = useDocumentData(docRef, streamOptions);

  return { value, loading, error };
};
