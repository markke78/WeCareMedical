/* eslint-disable react/prop-types */
import {Table} from 'antd';
import { Button } from '@mui/material';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/config';


export default function Appointment({data, appointmentModified}) {
  
  // console.log(data[0]?.id, "data");
  // console.log(appointmentModified, "appointmentModified")

  const deleteAppointment = () => {
    const appointmentRef = doc(db, "appointments", data[0]?.id);
    deleteDoc(appointmentRef).then(()=>{
      console.log("Appointment deleted successfully");
      appointmentModified(data[0]?.id);
    }).catch((error)=>{
      console.log(error);
    })
  }


   const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date)
    },
    {
      title: "Time",
      dataIndex: "slot",
      key: "slot",
    },
    {
      title: "Doctor",
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "Reason",
      dataIndex: "problem",
      key: "problem",
    },
    {
      title: "Booked At",
      dataIndex: "bookedOn",
      key: "bookedOn",
      sorter: (a, b) => new Date(a.date) - new Date(b.date)
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => {
        return <Button onClick={deleteAppointment} variant='contained' color='error' size="small">Cancel</Button>
      }     

    }
    
    
  ];
  return (
    <div >
      <Table columns={columns} dataSource={data}></Table>
    </div>
  )
}
