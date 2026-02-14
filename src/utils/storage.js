// src/utils/storage.js

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

const jobsRef = collection(db, "jobs");

// GET ALL JOBS
export const getJobs = async () => {
  try {
    const q = query(jobsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

// ADD JOB
export const saveJob = async (jobData) => {
  try {
    const docRef = await addDoc(jobsRef, jobData);
    return docRef.id;
  } catch (error) {
    console.error("Error saving job:", error);
    return null;
  }
};

// DELETE JOB
export const deleteJob = async (jobId) => {
  try {
    await deleteDoc(doc(db, "jobs", jobId));
  } catch (error) {
    console.error("Error deleting job:", error);
  }
};

// UPDATE STATUS
export const updateJobStatus = async (jobId, status) => {
  try {
    await updateDoc(doc(db, "jobs", jobId), { status });
  } catch (error) {
    console.error("Error updating status:", error);
  }
};
