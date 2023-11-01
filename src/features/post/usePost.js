import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { addDoc, and, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const usePost = (post_id) => {
    const { user, setUser } = useContext(UserContext);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(null);

    const getLikes = async () => {
        const user_ref = await doc(db, "users", user.uid);
        const post_ref = await doc(db, "posts", post_id);
        const like_qry = await query(collection(db, "likes"), and(where("from", "==", user_ref), where("on", "==", post_ref)));
        const like_ref = await getDocs(like_qry);
        const like_n_qry = await query(collection(db, "likes"), where("on", "==", post_ref));
        const likes_n_ref = await getDocs(like_n_qry);

        setLikes(likes_n_ref.size);
        setLiked(like_ref.size != 0);
    }

    const likePost = async () => {
        try {
            const user_ref = await doc(db, "users", user.uid);
            const post_ref = await doc(db, "posts", post_id);
            const like_qry = await query(collection(db, "likes"), and(where("from", "==", user_ref), where("on", "==", post_ref)));
            const like_ref = await getDocs(like_qry);

            if (like_ref.size === 0) {
                await addDoc(collection(db, "likes"), {
                    from: user_ref,
                    on: post_ref
                });
                setLikes(likes + 1);
                setLiked(true);
            } else {
                like_ref.forEach(async (like) => {
                    await deleteDoc(doc(db, "likes", like.id));
                })
                setLikes(likes - 1);
                setLiked(false);
            }

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getLikes();

    }, [])

    return {
        likes,
        liked,
        likePost
    }

}

export default usePost;