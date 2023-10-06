import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setUserData } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';

const useLoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const logIn = (email, password) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatch(setUserData({
            uid: userCredential.user.uid,
            name: userCredential.user.displayName,
            email: userCredential.user.email
          }));
          window.location="/";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
        });
    }

    return {
        email, password, 
        setEmail, 
        setPassword, 
        logIn,
    };

}

export default useLoginForm;