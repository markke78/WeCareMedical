/* eslint-disable react/prop-types */

import Item from './Item';
import Carousel from 'react-material-ui-carousel';
import slider from '../helper/slider.json'



export default function CarouselShow() { 

  
  return (  
    <section>
      <Carousel>
        {
          slider.map(item => <Item key={item.id} item={item} />)
        }
      </Carousel>

    </section>
      

  );
}

