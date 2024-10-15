/* eslint-disable react/prop-types */
import { Paper, Button } from '@mui/material'
import "../App.css"
import { useNavigate } from 'react-router-dom'

export default function Item({item}) {
    const navigate = useNavigate();

  return (
    <Paper >
        <div style={{position:"relative", textAlign:"center"}}>
            <div>
                <img src={item.image} alt={item.title} style={{width:"100%", filter:"brightness(75%)"}} />
            </div>
            <div className='description' style={{position:"absolute", left:"20%",right:"20%", top:"50%" }}>
                <h1 style={{ fontSize: "3rem", color:"white" }}>{item.title}</h1>
                <p style={{ fontSize: "20px",color:"white" }}>{item.description}</p>
                    <Button variant='contained'sx={{margin:"20px"}} onClick={() => navigate(item.link)}>
                        Check it out!
                    </Button>
            </div>
        
        </div>

{/* 
        <Typography variant='h5'>{item.title}</Typography>
        <br/>
        <Typography>{item.description}</Typography> */}

        

    </Paper>
  )
}
