/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { GetDoctorById } from './DoctorListPage'
import { Col, Row } from 'antd';
import { Container, TextField, Box } from '@mui/material';
import moment from 'moment';
import useLocalStorage from '../hooks/useLocalStorage';
import { addDoc, collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../config/config';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useSelector } from 'react-redux';



export default function BookAppointment() {
  const [doctor, setDoctor] = useState(null);
  const [selectedSlot = "", setSelectedSlot] = useState("");
  const [date = "", setDate] = useState("");
  const [user, setUser] = useLocalStorage('user', null);
  const [bookedSlots = [], setBookedSlots] = useState([]);
  const [problem, setProblem] = useState("");
  const darkMode = useSelector((state) => state.theme.darkMode);

  const { id } = useParams();
  const navigate = useNavigate();

  const getDoctor = async () => {
    try {
      const doctor = await GetDoctorById(id);
      if (doctor) {
        setDoctor(doctor);
      } else {
        console.log('doctor not found');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getSlotsDate = () => {
    const day = moment(date).format('dddd');
    // console.log(day);
    if (!doctor?.skills.includes(day)) {
      return <h2 style={{ whiteSpace: "nowrap" }}>Doctor is not available on {moment(date).format("YYYY-MM-DD")}</h2>
    }
    let startTime = moment(doctor?.onTime, "HH:mm");
    let endTime = moment(doctor?.offTime, "HH:mm");
    let slotDuration = 30;
    const slots = [];
    while (startTime <= endTime) {
   
      slots.push(new moment(startTime).format("HH:mm"));
      startTime.add(slotDuration, "minutes");
    }
    // console.log(slots);
    return slots.map((slot) => {
      const isBooked = bookedSlots?.find((bookedSlot) => bookedSlot.slot === slot);
      return <div
        key={slot} // To clean up warning in console
        className='bg-white p-1 cursor-pointer'       
        onClick={() => setSelectedSlot(slot)}
        style={{
          border:
          selectedSlot === slot ? "3px solid green" : "1px solid gray",
          backgroundColor: isBooked ? "gray" : "white",
          pointerEvents: isBooked ? "none" : "auto",
          cursor: isBooked ? "not-allowed" : "pointer",
          color: darkMode ? "#333" : "inherit",

        }}
      >
        <span>
          {moment(slot, "HH:mm").format("HH:mm")}-{moment(slot, "HH:mm").add(slotDuration, "minutes").format("HH:mm")}
        </span>
      </div>

    })
  };

  const handleBookAppointment = async () => {
    const appointment = {
      doctorId: doctor.id,
      patientId: user.uid,
      slot: selectedSlot,
      date: date,
      doctorName: doctor.firstName + " " + doctor.lastName,
      bookedOn: moment().format("YYYY-MM-DD hh:mm A"),
      problem: problem,
      status: "pending",
    }
    console.log(appointment);
    try {
      const appointmentCollectionReference = collection(db, "appointments");
      const appointmentRef = await addDoc(appointmentCollectionReference, appointment);
      // console.log(appointmentRef);
      // console.log(appointmentRef.id)

      navigate(`/appointment/${appointmentRef.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  const getAlreadyBookedSlots = async () => {
    const appointmentCollectionReference = collection(db, "appointments");

    const querySnapshot = await getDocs(query(appointmentCollectionReference, where("doctorId", "==", doctor?.id), where("date", "==", date)));
    // console.log(querySnapshot)
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push({ ...doc.data(), id: doc.id });
    });
    // console.log(appointments);  
    if (appointments.length > 0) {
      setBookedSlots(appointments);
    }


  }
  useEffect(() => {
    getDoctor();
  }, [id])

  useEffect(() => {
    if (date) {
      getAlreadyBookedSlots();
    }
  }, [date]);

  return (
    doctor && (
      <Container sx={{ marginTop: "20px" }}>
        <div className="bg-white p-2" 
        style={{ backgroundColor: darkMode ? '#333' : '#f2f2f2' }}
        >
          <Row>
            <Col span={19}>
              <h1 className="uppercase my-1">
                <b>
                  Dr. {doctor?.firstName} {doctor?.lastName}
                </b>
              </h1>
              <hr style={{ width: "55%" }} />
              <div className="flex flex-col gap-1 my-1 w-half">
                <div className="flex justify-between w-full" >
                  <h4>
                    <b>Speciality : </b>
                  </h4>
                  <h4>{doctor.speciality}</h4>
                </div>
                <div className="flex justify-between w-full">
                  <h4>
                    <b>Experience : </b>
                  </h4>
                  <h4>
                    {doctor.experience + " "}Years
                  </h4>
                </div>
                <div className="flex justify-between w-full">
                  <h4>
                    <b>Email : </b>
                  </h4>
                  <h4>{doctor.email}</h4>
                </div>
                <div className="flex justify-between w-full">
                  <h4>
                    <b>Phone : </b>
                  </h4>
                  <h4>{doctor.phone}</h4>
                </div>
                <div className="flex justify-between w-full">
                  <h4>
                    <b>Address : </b>
                  </h4>
                  <h4>{doctor.address}</h4>
                </div>
                <div className="flex justify-between w-full">
                  <h4>
                    <b>Days Available : </b>
                  </h4>
                  <h4>{doctor?.skills.join(', ')}</h4>
                </div>
              </div>
            </Col>
            <Col span={5}>
              <img src={doctor?.image} alt={doctor?.firstName} height={300} />
            </Col>
          </Row>
          <hr className='my-1'></hr>
          <div className="flex flex-col gap-1 my-2">
            <Container sx={{ display: "flex", justifyContent: "left" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  // orientation="StaticDatePicker"
                  orientation="portrait"
                  openTo='day'
                  disablePast
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue.format('YYYY-MM-DD'));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  slotProps={{
                    actionBar: {
                      actions: [],
                    },
                  }}
                />
              </LocalizationProvider>
              <Container sx={{ marginTop: "30px" }}>
                <div className="flex gap-2" style={{ color: darkMode ? '#f5f0f0' : 'inherit' }}>
                  <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" justifyContent="center" gap="20px"> {date && getSlotsDate()}
                  </Box>
                </div>
              </Container>
            </Container>

            {selectedSlot &&
              <div>
                <textarea
                  placeholder="Enter the reason or symptoms for visit"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  rows="10"
                ></textarea>
                <div className="flex gap-2 justify-center my-3">
                  <button
                    className='contained-btn'
                    onClick={() => navigate('/allDoctors')}
                  >Cancel</button>
                  <button className="contained-btn" onClick={handleBookAppointment}>Book Appointment</button>
                </div>
              </div>

            }

          </div>
        </div>
      </Container>
    )
  )
}
