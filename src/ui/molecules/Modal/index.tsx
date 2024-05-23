import { ReactElement, useRef } from 'react';
import { cn } from '../../../utils/helpers/tailwindMerge';
import { useOnClickOutside } from '../../../utils/hooks';

interface Props {
  children: ReactElement;
  isOpen: boolean;
  handleIsOpen: (isOpen: boolean) => void;
}

const Modal = ({ children, isOpen, handleIsOpen }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => handleIsOpen(false));

  const handleCloseModal = () => {
    handleIsOpen(false);
  };

  return (
    <article
      className={cn(
        'fixed inset-0 flex items-center justify-center bg-gray-300/40 z-50',
        isOpen ? 'block' : 'hidden',
      )}>
      <div
        ref={ref}
        className="w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center"
        onClick={handleCloseModal}>
        <div
          className="w-96 h-44 bg-white border border-gray-200 rounded-[1.563rem] shadow-xl"
          onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </article>
  );
};

export default Modal;
