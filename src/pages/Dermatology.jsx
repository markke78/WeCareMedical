import { collection, getDocs} from 'firebase/firestore';
import { db } from '../config/config';
import { useEffect, useState } from 'react';
import DoctorList from '../components/DoctorList';

export default function Dermatology() {
    const [doctor, setDoctor] = useState([]);
    const  getDoctoretCardio = async () => {
        const doctorCollectionReference = collection(db, "docotrs");
        const doctors = await getDocs(doctorCollectionReference);
        const doctorsReadableData = doctors.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
        })
        const dermatologists = doctorsReadableData.filter(doctor => doctor.speciality === "dermatologist");
        setDoctor(dermatologists);

    }

    useEffect(() => {
        getDoctoretCardio();
    }, [])

  return (
        <div>
            <main id="home" className='hero-block'>
                <h1 className='connection'>Our Cardiologists</h1>
              
                <DoctorList data={doctor}/>
              
                
            </main>

        </div>
  )
  
}
