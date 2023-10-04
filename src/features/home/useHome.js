import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const useHome = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => 
    {
        const docSnap = await getDocs(collection(db, "publicaciones"));

        setPosts(docSnap.docs.map((doc) => {
            return doc.data();
        }));
        console.log("a");
    }
    
    const post = async (message) => 
    {
        try {
            const docRef = await addDoc(collection(db, "publicaciones"), {
                hora: "Ada",
                me_gustas: true,
                texto: message,
                usuario_id: "69"
            });
            console.log("Document written with ID: ", docRef.id);
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

export default useHome;