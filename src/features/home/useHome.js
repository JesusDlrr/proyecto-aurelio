import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { printInfo } from "../../slices/userSlice";
import { store } from "../../app/store";

const useHome = () => {
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const getPosts = async () => 
    {
        const docSnap = await getDocs(collection(db, "posts"));

        setPosts(docSnap.docs.map((doc) => {
            return doc.data();
        }));
    }
    
    const post = async (message) => 
    {
        // dispatch(printInfo())
        console.log(store.getState())
        // try {
        //     const docRef = await addDoc(collection(db, "posts"), {
        //         date: serverTimestamp(),
        //         likes: 0,
        //         message: message,
        //         user_id: "69"
        //     });
        //     console.log("Document written with ID: ", docRef.id);
        // } catch (e) {
        //     console.error("Error adding document: ", e);
        // }
    }

    useEffect(()=>{
        getPosts();
        // console.log(posts)
    }, []);

    return {
        post,
        posts
    };
}

export default useHome;