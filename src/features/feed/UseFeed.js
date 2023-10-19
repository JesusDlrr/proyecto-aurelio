import { useContext, useEffect, useState } from "react";
import { collection, addDoc, getDocs, serverTimestamp, doc, getDoc, query } from "firebase/firestore";
import { db } from "../../firebase";
import { UserContext } from "../../App";
import { getAuth } from "firebase/auth";

const UseFeed = () => {
    const [posts, setPosts] = useState([]);
    const {user, setUser} = useContext(UserContext);
    const loaded_users = [];

    const getPosts = async () => 
    {
        const docSnap = await getDocs(collection(db, "posts"));

        setPosts(await Promise.all(docSnap.docs.map(async(post) => {
            let post_data = post.data();
            let from_user = await getDoc(post_data.from);

            post_data.from = from_user.data();
            return post_data;
        })));
    }
    
    const post = async (message) => 
    {
        try {
            const user_ref = doc(db, "users", user.uid);
            await addDoc(collection(db, "posts"), {
                from: user_ref,
                message: message,
                date: serverTimestamp(),
                likes: 0
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    useEffect(()=>{
        getPosts();
    }, []);

    return {
        post,
        posts
    };
}

export default UseFeed;