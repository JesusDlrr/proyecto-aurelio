import { signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../App";

const UseFollowerPicker = () => {
    const [search_results, setSearchResults] = useState(null);
    const [users, setUsers] = useState(null);
    const [participan_list, setParticipantList] = useState([]);
    const { user } = useContext(UserContext)

    const fetchUsers = async () => {
        axios.get(`http://localhost:3001/user/${user.uid}/followers`).then((response) => {
            if (response.status === 200) {
                setUsers(response.data)
                setSearchResults(response.data)
            }
        })
    }

    const searchUsers = async (search_input) => {
        let search = new RegExp(search_input, 'i');

        setSearchResults(users.filter(user => search.test(user.name)));
    }

    const removeParticipant = (participan) => {
        const participant_index = participan_list.findIndex((element) => element.id === participan.id)

        setParticipantList([...participan_list.splice(participant_index, 0)])
        setSearchResults([...participan_list])
    }

    const addParticipant = (participan) => {
        const participant_index = search_results.findIndex((element) => element.id === participan.id)

        setParticipantList([...participan_list, participan])
        setSearchResults([...participan_list.splice(participant_index, 0)])
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return ({ search_results, searchUsers, participan_list, addParticipant, removeParticipant })
}

export default UseFollowerPicker;