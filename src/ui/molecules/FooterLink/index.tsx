import { A } from '../../atoms';

interface Props {
  classNameContainer: string;
  href: string;
  src: string;
  alt: string;
  classNameElement: string;
  title: string;
}

const FooterLink = ({ classNameContainer, href, src, alt, classNameElement, title }: Props) => {
  return (
    <figure className={classNameContainer}>
      <A href={href} target="_blank" icon={true}>
        <img src={src} alt={alt} className={classNameElement} title={title} />
      </A>
    </figure>
  );
};

export default FooterLink;
