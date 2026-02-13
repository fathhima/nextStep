// src/utils/storage.js

const JOBS_KEY = "jobs";

export const getJobs = () => {
  try {
    const storedJobs = localStorage.getItem(JOBS_KEY);

    if (!storedJobs) return [];

    const parsedJobs = JSON.parse(storedJobs);

    return Array.isArray(parsedJobs) ? parsedJobs : [];
  } catch (error) {
    console.error("Error reading jobs from localStorage:", error);
    return [];
  }
};

export const saveJobs = (jobsArray) => {
  try {
    if (!Array.isArray(jobsArray)) {
      throw new Error("saveJobs expects an array");
    }

    localStorage.setItem(JOBS_KEY, JSON.stringify(jobsArray));
  } catch (error) {
    console.error("Error saving jobs to localStorage:", error);
  }
};
