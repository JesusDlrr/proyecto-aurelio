import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const UseHome = () => {
    const { user, setUser } = useContext(UserContext);
    const [user_name, setUserName] = useState("");
    const [user_avatar, setUserAvatar] = useState("");
    const a = 3;
    const getUserInfo = async() => 
    {
        const doc_ref = doc(db, "users", user.uid);
        const user_doc = await getDoc(doc_ref);
        const user_data = user_doc.data();
        setUserName(user_data.name);
        setUserAvatar(user_data.avatar);
    }

    useEffect(() => 
    {
        getUserInfo();
    }, [])
    
    return({user_name, user_avatar});
}

export default UseHome;
