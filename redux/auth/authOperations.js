import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { authSlice } from "./authReducer";

import { auth } from "../../firebase/config";

// export const authSignUpUser = async ({ login, email, password }) => {
//   try {
//     await createUserWithEmailAndPassword(auth, email, password);

//     const user = auth.currentUser;
//   } catch (error) {
//     console.log("error", error);
//     console.log("error.message", error.message);
//   }
// };

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
      dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
      console.log("user", user);
    } catch (error) {
      console.log("error", error);

      console.log("error.message", error.message);
    }
  };

// export const authSignInUser =
//   ({ email, password }) =>
//   async (dispatch, getState) => {
//     try {
//       const user = await db.auth().signInWithEmailAndPassword(email, password);
//       console.log("user", user);
//     } catch (error) {
//       console.log("error", error);
//       console.log("error.code", error.code);
//       console.log("error.message", error.message);
//     }
//   };

export const authSignOutUser = () => async (dispatch, getSatte) => {};
