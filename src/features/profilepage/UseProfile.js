import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const UseProfile = () => {
    const [user_name, setUserName] = useState("");
    const [user_avatar, setUserAvatar] = useState("");
    
    return({user_name, user_avatar});
}

export default UseProfile;