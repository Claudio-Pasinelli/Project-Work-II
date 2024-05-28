export interface FooterLinks {
  classNameContainer: string;
  href: string;
  src: string;
  alt: string;
  classNameElement: string;
  title: string;
}

export const FOOTER_LINKS: Array<FooterLinks> = [
  {
    classNameContainer:
      'w-10 h-fit p-1 border border-black rounded-full bg-white transform transition duration-300 hover:bg-lightblue-50 hover:-translate-y-1',
    href: 'https://www.linkedin.com/in/claudio-pasinelli-599503266/',
    src: '/images/socials/linkedin.webp',
    alt: 'Logo di Linkedin',
    classNameElement: 'size-full',
    title: 'Link al mio account Linkedin',
  },
  {
    classNameContainer:
      'w-10 h-fit p-1 border border-black rounded-full bg-white transform transition duration-300 hover:bg-green-50 hover:-translate-y-1',
    href: 'https://twitter.com/ClaudioPasinel1',
    src: '/images/socials/twitter.webp',
    alt: 'Logo di Twitter',
    classNameElement: 'size-full',
    title: 'Link al mio account Twitter',
  },
  {
    classNameContainer:
      'w-10 h-fit p-1 border border-black rounded-full bg-white transform transition duration-300 hover:bg-amber-50 hover:-translate-y-1',
    href: 'https://github.com/Claudio-Pasinelli',
    src: '/images/socials/github.webp',
    alt: 'Logo di GitHub',
    classNameElement: 'size-full',
    title: 'Link al mio account GitHub',
  },
];
