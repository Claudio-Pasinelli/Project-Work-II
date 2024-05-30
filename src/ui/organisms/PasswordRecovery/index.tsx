import { useState, useEffect } from 'react';
import Form from './Form';

const PasswordRecovery = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const images: string[] = [
    'images/pages/login/login1.jpg',
    'images/pages/login/login2.jpg',
    'images/pages/login/login3.jpg',
    'images/pages/login/login4.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <article
      className="size-full flex justify-center items-center m-0 bg-no-repeat bg-cover sm:justify-start"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
        transition: 'background-image 3s ease-in-out',
      }}>
      <Form />
    </article>
  );
};

export default PasswordRecovery;
