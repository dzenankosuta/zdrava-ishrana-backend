import validator from "validator";
import { auth, db } from "../config/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function loginUser(email, password) {
  if (!email || !password) {
    return {
      success: false,
      error: "Email je obavezan_and_password",
    };
  }

  if (!validator.isEmail(email)) {
    return {
      success: false,
      error: "Email nije u dobrom formatu",
    };
  }

  try {
    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;

    // Fetch user data from Firestore
    const userDoc = await db.collection("users").doc(userId).get();

    if (userDoc.exists) {
      const userData = userDoc.data();

      // Get ID token
      const idToken = await userCredential.user.getIdToken();

      // Return user data and token
      return {
        success: true,
        user: {
          id: userId,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        },
        access_token: idToken,
      };
    } else {
      throw new Error("User data not found");
    }
  } catch (error) {
    // Return the error message
    return {
      success: false,
      error: error.message,
    };
  }
}
