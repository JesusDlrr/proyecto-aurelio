import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { db, fs } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const UseProfile = () => {
    const {user} = useContext(UserContext);
    const [user_name, setUserName] = useState("");
    const [user_avatar, setUserAvatar] = useState("");

    const getUserInfo = async() => 
    {
        const doc_ref = doc(db, "users", user.uid);
        const user_doc = await getDoc(doc_ref);
        const user_data = user_doc.data();
        setUserName(user_data.name);
        setUserAvatar(user_data.avatar);
    }

    const updateAvatar = async(new_avatar, format)=>
    {
        const avatar_ref = ref(fs, `avatars/${user_name}.${format}`);
        await uploadBytes(avatar_ref, new_avatar).then(async(avatar_snapshot)=>
        {
            await getDownloadURL(avatar_ref).then((url)=>{
                setUserAvatar(url);
                const user_ref = doc(db, "users", user.uid);
                    updateDoc(user_ref, {
                        avatar: url
                });
            })
        })


    };
    
    useEffect(()=>
    {
        getUserInfo();
    }, [])

    return({user_name, user_avatar, updateAvatar});
}

export default UseProfile;