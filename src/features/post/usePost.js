import { useContext } from "react";
import { UserContext } from "../../App";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const usePost = () => {
    const {user, setUser} = useContext(UserContext);

    const like = async() =>
    {
        await updateDoc(doc(db, "posts", "CFmX3mEhnkW9zmqDXq1c"), {
            text: "THe fatest rat"
        })
    }
}

export default usePost;