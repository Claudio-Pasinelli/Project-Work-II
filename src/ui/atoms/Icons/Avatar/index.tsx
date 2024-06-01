import { cn } from '../../../../utils/helpers/tailwindMerge';

interface Props {
  size: number;
  color?: string;
  className?: string;
}

function Avatar({ size = 24, color = '#000000', className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 66 66"
      height={size}
      width={size}
      className={cn(className)}>
      <path
        fill={color}
        d="M247 618c-129-75-76-273 73-273 110 0 179 110 130 210-38 79-127 107-203 63zm123-33c32-17 60-61 60-95 0-53-57-110-110-110s-110 57-110 110c0 33 28 78 58 94 35 20 66 20 102 1zM257 310c-59-15-110-45-150-89-47-52-66-90-74-147C23 0 23 0 320 0c298 0 297 0 287 75-22 154-198 272-350 235zm130-45c73-22 126-64 157-126 14-29 26-63 26-76V40H70v23c0 38 50 126 87 154 36 28 123 62 159 63 11 0 43-7 71-15z"
        transform="matrix(.1 0 0 -.1 0 64)"></path>
    </svg>
  );
}

export default Avatar;
