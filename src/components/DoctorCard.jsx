/* eslint-disable react/prop-types */
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db, adminAccountId } from '../config/config';



export default function DoctorCard({ data }) {
  const [isDeleting, setIsDeleting] = useState(false);

  
  const userUid = JSON.parse(localStorage.getItem('user'));
  
  const handleDelete = async () => {
    try {
      setIsDeleting(true); // Set the isDeleting state to true to disable the button during the deletion process

      // Store the deleted doctor's data before deleting from Firestore
      const deletedDoctor = { ...data };

      // Delete the doctor's record from Firestore
      const doctorDocRef = doc(db, 'docotrs', data.id);
      await deleteDoc(doctorDocRef);
      
      console.log('Deleted Doctor:', deletedDoctor);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting doctor:', error);
    } finally {
      setIsDeleting(false); // Reset the isDeleting state after the deletion process
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      {data.image && (
        <CardMedia
          sx={{ height: '400px' }}
          image={data.image}
          title="green iguana"
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Dr. {data.firstName} {data.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Speciality: {data.speciality}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Experience: {data.experience} years
        </Typography>

      </CardContent>

      <CardActions sx={{ alignItems: 'start' }}>

        <Button variant='contained' size="small" style={{ marginBottom: "5px" }}>
          <Link style={{ textDecoration: 'none', color: 'white' }} to={`/book-appointment/${data.id}`}>
            Book Appointment
          </Link>
        </Button>
        {userUid && userUid.uid === adminAccountId && (
        <Button
          variant='contained'
          color='error'
          size="small"
          disabled={isDeleting} 
          onClick={handleDelete} 
        >{isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
        )}
      </CardActions>
    </Card>
  )
}
