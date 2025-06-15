import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where,
  getDoc,
  setDoc,
  serverTimestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../firebase/config';

// User preferences
export const saveUserPreferences = async (userId, preferences) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { preferences }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving user preferences:', error);
    throw error;
  }
};

export const getUserPreferences = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? userDoc.data().preferences : null;
  } catch (error) {
    console.error('Error getting user preferences:', error);
    throw error;
  }
};

// Saved destinations
export const saveDestination = async (userId, destination) => {
  try {
    const savedRef = collection(db, 'users', userId, 'savedDestinations');
    const docRef = await addDoc(savedRef, {
      ...destination,
      savedAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving destination:', error);
    throw error;
  }
};

export const getSavedDestinations = async (userId) => {
  try {
    const savedRef = collection(db, 'users', userId, 'savedDestinations');
    const querySnapshot = await getDocs(savedRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting saved destinations:', error);
    throw error;
  }
};

export const removeSavedDestination = async (userId, destinationId) => {
  try {
    if (!userId || !destinationId) {
      throw new Error('User ID and Destination ID are required');
    }
    
    const destRef = doc(db, 'users', userId.toString(), 'savedDestinations', destinationId.toString());
    await deleteDoc(destRef);
    return true;
  } catch (error) {
    console.error('Error removing saved destination:', error);
    throw error;
  }
};

// User profile
export const updateUserProfile = async (userId, profileData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, profileData);
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

// Destination Reviews
export const addDestinationReview = async (destinationId, review) => {
  try {
    if (!destinationId) {
      throw new Error('Destination ID is required');
    }

    const reviewsRef = collection(db, 'destinations', destinationId.toString(), 'reviews');
    await addDoc(reviewsRef, {
      ...review,
      timestamp: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

export const getDestinationReviews = async (destinationId) => {
  try {
    if (!destinationId) {
      console.warn('No destination ID provided for reviews');
      return [];
    }

    const reviewsRef = collection(db, 'destinations', destinationId.toString(), 'reviews');
    const querySnapshot = await getDocs(reviewsRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting reviews:', error);
    return []; // Return empty array instead of throwing to prevent UI breakage
  }
};

export const updateDestinationRating = async (destinationId, userId, rating) => {
  try {
    if (!destinationId || !userId || !rating) {
      console.error('Missing required parameters:', { destinationId, userId, rating });
      throw new Error('Missing required parameters for rating update');
    }

    console.log('Updating rating:', { destinationId, userId, rating });

    // Update the rating in the ratings subcollection
    const ratingRef = doc(db, 'destinations', destinationId.toString(), 'ratings', userId.toString());
    await setDoc(ratingRef, {
      rating,
      userId,
      timestamp: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true });

    // Get or create the destination document
    const destinationRef = doc(db, 'destinations', destinationId.toString());
    const destinationDoc = await getDoc(destinationRef);
    
    if (!destinationDoc.exists()) {
      // Create the destination document if it doesn't exist
      await setDoc(destinationRef, {
        id: destinationId,
        createdAt: serverTimestamp(),
        averageRating: rating,
        ratingCount: 1,
        lastRatedAt: serverTimestamp()
      });
      return { averageRating: rating, ratingCount: 1 };
    }

    // Update the destination document with new average rating
    const ratingsSnapshot = await getDocs(collection(db, 'destinations', destinationId.toString(), 'ratings'));
    
    let totalRating = 0;
    let ratingCount = 0;
    
    ratingsSnapshot.forEach((doc) => {
      totalRating += doc.data().rating;
      ratingCount++;
    });

    const averageRating = totalRating / ratingCount;

    await updateDoc(destinationRef, {
      averageRating,
      ratingCount,
      lastRatedAt: serverTimestamp()
    });

    console.log('Rating updated successfully');
    return { averageRating, ratingCount };
  } catch (error) {
    console.error('Error updating destination rating:', error);
    throw error;
  }
};

export const getTrendingDestinations = async (limitCount = 5) => {
  try {
    const destinationsRef = collection(db, 'destinations');
    const baseQuery = query(destinationsRef);
    const snapshot = await getDocs(baseQuery);
    
    // Get all destinations and sort them in memory
    let destinations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // If no destinations exist, add some sample data
    if (destinations.length === 0) {
      const sampleDestinations = [
        {
          id: '1',
          name: 'Taj Mahal',
          location: 'Agra, India',
          description: 'A stunning white marble mausoleum and one of the Seven Wonders of the World.',
          image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523',
          averageRating: 4.8,
          ratingCount: 1200
        },
        {
          id: '2',
          name: 'Eiffel Tower',
          location: 'Paris, France',
          description: 'Iconic iron lattice tower on the Champ de Mars in Paris.',
          image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e',
          averageRating: 4.7,
          ratingCount: 1500
        },
        {
          id: '3',
          name: 'Great Wall of China',
          location: 'Beijing, China',
          description: 'Ancient series of walls and fortifications stretching over 13,000 miles.',
          image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d',
          averageRating: 4.6,
          ratingCount: 900
        },
        {
          id: '4',
          name: 'Machu Picchu',
          location: 'Cusco, Peru',
          description: '15th-century Inca citadel set high in the Andes Mountains.',
          image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377',
          averageRating: 4.9,
          ratingCount: 800
        },
        {
          id: '5',
          name: 'Pyramids of Giza',
          location: 'Cairo, Egypt',
          description: 'Ancient Egyptian pyramids and the Great Sphinx.',
          image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368',
          averageRating: 4.7,
          ratingCount: 1100
        }
      ];

      // Save sample destinations to Firestore
      for (const dest of sampleDestinations) {
        const docRef = doc(db, 'destinations', dest.id);
        await setDoc(docRef, {
          ...dest,
          createdAt: serverTimestamp()
        });
      }

      destinations = sampleDestinations;
    }

    // Sort by averageRating and ratingCount
    const sortedDestinations = destinations
      .filter(dest => dest.averageRating >= 0)
      .sort((a, b) => {
        if (b.averageRating !== a.averageRating) {
          return b.averageRating - a.averageRating;
        }
        return b.ratingCount - a.ratingCount;
      })
      .slice(0, limitCount);

    return sortedDestinations;
  } catch (error) {
    console.error('Error getting trending destinations:', error);
    throw error;
  }
}; 