import { FC } from 'react';
import { Slide } from 'react-slideshow-image';
import css from './Product.module.css';

interface Props {
  images: string[];
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
    <div className="slide-container">
      <Slide easing="ease" duration={700} indicators autoplay={false}>
        {images.map(image => {
          const url = image;
          return (
            <div key={image} className={css['each-slide']}>
              <div
                style={{
                  backgroundImage: `url(${url})`,
                  backgroundSize: 'cover'
                }}
              ></div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
};
