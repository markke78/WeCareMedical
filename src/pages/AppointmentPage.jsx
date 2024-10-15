import { useParams, useNavigate } from 'react-router-dom'
import { collection, getDocs} from 'firebase/firestore';
import { db} from '../config/config';
import { useEffect, useState } from 'react';
import {Container, Button} from '@mui/material';
import Appointment from '../components/Appointment';


export default function AppointmentPage() {
  
  const { id } = useParams();
  const [appointment, setAppointment] = useState([]);
  const [appointmentModified, setAppointmentModified] = useState();
  const navigate = useNavigate();
  console.log(id);
  console.log(appointment[0]);


  const GetAppoitmentById = async (id) => {
    const appointmentCollectionReference = collection(db, "appointments");
    const appointment = await getDocs(appointmentCollectionReference);
    console.log(appointment);
    const appointmentReadableData = appointment.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
    })
    console.log(appointmentReadableData);
    return appointmentReadableData.find(appointment => appointment.id === id);
}

  const getAppointment = async () => {
    
    const appointment = await GetAppoitmentById(id);
    console.log(appointment);
    const data =[];       
    data.push(appointment);     
    setAppointment(data);
}

    useEffect(() => {
        getAppointment();
    }
    , [appointmentModified])



  return (
    
    <Container className='wrapper' >
        {appointment[0] == undefined ?
            <div>
                <h1 className='p-2'>There is no appointment yet.</h1>
                    <Button variant='contained' color='secondary' onClick={() => navigate('/alldoctors')}>Go to Make Appointments</Button>
                </div>:
                <div>
                    <h1 className='p-2'>Your Appointment</h1>
                    <Appointment appointmentModified={(dataModified)=> setAppointmentModified(dataModified)} data = {appointment}/>
                </div>            
        }
    </Container>

  )
}
