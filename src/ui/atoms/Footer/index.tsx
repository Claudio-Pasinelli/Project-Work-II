import { A } from '..';

const Footer = () => {
  return (
    <footer className="w-full h-fit bg-gray-100 text-black flex flex-col items-center text-center justify-between px-0 py-8 gap-8 sm:flex-row sm:justify-center sm:text-left sm:gap-24 sm:py-4 md:justify-between md:px-4 lg:px-10">
      <section>
        <article className="font-medium">
          <p>Claudio Pasinelli</p>
          <p>ICT 22/24</p>
        </article>
      </section>
      <section className="flex flex-row items-center justify-between border-solid px-12 gap-12 sm:border-gray-100 sm:border-l-2 sm:pl-24 md:px-4 md:gap-4 md:pl-8 lg:pl-16">
        <figure className="w-10 h-fit p-1 border border-black rounded-full bg-white">
          <A
            href="https://www.linkedin.com/in/claudio-pasinelli-599503266/"
            target="_blank"
            icon={true}>
            <img src="/images/socials/linkedin.webp" alt="logo linkedin" className="size-full" />
          </A>
        </figure>
        <figure className="w-10 h-fit p-1 border border-black rounded-full bg-white">
          <A href="https://twitter.com/ClaudioPasinel1" target="_blank" icon={true}>
            <img src="/images/socials/twitter.webp" alt="logo twitter" className="size-full" />
          </A>
        </figure>
        <figure className="w-10 h-fit p-1 border border-black rounded-full bg-white">
          <A href="https://github.com/Claudio-Pasinelli" target="_blank" icon={true}>
            <img src="/images/socials/github.webp" alt="logo github" className="size-full" />
          </A>
        </figure>
      </section>
    </footer>
  );
};

export default Footer;
