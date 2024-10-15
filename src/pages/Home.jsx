
import DoctorList from './DoctorListPage';
import CarouselShow from '../components/CarouselShow';
import Category from '../components/Category';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('home page');
    navigate('/');
  }
  , []);


  return (
    <div>  
        <CarouselShow />
        <Category />
        <DoctorList /> 
    </div>
  );
}
