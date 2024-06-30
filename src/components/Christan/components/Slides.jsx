import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExSlides';

function Slides() {
  return (
    <div style={{height:"200%"}}>
        <Carousel indicators={false}>
          <Carousel.Item>
            <ExampleCarouselImage  />
            <Carousel.Caption>
        
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage />
            <Carousel.Caption>
        
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <ExampleCarouselImage  />
            <Carousel.Caption>
        
        
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
    </div>
  );
}

export default Slides;