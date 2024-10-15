import './Category.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



export default function Category() {

  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();

  return (
    <div className='connect' style={{ backgroundColor: darkMode ? '#333' : '#f2f2f2' }}>

        <h1 className='heading' style={{ color: darkMode ? '#f5f0f0' : 'inherit' }}>Our Department</h1>
            
        <div className='category'style={{ backgroundColor: darkMode ? '#333' : '#f2f2f2' }}>

            <div className='container'>
            <div className='card family-doctors'>
            <div className='box'>
              <div className="content">
                <h2>01</h2>
                <h3>Family Doctors</h3>
                <button onClick={() => navigate("/familydoctor")}>Read More</button> 
              </div>
            </div>
          </div>

          <div className='card cardiology'> {/* Add the cardiology class */}
            <div className='box'>
              <div className="content">
                <h2>02</h2>
                <h3>Cardiology</h3>
                <button onClick={() => navigate("/cardiologist")}>Read More</button>                
              </div>
            </div>
          </div>

                <div className='card neurology'> {/* Add the neurology class */}
            <div className='box'>
              <div className="content">
                <h2>03</h2>
                <h3>Neurology</h3>
                <button onClick={() => navigate("/neurology")}>Read More</button> 
              </div>
            </div>
          </div>

                <div className='card pediatrics'> {/* Add the pediatrics class */}
            <div className='box'>
              <div className="content">
                <h2>04</h2>
                <h3>Pediatrics</h3>
                <button onClick={() => navigate("/pediatrics")}>Read More</button> 
              </div>
            </div>
          </div>

          <div className='card orthopedics'> {/* Add the orthopedics class */}
            <div className='box'>
              <div className="content">
                <h2>05</h2>
                <h3>Orthopedics</h3>
                <button onClick={() => navigate("/orthopedic")}>Read More</button> 
              </div>
            </div>
          </div>

          <div className='card dermatology'> {/* Add the dermatology class */}
            <div className='box'>
              <div className="content">
                <h2>06</h2>
                <h3>Dermatology</h3>
                <button onClick={() => navigate("/dermatology")}>Read More</button> 
              </div>
            </div>
          </div>
            </div>

        </div>
    </div>
    
    
  )
}
