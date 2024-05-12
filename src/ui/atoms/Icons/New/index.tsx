import { cn } from '../../../../utils/helpers/tailwindMerge';

interface Props {
  size: number;
  color?: string;
  className?: string;
}

function New({ size = 24, color = '#000000', className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 128 128"
      height={size}
      width={size}
      className={cn(className)}>
      <path
        fill={color}
        d="M501 1265c-110-24-226-89-311-175-250-250-252-649-5-895C307 74 441 12 604 3c292-16 560 170 649 452 31 99 31 271 0 370-101 318-428 510-752 440zm245-76c98-17 210-78 288-155 219-220 219-568 0-788-220-220-568-219-789 2-270 269-194 722 148 891 118 58 225 73 353 50z"
        transform="matrix(.1 0 0 -.1 0 128)"></path>
      <path
        fill={color}
        d="M607 924c-4-4-7-60-7-125V681l-122-3-123-3v-70l123-3 122-3V491c0-60 3-116 6-125 8-21 60-21 68 0 3 9 6 65 6 125v109h109c60 0 116 3 125 6 21 8 21 60 0 68-9 3-65 6-125 6H681l-3 123-3 122-30 3c-17 2-34 0-38-4z"
        transform="matrix(.1 0 0 -.1 0 128)"></path>
    </svg>
  );
}

export default New;
