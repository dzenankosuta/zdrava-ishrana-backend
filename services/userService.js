import admin from "firebase-admin";
import { db } from "../config/firebase.js";

export async function registerUser(email, password, firstName, lastName) {
  try {
    // Kreiranje korisnika u Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    // Čuvanje dodatnih informacija o korisniku u Firestore
    await db.collection("users").doc(userRecord.uid).set({
      firstName: firstName,
      lastName: lastName,
      email: email,
    });

    return {
      success: true,
      user: {
        id: userRecord.uid,
        email: userRecord.email,
        firstName: firstName,
        lastName: lastName,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function deleteUser(uid) {
  try {
    await admin.auth().deleteUser(uid);
    await db.collection("users").doc(uid).delete();
    return {
      success: true,
      message: "Successfully deleted user",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getUserData(userId) {
  try {
    const userDoc = await db.collection("users").doc(userId).get();
    if (userDoc.exists) {
      return {
        success: true,
        userData: userDoc.data(),
      };
    } else {
      throw new Error("User data not found");
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
