import { useState, useEffect } from 'react';
import Form from './Form';

const Login = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const images: string[] = ['images/pages/login/login1.jpg', 'images/pages/login/login2.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <article
      className="size-full flex justify-center items-center m-0 bg-no-repeat bg-cover sm:justify-start"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
        transition: 'background-image 1s ease-in-out',
      }}>
      <Form />
    </article>
  );
};

export default Login;
