import { useContext, useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { setUserData } from '../../slices/userSlice';
// import { useDispatch } from 'react-redux';
import { UserContext } from '../../App';
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";



const useSignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  // const dispatch = useDispatch();
  const { user, setUser } = useContext(UserContext);

  const createUser = async (id) => {
    try {
      const userRef = doc(db, 'users', id);
      const docRef = await setDoc(userRef, {
        avatar: "",
        displayName: "juancho",
        date: serverTimestamp()
      });
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        createUser(userCredential.user.uid);
        setUser({
          uid: userCredential.user.uid,
          name: userCredential.user.displayName,
          email: userCredential.user.email
        });
        window.location = "/";
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  return {
    email, password,
    setEmail, setPassword, setName, signUp
  }
}

export default useSignUpForm;