

import './App.css'
import { Navigate, useLocation } from 'react-router-dom'
import SignInPage from './pages/Signin'
import HomePage from './pages/Home'
import RegisterPage from './pages/Register'
import CreateDoctor from './pages/CreateDoctor'
import DoctorList from './pages/DoctorListPage'
import PasswordResetPage from './pages/PasswordResetPage'
import BookAppointment from './pages/BookAppointment'
import AppointmentPage from './pages/AppointmentPage'
import Cardiology from './pages/Cardiology';
import MyAppointmentPage from './pages/myAppointmentPage';
import { adminAccountId } from './config/config'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import { useSelector } from 'react-redux'
import Spinner from './components/Spinner'
import FamilyDoctor from './pages/FamilyDoctor'
import Neurology from './pages/Neurology'
import Pediatrics from './pages/Pediatrics'
import Orthopedic from './pages/Orthopedic'
import Dermatology from './pages/Dermatology'
import { ThemeProvider, createTheme } from '@mui/material/styles';



function App() {

  const userInfo = JSON.parse(localStorage.getItem('user'));
  console.log(userInfo);
  const isLoggedIn = userInfo !== null;
  const isAdmin = isLoggedIn && userInfo.uid === adminAccountId;
  const { loading } = useSelector((state) => state.loader);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const AppWrapper = () => {
    const location = useLocation();
    const shouldDisplayHeader = location.pathname !== '/signin' && location.pathname !== '/register' && location.pathname !== '/resetpassword';
    return (
      <>
        {shouldDisplayHeader && <Header />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resetpassword" element={<PasswordResetPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route
            path="/createdoctor"
            element={isAdmin ? <CreateDoctor /> : <Navigate to="/" />}
          />
          <Route
            path="alldoctors"
            element={isLoggedIn ? <DoctorList /> : <Navigate to="/" />}
          />
          <Route
            path="/book-appointment/:id"
            element={isLoggedIn ? <BookAppointment /> : <Navigate to="/" />
            }
          />
          <Route
            path="/appointment/:id"
            element={isLoggedIn ? <AppointmentPage /> : <Navigate to="/" />
            }
          />
          <Route
            path="/cardiologist"
            element={isLoggedIn ? <Cardiology /> : <Navigate to="/" />
            }
          />
          <Route
            path="/myappoitment"
            element={isLoggedIn ? <MyAppointmentPage /> : <Navigate to="/" />
            }
          />

          <Route
            path="/familydoctor"
            element={isLoggedIn ? <FamilyDoctor /> : <Navigate to="/" />
            }
          />

          <Route
            path="/neurology"
            element={isLoggedIn ? <Neurology /> : <Navigate to="/" />
            }
          />

          <Route
            path="/pediatrics"
            element={isLoggedIn ? <Pediatrics /> : <Navigate to="/" />
            }
          />

          <Route
            path="/orthopedic"
            element={isLoggedIn ? <Orthopedic /> : <Navigate to="/" />
            }
          />

          <Route
            path="/dermatology"
            element={isLoggedIn ? <Dermatology /> : <Navigate to="/" />
            }
          />

        </Routes>
        <Footer />

      </>

    )
  }
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>

        {loading && <Spinner />}
        <BrowserRouter>
          <AppWrapper />

        </BrowserRouter>
      </ThemeProvider>
    </div>

  );
}

export default App