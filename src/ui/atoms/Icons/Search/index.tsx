import { cn } from '../../../../utils/helpers/tailwindMerge';

interface Props {
  size: number;
  color?: string;
  className?: string;
}

function Search({ size = 24, color = '#000000', className }: Props) {
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
        d="M430 1274c-187-36-341-167-400-340-101-291 79-606 384-671 127-27 258-2 380 73l58 37 187-187C1141 84 1232 0 1241 0c19 0 39 20 39 39 0 9-84 100-186 202L908 427l41 69c23 38 48 91 56 119 79 263-65 546-323 636-56 20-201 33-252 23zm172-85c223-47 380-274 340-489-35-192-176-331-367-362-174-29-369 73-447 233-158 325 123 692 474 618z"
        transform="matrix(.1 0 0 -.1 0 128)"></path>
    </svg>
  );
}

export default Search;
