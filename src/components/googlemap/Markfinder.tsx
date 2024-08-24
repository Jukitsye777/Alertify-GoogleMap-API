import React, { useState, useEffect } from 'react';
import { db } from '../firebase/Firebase';
import { collection, getDocs } from 'firebase/firestore';

const useMarkfinder = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const usersRef = collection(db, 'reports');
        const querySnapshot = await getDocs(usersRef);
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({
            ...doc.data(),
            id: doc.id,
            imageUrl: doc.data().imageUrl || '', // Fetch the image URL if it exists
          });
        });
        setReports(results);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setError(error); // Set error if there's an issue
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return { reports }; // Return error and loading states
};

export default useMarkfinder;
