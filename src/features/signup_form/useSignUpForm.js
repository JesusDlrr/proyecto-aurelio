import { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setUserData } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';

const useSignUpForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const signUp = (email, password) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatch(setUserData({
            uid: userCredential.user.uid,
            name: userCredential.user.displayName,
            email: userCredential.user.email
          }));
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
        });
    }

    return {
        email, password,
        setEmail, setPassword, signUp
    }
}

export default useSignUpForm;