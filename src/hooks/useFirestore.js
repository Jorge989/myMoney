import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        ...state,
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case "ADDED_DOCUMENT":
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const useFirestore = (colletion) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  //colection
  const ref = projectFirestore.collection(colletion);
  // ref.add();
  //add a document
  //only dispatch is not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const adddedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addDocument });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const deleteDocument = await ref.doc(id).delete();
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: deleteDocument });
    }
  };
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);
  return { addDocument, deleteDocument, response };
};
