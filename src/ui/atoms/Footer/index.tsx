import { A } from '..';
import { FOOTER_LINKS } from '../../../utils/data';
import { FooterLink } from '../../molecules';

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
        {FOOTER_LINKS.map((link) => (
          <FooterLink
            key={link.title + link.alt}
            classNameContainer={link.classNameContainer}
            href={link.href}
            src={link.src}
            alt={link.alt}
            classNameElement={link.classNameElement}
            title={link.title}
          />
        ))}
      </section>
    </footer>
  );
};

export default Footer;
