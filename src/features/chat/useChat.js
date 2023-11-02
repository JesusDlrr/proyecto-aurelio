import { collection, addDoc, getDocs, serverTimestamp, query, where, getDoc, doc, and, onSnapshot, or } from "firebase/firestore";
import { db } from "../../firebase";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate, useSearchParams } from "react-router-dom";

const UseChat = () => {
    const [new_messages, setNewMessages] = useState([]);
    const [messages, setMessages] = useState([]);
    const [chat_list, setChatList] = useState([]);
    const [chat_name, setChatName] = useState("");
    const { user } = useContext(UserContext);
    const [search_params] = useSearchParams();

    const getChatName = async () => {
        const other_ref = await doc(db, "users", search_params.get("to"));
        const other = await getDoc(other_ref);

        setChatName(other.data().name);
    }

    const getMessages = async () => {
        const self_ref = await doc(db, "users", user.uid);
        const other_ref = await doc(db, "users", search_params.get("to"));
        const messages_qry = await query(collection(db, "direct_messages"), and(
            or(where("from", "==", self_ref), where("from", "==", other_ref)),
            or(where("to", "==", self_ref), where("to", "==", other_ref))
        ));
        const messages = await getDocs(messages_qry);

        setMessages(await Promise.all(
            messages.docs.map((message) => {
                return message.data();
            })
        ));
    }

    const getChatList = async () => {
        try {
            const self_ref = await doc(db, "users", user.uid);
            const mess_qry = await query(collection(db, "direct_messages"), where("from", "==", self_ref));
            const mess_ref = await getDocs(mess_qry);

            let mess = await Promise.all(
                mess_ref.docs.map(async (mess) => {
                    const to_user = await getDoc(mess.data().to);
                    let to_user_data = to_user.data();
                    to_user_data.uid = to_user.id;
                    return to_user_data;
                })
            )

            setChatList(mess.filter(
                (person, index) => index === mess.findIndex(
                    other => person.avatar === other.avatar
                )));
        } catch (error) {
            console.log(error);
        }
    }

    const sendMessage = async (text) => {
        try {
            const self_ref = await doc(db, "users", user.uid);
            const other_ref = await doc(db, "users", search_params.get("to"));
            await addDoc(collection(db, "direct_messages"), {
                date: serverTimestamp(),
                from: self_ref,
                to: other_ref,
                text: text,
            });
            setMessages([...messages, {
                date: { seconds: new Date().getTime() / 1000 },
                from: self_ref,
                to: other_ref,
                text: text,
            }])
            const other = await getDoc(other_ref);
            let add = true;
            chat_list.forEach((user) => {
                if (user.avatar === other.data().avatar) {
                    add = false;
                }
            })
            if (add) {
                setChatList([...chat_list, other.data()])
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const openMessagesListener = async () => {
        const self_ref = await doc(db, "users", user.uid);
        const other_ref = await doc(db, "users", search_params.get("to"));
        const q = query(collection(db, "direct_messages"), and(where("from", "==", other_ref), where("to", "==", self_ref)));
        onSnapshot(q, (snapshot) => {
            console.log(messages)
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    setNewMessages([...new_messages, change.doc.data()]);
                }
            });
        });
    }

    useEffect(() => {
        if (messages !== null) {
            setMessages([...new_messages, ...messages])
        }
    }, [new_messages]);

    useEffect(() => {
        getChatName();
        getMessages();
        getChatList();
        openMessagesListener();
    }, [])

    return ({
        messages,
        sendMessage,
        chat_list,
        chat_name
    })
}

export default UseChat;