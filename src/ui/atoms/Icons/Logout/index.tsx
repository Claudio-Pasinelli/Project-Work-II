import { cn } from '../../../../utils/helpers/tailwindMerge';

interface Props {
  size: number;
  color?: string;
  className?: string;
}

function Logout({ size = 24, color = '#000000', className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 64 64"
      height={size}
      width={size}
      className={cn(className)}>
      <path
        fill={color}
        d="M33 606L5 582V58l28-24c27-23 33-24 197-24s170 1 197 24 28 28 28 113c0 72-3 88-15 88s-16-16-18-75c-4-111-3-110-192-110C91 50 71 52 57 68c-15 16-17 49-17 254 0 215 2 236 18 251 16 14 43 17 174 17 186 0 185 0 190-105 2-54 6-70 18-70s15 16 15 83c0 79-1 85-28 108s-33 24-197 24-170-1-197-24z"
        transform="matrix(.1 0 0 -.1 0 64)"></path>
      <path
        fill={color}
        d="M490 418c0-7 17-27 37-45l38-32-157-1c-151 0-158-1-158-20s7-20 158-20l157-1-38-32c-20-18-37-38-37-44 0-27 38-11 95 42l60 55-59 55c-56 52-96 70-96 43z"
        transform="matrix(.1 0 0 -.1 0 64)"></path>
    </svg>
  );
}

export default Logout;
