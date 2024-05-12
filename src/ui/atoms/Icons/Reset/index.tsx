import { cn } from '../../../../utils/helpers/tailwindMerge';

interface Props {
  size: number;
  color?: string;
  className?: string;
}

function Reset({ size = 24, color = '#000000', className }: Props) {
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
        d="M28 628c-3-7-3-55 0-105 3-69 8-93 18-93 37 0 171 24 181 32 27 22 0 30-71 23l-71-7 23 25c13 13 46 37 75 53 45 25 63 29 127 29 80 0 126-17 188-70 109-92 109-308 0-400-62-53-108-70-188-70-65 0-82 4-128 29-54 30-100 79-123 129-15 33-39 35-39 4 0-49 87-143 165-179C296-22 447 7 534 96c68 69 81 106 81 219 0 114-14 151-82 218-65 66-125 91-218 91-91 1-157-23-212-76l-32-31-7 62c-4 39-11 61-19 61-7 0-15-6-17-12z"
        transform="matrix(.1 0 0 -.1 0 64)"></path>
    </svg>
  );
}

export default Reset;
