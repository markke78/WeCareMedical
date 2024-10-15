import { collection, getDocs} from 'firebase/firestore';
import { db } from '../config/config';
import { useEffect, useState } from 'react';
import DoctorList from '../components/DoctorList';

export default function Neurology() {
    const [doctor, setDoctor] = useState([]);
    const  getDoctoretCardio = async () => {
        const doctorCollectionReference = collection(db, "docotrs");
        const doctors = await getDocs(doctorCollectionReference);
        const doctorsReadableData = doctors.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
        })
        const neurologists = doctorsReadableData.filter(doctor => doctor.speciality === "neurologist");
        setDoctor(neurologists);

    }

    useEffect(() => {
        getDoctoretCardio();
    }, [])

  return (
        <div>
            <main id="home" className='hero-block'>
                <h1 className='connection'>Our neurologists</h1>
              
                <DoctorList data={doctor}/>
              
                
            </main>

        </div>
  )
}
