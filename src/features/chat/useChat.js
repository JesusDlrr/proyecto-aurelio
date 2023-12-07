import { collection, addDoc, getDocs, serverTimestamp, query, where, getDoc, doc, and, onSnapshot, or } from "firebase/firestore";
import { db } from "../../firebase";
import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { resolvePath, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import useState from "react-usestateref";

const UseChat = () => {
    const [new_messages, setNewMessages] = useState([]);
    const [new_chats, setNewChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [chat_list, setChatList] = useState([]);
    const [chatroom_list, setChatroomList] = useState([]);
    const [chat_name, setChatName] = useState("");
    const [chatroom, setChatroom, chatroom_ref] = useState(null);
    const { user } = useContext(UserContext);
    const [search_params] = useSearchParams();
    const [new_recipient, setNewRecipient] = useState(null);

    useEffect(() => {
        if (chatroom != null) {
            getChatroomMessages(chatroom.id);
        }
    }, [chatroom]);

    const getChatroomMessages = (chatroom_id) => {
        axios.get(`https://quick-api-9c95.onrender.com/messages/${chatroom_id}`, {}).then((response) => {
            if (response.status === 200) {
                setMessages(response.data.reverse());
            }
        }).catch((error) => {
            console.error(error);
        });
    }


    const openChatroomListener = (chatroom_id) => {
        const unsub = onSnapshot(doc(db, "chatrooms", chatroom_id), (doc) => {
            if (chatroom_ref.current != null) {
                if (doc.id === chatroom_ref.current.id) {
                    setMessages(doc.data().messages.reverse());
                }
            }
        });
    }

    const getChatrooms = () => {
        axios.get(`https://quick-api-9c95.onrender.com/user/${user.uid}/chatrooms`, {}).then((response) => {
            if (response.status === 200) {
                setChatroomList(response.data);
                response.data.forEach((chatroom) => {
                    openChatroomListener(chatroom.id);
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const getChatName = async () => {
        // const other_ref = await doc(db, "users", search_params.get("to"));
        // const other = await getDoc(other_ref);

        // setChatName(other.data().name);
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
            const mess_qry = await query(collection(db, "direct_messages"), or(where("from", "==", self_ref), where("to", "==", self_ref)));
            const mess_ref = await getDocs(mess_qry);

            let mess = await Promise.all(
                mess_ref.docs.map(async (mess) => {
                    let to_user = await getDoc(mess.data().to);

                    if (to_user.id === user.uid) {
                        to_user = await getDoc(mess.data().from);
                    }

                    let to_user_data = to_user.data();
                    to_user_data.uid = to_user.id;
                    return to_user_data;
                })
            )

            setChatList(mess.filter(
                (person, index) => index === mess.findIndex(
                    other => person.avatar === other.avatar
                )
            ));

        } catch (error) {
            console.log(error);
        }
    }

    const sendMessage = (message, message_media) => {
        const form_data = new FormData();
        if (message_media !== undefined) {
            message_media.forEach((media) => {
                form_data.append("media", media.file);
            })
        }
        if (new_recipient !== null) {
            axios.post(`https://quick-api-9c95.onrender.com/chatrooms/`, {}, {
                params: {
                    chatroom_id: "",
                    participants: `${user.uid},${search_params.get("to")}`,
                }
            }).then((response) => {
                openChatListListener(response.data.id);
                axios.post(`https://quick-api-9c95.onrender.com/messages/${response.data.id}`, form_data, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    params: {
                        from_user: user.uid,
                        color: '#000000',
                        message: message
                    }
                }).then(() => {
                    setNewRecipient(null)
                    setChatroomList([
                        response.data,
                        ...chatroom_list
                    ]);
                })
            }).catch((error) => {
                console.log(error);
            })
        } else {
            axios.post(`https://quick-api-9c95.onrender.com/messages/${chatroom.id}`, form_data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                params: {
                    from_user: user.uid,
                    color: '#000000',
                    message: message
                }
            });
        }
        // try {
        //     const self_ref = await doc(db, "users", user.uid);
        //     const other_ref = await doc(db, "users", search_params.get("to"));
        //     await addDoc(collection(db, "direct_messages"), {
        //         date: serverTimestamp(),
        //         from: self_ref,
        //         to: other_ref,
        //         text: text,
        //     });
        //     setMessages([...messages, {
        //         date: { seconds: new Date().getTime() / 1000 },
        //         from: self_ref,
        //         to: other_ref,
        //         text: text,
        //     }])
        //     const other = await getDoc(other_ref);
        //     let add = true;
        //     chat_list.forEach((user) => {
        //         if (user.avatar === other.data().avatar) {
        //             add = false;
        //         }
        //     })
        //     if (add) {
        //         setChatList([...chat_list, other.data()])
        //     }
        // } catch (e) {
        //     console.error("Error adding document: ", e);
        // }
    }

    const openChatListListener = async () => {
        const self_ref = await doc(db, "users", user.uid);
        const q = query(collection(db, "direct_messages"), where("to", "==", self_ref));
        onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach(async (change) => {
                if (change.type === "added") {
                    const to_user = await getDoc(change.doc.data().from);
                    let to_user_data = to_user.data();
                    to_user_data.uid = to_user.id;

                    setNewChats([to_user_data])
                }
            });
        });
    }

    const openMessagesListener = async () => {
        const self_ref = await doc(db, "users", user.uid);
        const other_ref = await doc(db, "users", search_params.get("to"));
        const q = query(collection(db, "direct_messages"), and(where("from", "==", other_ref), where("to", "==", self_ref)));
        onSnapshot(q, (snapshot) => {
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
        if (chat_list !== null) {
            let add = true;

            console.log(chat_list)
            console.log(new_chats)
            chat_list.forEach((chat) => {
                new_chats.forEach((new_chat) => {
                    if (chat.avatar === new_chat.avatar) {
                        add = false;
                    }
                })
            })
            if (add) {
                setChatList([...chat_list, ...new_chats])
            }
        }
    }, [new_chats]);


    useEffect(() => {
        if (search_params.get("to") !== user.uid) {
            if (chatroom_list.findIndex((chatroom) => {
                if (chatroom.participants.length <= 2) {
                    const to_index = chatroom.participants.findIndex(({ id }) => (id === search_params.get("to")));
                    if (to_index !== -1) {
                        setChatroom(chatroom);
                        setNewRecipient(null);
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }) === -1) {
                axios.get(`https://quick-api-9c95.onrender.com/user/${search_params.get("to")}`, {}).then((response) => {
                    if (response.status === 200) {
                        setChatName(response.data.name);
                        setNewRecipient(response.data);
                    }
                }).catch((error) => {
                    console.log(error);
                });

            }
        }
        console.log(new_recipient)
    }, [chatroom_list])

    const openCHatroomListListener = () => {
        const unsub = onSnapshot(collection(db, "chatrooms"), async (doc) => {
            getChatrooms();
        })
    }

    useEffect(() => {
        openCHatroomListListener();
        // getChatList();
        // openMessagesListener();
        // openChatListListener();
    }, [])

    return ({
        messages,
        sendMessage,
        chat_list,
        chat_name,
        chatroom_list,
        chatroom,
        new_recipient,
        setChatName,
        setChatroom,
        getChatName,
        getMessages,
        getChatrooms,
        openChatroomListener
    })
}

export default UseChat;