import { useContext, useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { UserContext } from '../../App';

const useLoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {user, setUser} = useContext(UserContext);

    console.log(user)

    const logIn = (email, password) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser({
            uid: userCredential.user.uid,
            name: userCredential.user.displayName,
            email: userCredential.user.email
          });
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