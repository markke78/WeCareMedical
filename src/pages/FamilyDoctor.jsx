import { collection, getDocs} from 'firebase/firestore';
import { db } from '../config/config';
import { useEffect, useState } from 'react';
import DoctorList from '../components/DoctorList';

export default function FamilyDoctor() {
    const [doctor, setDoctor] = useState([]);
    console.log(doctor);
    const  getDoctoretFamily = async () => {
        const doctorCollectionReference = collection(db, "docotrs");
        const doctors = await getDocs(doctorCollectionReference);
        const doctorsReadableData = doctors.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
        })
        const cardiologiests = doctorsReadableData.filter(doctor => doctor.speciality === "family doctor");
        setDoctor(cardiologiests);

    }

    useEffect(() => {
        getDoctoretFamily();
    }, [])

  return (
        <div>
            <main id="home" className='hero-block'>
                <h1 className='connection'>Our Family Doctors</h1>
              
                <DoctorList data={doctor}/>
              
                
            </main>

        </div>
  )
}
