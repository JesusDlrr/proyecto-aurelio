import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function GetQuicker() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

<<<<<<< HEAD
    axios.get(`https://quick-api-9c95.onrender.com/checkout/session/${user.uid}`, {}).then((response) => {
=======
    axios.get(`http://https://quick-api-9c95.onrender.com/checkout/session/${user.uid}`, {}).then((response) => {
>>>>>>> b8bff78beb3e129813a9d057f1990d10d1307c78
        if (response.status === 200) {
            window.location = response.data;
        }
    })
    return (<></>)
}

export default GetQuicker;
