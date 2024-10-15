import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import DoctorList from '../components/DoctorList';
import { db } from '../config/config';
import { useDispatch } from 'react-redux';
import { ShowLoader } from '../redux/loaderSlice';
import { useSelector } from 'react-redux';

export default function DoctorListPage() {
  const doctorCollectionReference = collection(db, "docotrs");
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const getAllDoctors = async () => {
    try {

      const doctors = await getDocs(doctorCollectionReference);
      if (doctors) {
        const doctorsReadableData = doctors.docs.map((doc) => {
          return { ...doc.data(), id: doc.id }
        })
        setDoctors(doctorsReadableData);
      } else {
        console.log('no doctors');
      }
      dispatch(ShowLoader(false));
    } catch (error) {
      console.log(error);
      dispatch(ShowLoader(false));
    }
   
  }

  useEffect(() => {
    getAllDoctors();
  }, [])

  return (
    <div style={{ backgroundColor: darkMode ? '#333' : '#d9e9fa' }}>
      <main id="home" className='hero-block'>
        <h1 className='connection'style={{ color: darkMode ? '#f5f0f0' : 'inherit' }}>Our Doctors</h1>
        <DoctorList data={doctors} />

      </main>

    </div>


  )
}

export const GetDoctorById = async (id) => {
  const doctorCollectionReference = collection(db, "docotrs");
  const doctors = await getDocs(doctorCollectionReference);
  const doctorsReadableData = doctors.docs.map((doc) => {
    return { ...doc.data(), id: doc.id }
  })
  return doctorsReadableData.find(doctor => doctor.id === id);
}

export const GetDoctorBySpeciality = async (speciality) => {
  const doctorCollectionReference = collection(db, "docotrs");
  const doctors = await getDocs(doctorCollectionReference);
  const doctorsReadableData = doctors.docs.map((doc) => {
    return { ...doc.data(), id: doc.id }
  })
  return doctorsReadableData.filter(doctor => doctor.speciality === speciality);
}

    // const getAllDoctors = async () => {
    //     const doctors = await getDocs(doctorCollectionReference);
    //     // console.log(doctors);
    //     const doctorsReadableData = doctors.docs.map((doc) => {
    //         return { ...doc.data(), id: doc.id }
    //     })
    //     setDoctors(doctorsReadableData);
    //     // console.log(doctorsReadableData, 'doctors');
    // }