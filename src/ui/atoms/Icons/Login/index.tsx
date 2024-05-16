import { cn } from '../../../../utils/helpers/tailwindMerge';

interface Props {
  size: number;
  color?: string;
  className?: string;
}

function Login({ size = 24, color = '#000000', className }: Props) {
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
        d="M82 624c-22-15-22-17-22-304S60 31 82 16C100 3 139 0 296 0h193l21 27c18 23 20 38 18 116-2 61-7 92-15 95-10 3-13-20-13-91 0-68-4-98-14-106-9-8-72-11-202-9L95 35v570l189 3c130 2 193-1 202-9 10-8 14-38 14-106 0-71 3-94 13-91 8 3 13 34 15 95 2 78 0 93-18 116l-21 27H296c-157 0-196-3-214-16z"
        transform="matrix(.1 0 0 -.1 0 64)"></path>
      <path
        fill={color}
        d="M292 377c-29-29-52-57-52-63 0-14 93-104 108-104 20 0 14 15-24 51l-35 34 165 5c219 7 219 23 0 30l-165 5 35 34c33 32 47 61 28 61-4 0-31-24-60-53z"
        transform="matrix(.1 0 0 -.1 0 64)"></path>
    </svg>
  );
}

export default Login;
