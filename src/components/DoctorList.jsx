/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DoctorCard from './DoctorCard';

export default function DoctorList({ data }) {
  const navigate = useNavigate();

  return (

    <Container maxWidth="lg">
      <Box>
        {
          data?.length === 0 ?
            <Box width="100vw" height="100vh" display='flex' flexDirection='column' justifyContent='center' alignItems='center'><Typography variant='h5'>There is no Doctors yet.</Typography>
              <Button variant='contained' color='secondary' onClick={() => navigate('/')}>Go to Home</Button>
            </Box> :
            <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" justifyContent="center" gap="20px">
              {
                data.map((doctor, index) =>
                  <DoctorCard
                    key={index}
                    data={doctor}
                  />)
              }
              
            </Box>
        }
      </Box>
    </Container>
  )
}
