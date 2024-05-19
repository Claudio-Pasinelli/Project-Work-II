import { cn } from '../../../../utils/helpers/tailwindMerge';

interface Props {
  size: number;
  color?: string;
  className?: string;
}

function RightArrow({ size = 24, color = '#000000', className }: Props) {
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
        d="M82 628c-16-16-17-321-1-369 19-56 59-100 113-125 43-20 67-24 155-24h103l-31-35c-26-29-29-39-21-55 17-31 37-24 100 36 84 80 84 84 9 160-63 64-101 80-113 49-3-9 7-29 24-49 17-18 30-37 30-41s-47-6-104-3c-116 5-156 22-191 80-17 29-21 56-25 208-4 146-8 175-20 178-9 1-21-3-28-10z"
        transform="matrix(.1 0 0 -.1 0 64)"></path>
    </svg>
  );
}

export default RightArrow;
