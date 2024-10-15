/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MuiFileInput } from 'mui-file-input'
import { Box, FormControlLabel, Checkbox, FormControl, FormLabel, FormGroup, TextField, Stack, Button, Typography, InputLabel, Select, MenuItem, Container } from '@mui/material'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { db, storage, auth } from '../config/config';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useSelector } from 'react-redux';



export default function DoctorForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [experience, setExperience] = useState('')
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [speciality, setSpeciality] = useState('')
    const [onTime, setOnTime] = useState(dayjs('2022-04-17T15:30'));
    const [offTime, setOffTime] = useState(dayjs('2022-04-17T15:30'));
    const [imageProgress, setImageProgress] = useState("");
    const [skills, setSkills] = useState([]);
    const navigate = useNavigate();
    const darkMode = useSelector((state) => state.theme.darkMode);

    const handleDayChange = (event) => {
        const index = skills.indexOf(event.target.value)
        if (index === -1) {
            setSkills([...skills, event.target.value])
        } else {
            setSkills(skills.filter(skill => skill !== event.target.value))
        }
    }

    const doctorCollectionReference = collection(db, "docotrs");

    const handleSubmit = async (event) => {
        event.preventDefault();
        
      
        const doctorObject = {
            firstName,
            lastName,
            phone,
            email,
            address,
            experience,
            image,
            speciality,
            onTime: onTime.hour(),
            offTime: offTime.hour(),
            skills,
            createdAt: Date.now(),
        }
        try {
            await addDoc(doctorCollectionReference, doctorObject);
            // setNotificationObject({ ...notificationObject, open: true, message: 'Blog Succesfully created' })
            alert("Doctor information submitted successfully.");
            navigate('/alldoctors'); // Navigate to the desired path
        } catch (error) {
            console.log(error);
        }
    }

    const uploadImageFunc = (newFile) => {
        console.log(newFile);
        setImageFile(newFile);
        // Where the image is going to be stored on firebase/storage
        const storageRef = ref(storage, `/images/${Date.now()}/docotrs`);

        // What does this mean ? It tells you how much image is uploaded by %
        const uploadImage = uploadBytesResumable(storageRef, newFile);

        // Here snapshot will provide you information how much image is uploaded
        uploadImage.on("state_changed", (snapshot) => {
            const progressOfImageUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageProgress(progressOfImageUpload);
        }, (error) => {
            console.log('There was an error uploading an image', error);
            // Add A notification here as well
        }, () => {
            getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                console.log('image uploaded at url', url);
                setImage(url);
            })
        })
    }
    return (
        <>
        <Container sx={{marginTop:"30px"}}>
            <div className="create-box">
            <Typography variant="h5">Apply For A Doctor Account</Typography>

            <Typography variant="h7">Personal Information</Typography>

            <form onSubmit={handleSubmit} action={<Link to="/" />}>
                <Stack spacing={1} direction="row" sx={{ marginBottom: 1, marginTop: 1 }}>
                    <TextField
                        size="small"
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="First Name"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                    />
                    <TextField
                        size="small"
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    />
                    <TextField
                        size="small"
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Phone"
                        onChange={e => setPhone(e.target.value)}
                        value={phone}
                        fullWidth
                        required
                    />
                </Stack>
                <Stack spacing={1} direction="row" sx={{ marginBottom: 1 }}>
                    <TextField
                        size="small"
                        type="email"
                        variant='outlined'
                        color='secondary'
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        fullWidth
                        required
                    />

                    <MuiFileInput size='small' label='Upload Picture' value={imageFile} onChange={uploadImageFunc} />

                </Stack>

                <TextField
                    size="small"
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Address"
                    onChange={e => setAddress(e.target.value)}
                    value={address}
                    fullWidth
                    required
                    sx={{ mb: 1 }}
                />
                <hr className='my-2'></hr>
                <Typography variant="h7">PROFESSIONAL INFORMATION</Typography>
                <Stack spacing={1} direction="row" sx={{ marginBottom: 1, marginTop: 1 }}>
                    <FormControl required fullWidth size='large'>
                        <InputLabel id="demo-simple-select-required-label">Speciality</InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={speciality}
                            label="Speciality *"
                            onChange={e => setSpeciality(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="family doctor">Family Doctor</MenuItem>
                            <MenuItem value="cardiologist">Cardiologist</MenuItem>
                            <MenuItem value="pediatrician">Pediatrician</MenuItem>
                            <MenuItem value="neurologist">Neurologist</MenuItem>
                            <MenuItem value="orthopedic">Orthopedic</MenuItem>
                            <MenuItem value="dermatologist">Dermatology</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        size="small"
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Experience"
                        onChange={e => setExperience(e.target.value)}
                        value={experience}
                        fullWidth
                        required
                    />
                </Stack>
                <hr className="my-2"></hr>
                <Typography variant="h7">WORK HOUR</Typography>
                <Stack spacing={1} direction="row" sx={{ marginBottom: 1, marginTop: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker', 'TimePicker']}>
                            <TimePicker
                                size="small"
                                label="Start Time"
                                value={onTime}
                                onChange={(newValue) => setOnTime(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker', 'TimePicker']}>
                            <TimePicker
                                size="small"
                                label="End Time"
                                value={offTime}
                                onChange={(newValue) => setOffTime(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>



                </Stack>
                <Box>
                    <FormControl>
                        <FormLabel>Work Day</FormLabel>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value='Monday'
                                        checked={skills.includes('Monday')}
                                        onChange={handleDayChange}
                                    />
                                }
                                label='Moday'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value='Tuesday'
                                        checked={skills.includes('Tuesday')}
                                        onChange={handleDayChange}
                                    />
                                }
                                label='Tuesday'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value='Wednesday'
                                        checked={skills.includes('Wednesday')}
                                        onChange={handleDayChange}
                                    />
                                }
                                label='Wednesday'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value='Thursday'
                                        checked={skills.includes('Thursday')}
                                        onChange={handleDayChange}
                                    />
                                }
                                label='Thursday'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value='Friday'
                                        checked={skills.includes('Friday')}
                                        onChange={handleDayChange}
                                    />
                                }
                                label='Friday'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value='Saturday'
                                        checked={skills.includes('Saturday')}
                                        onChange={handleDayChange}
                                    />
                                }
                                label='Saturday'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value='Sunday'
                                        checked={skills.includes('Sunday')}
                                        onChange={handleDayChange}
                                    />
                                }
                                label='Sunday'
                            />

                        </FormGroup>
                    </FormControl>
                </Box>

                <Button 
                sx={{ backgroundColor: darkMode ? '#333' : 'inherit', color: darkMode ? '#fff' : '#inherit' }}
                variant="outlined" color="secondary" type="submit" >Submit</Button>

            </form>
        </div>
        </Container>
        
            

        </>
    )
}
