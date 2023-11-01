import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { db, fs } from "../../firebase";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSearchParams } from "react-router-dom";

const UseProfile = () => {
    const { user } = useContext(UserContext);
    const [user_name, setUserName] = useState("");
    const [user_avatar, setUserAvatar] = useState("");
    const [search_params] = useSearchParams();
    const [posts, setPosts] = useState(null);

    const user_uid = search_params.get("user") != null ? search_params.get("user") : user.uid;

    const getUserInfo = async () => {
        const doc_ref = doc(db, "users", user_uid);
        const user_doc = await getDoc(doc_ref);
        const user_data = user_doc.data();
        setUserName(user_data.name);
        setUserAvatar(user_data.avatar);
    }


    const getPosts = async () => {
        const user_ref = await doc(db, "users", search_params.get("user"));
        const posts_qry = await query(collection(db, "posts"), where("from", "==", user_ref));
        const posts_data = await getDocs(posts_qry);


        setPosts(
            await Promise.all(
                posts_data.docs.map(async (post) => {
                    let post_data = post.data();
                    let from_user = await getDoc(post_data.from);

                    let user_data = from_user.data();
                    user_data.uid = post_data.from.id;
                    post_data.from = user_data;
                    post_data.id = post.id;
                    return post_data;
                })
            )
        );
    };

    const updateAvatar = async (new_avatar, format) => {
        const avatar_ref = ref(fs, `avatars/${user_name}.${format}`);
        await uploadBytes(avatar_ref, new_avatar).then(async (avatar_snapshot) => {
            await getDownloadURL(avatar_ref).then((url) => {
                setUserAvatar(url);
                const user_ref = doc(db, "users", user.uid);
                updateDoc(user_ref, {
                    avatar: url
                });
            })
        })


    };

    useEffect(() => {
        getUserInfo();
        getPosts();
    }, [])

    return ({ user_name, user_avatar, updateAvatar, posts });
}

export default UseProfile;