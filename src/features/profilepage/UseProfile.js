import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { db, fs } from "../../firebase";
import { addDoc, and, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const UseProfile = () => {
    const { user } = useContext(UserContext);
    const [user_name, setUserName] = useState("");
    const [user_avatar, setUserAvatar] = useState("");
    const [search_params] = useSearchParams();
    const [posts, setPosts] = useState(null);
    const [following, setFollowing] = useState(null);
    const [followers, setFollowers] = useState(null);

    const user_uid = search_params.get("user") != null ? search_params.get("user") : user.uid;

    const getUserInfo = async () => {
        const doc_ref = doc(db, "users", user_uid);
        const user_doc = await getDoc(doc_ref);
        const user_data = user_doc.data();
        setUserName(user_data.name);
        setUserAvatar(user_data.avatar);
    }


    const getPosts = async () => {
        axios.get(`https://quick-api-9c95.onrender.com/user/${user_uid}/posts`, {
            params: {
                user_request_id: user.uid
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log(response.data)
                setPosts([
                    ...response.data.posts.map((post) => ({ type: "post", ...post })),
                    ...response.data.reposts.map((repost) => ({ type: "repost", ...repost }))
                ]);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const getFollowers = async () => {
        try {

            const other_ref = await doc(db, "users", search_params.get("user"));
            const followers_qry = await query(collection(db, "friends"), where("follows", "==", other_ref));
            const followers_ref = await getDocs(followers_qry);

            setFollowers(followers_ref.size);
        } catch (error) {
            console.log(error)
        }
    }

    const getFollowing = async () => {
        try {
            const user_ref = await doc(db, "users", user.uid);
            const other_ref = await doc(db, "users", search_params.get("user"));
            const follow_qry = await query(collection(db, "friends"), and(where("user", "==", user_ref), where("follows", "==", other_ref)));
            const follow_ref = await getDocs(follow_qry);

            setFollowing(follow_ref.size !== 0)
        } catch (error) {
            console.log(error)
        }
    }

    const followUser = async () => {
        try {
            const user_ref = await doc(db, "users", user.uid);
            const other_ref = await doc(db, "users", search_params.get("user"));
            const follow_qry = await query(collection(db, "friends"), and(where("user", "==", user_ref), where("follows", "==", other_ref)));
            const follow_ref = await getDocs(follow_qry);

            if (follow_ref.size === 0) {
                await addDoc(collection(db, "friends"), {
                    user: user_ref,
                    follows: other_ref
                });
                setFollowing(true);
                setFollowers(followers + 1);
            } else {
                follow_ref.forEach(async (follow) => {
                    await deleteDoc(doc(db, "friends", follow.id));
                })
                setFollowing(false);
                setFollowers(followers - 1);
            }
        } catch (error) {
            console.log(error)
        }

    }

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

    const post = async (message) => {
        try {
            const user_ref = doc(db, "users", user.uid);
            await addDoc(collection(db, "posts"), {
                from: user_ref,
                message: message,
                date: serverTimestamp(),
                likes: 0,
            }).then((post_ref) => {
                const new_post = {
                    id: post_ref.id,
                    from: {
                        id: user.uid,
                        avatar: user_avatar,
                        name: user_name,
                        uid: user.uid,
                    },
                    message: message,
                    date: {
                        seconds: new Date().getTime() / 1000,
                    },
                    likes: 0,
                };
                setPosts([...posts, new_post]);
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    useEffect(() => {
        getUserInfo();
        getPosts();
        // getFollowing();
        getFollowers();
    }, [])

    return ({
        user_name,
        user_avatar,
        updateAvatar,
        posts,
        following,
        followUser,
        setPosts,
        followers,
        post
    });
}

export default UseProfile;