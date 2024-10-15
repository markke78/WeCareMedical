import { collection, getDocs, query, where} from 'firebase/firestore';
import { db} from '../config/config';
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import Appointment from '../components/Appointment';
import {Container, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom'


export default function Upcoming() {
        const [user, setUser] = useLocalStorage('user', null);
    const [appointment, setAppointment] = useState([]);
    const [appointmentModified, setAppointmentModified] = useState();
    const navigate = useNavigate();
    const now = new Date();
    const appendZero = (n) => {
        if (n <= 9) {
            return "0" + n;
        }
        return n
    }

    console.log('2023-10-10' > '2021-10-10')   ;
    const today = now.getFullYear() + '-' + appendZero((now.getMonth() + 1)) + '-' + appendZero(now.getDate());;


    const GetAppoitmentByUser = async () => {
        const querySnapshot = await getDocs(
            query(
                collection(db, "appointments"),
                where("patientId", "==", user.uid),  
            )
        );
        const data =[];
        querySnapshot.forEach((doc) => {
            if(doc.data().date <= today){
                data.push({ ...doc.data(), id: doc.id });
            }
            
        });
        console.log(data);
        setAppointment(data);
        
    }

    useEffect(() => {
        GetAppoitmentByUser();
    }
    , [appointmentModified])
  return (
    <div>
    <Container>


        {appointment.length === 0?
            <div>
                <h1 className='p-2'>There is no appointment yet.</h1>
                    <Button variant='contained' color='secondary' onClick={() => navigate('/alldoctors')}>Go to Make Appointments</Button>
                </div>:
                <div>
                    <Appointment appointmentModified={(dataModified)=> setAppointmentModified(dataModified)} data = {appointment}/>
                </div>            
        }

    </Container>
    </div>
  )
}
