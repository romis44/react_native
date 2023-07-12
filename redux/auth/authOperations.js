import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase/config";

export const authSignUpUser = createAsyncThunk(
  "auth/signUp",
  async ({ login, email, password }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      if (user) {
        await updateProfile(user, { displayName: login });
        console.log("user", user);

        const { displayName, uid } = auth.currentUser;

        return { displayName, uid };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authLogInUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const { displayName, uid } = user;

      return { displayName, uid };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSignOutUser = createAsyncThunk(
  "auth/signOut",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authOnStateChanged = createAsyncThunk(
  "auth/update",
  async (_, thunkAPI) => {
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const updateSuccessful = auth.currentUser;

          await updateProfile(updateSuccessful, {
            login: updateSuccessful.displayName,
            userID: updateSuccessful.uid,
            isAuth: true,
          });
        }
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
