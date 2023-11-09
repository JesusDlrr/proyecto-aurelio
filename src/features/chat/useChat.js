import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const UseChat = () => {
    const [messages, setMessages] = useState([]);
    const getMessages = async () => {
        const docSnap = await getDocs(collection(db, "direct_messages"));

        setMessages(docSnap.docs.map((doc) => {
            return doc.data();
        }));
    }
    const sendMessage = async (text) => {
        try {
            const docRef = await addDoc(collection(db, "direct_messages"), {
                date: serverTimestamp(),
                from: "69",
                to: "13",
                text: text,
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    useEffect(() => {
        getMessages();
    }, [])

    return ({ messages, sendMessage })
}

export default UseChat;