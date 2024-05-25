import { ReactElement } from 'react';
import { BsList } from 'react-icons/bs';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import { MdCheck } from 'react-icons/md';
import { IoEye, IoEyeOff } from 'react-icons/io5';

import { cn } from '../../../utils/helpers/tailwindMerge';
import {
  Close,
  Delete,
  Edit,
  Login,
  Logout,
  New,
  Reset,
  RightArrow,
  Search,
  Settings,
} from '../Icons';
type ReactIconsName =
  // | 'checked'
  // | 'list'
  | 'reset'
  | 'rightArrow'
  | 'search'
  | 'settings'
  | 'new'
  | 'edit'
  | 'delete'
  | 'login'
  | 'logout'
  | 'close'
  | 'dropDown'
  | 'dropUp'
  | 'eyeOn'
  | 'eyeOff';

interface Props {
  name: ReactIconsName;
  current?: boolean;
  size?: number;
  iconColor?: string;
  activeColor?: string;
  hoverColor?: string;
  iconClassName?: string;
}

const IconSvg = ({
  name,
  current,
  size = 6,
  iconColor,
  activeColor = 'white',
  hoverColor = 'white',
  iconClassName,
}: Props): ReactElement => {
  const iconStyle = cn(
    current && !iconColor
      ? `text-${activeColor}-00`
      : `text-${iconColor}-300 group-hover:text-${hoverColor}-50`,
    iconClassName,
  );

  const Icons = {
    // checked: <MdCheck className={iconStyle} size={size} aria-hidden="true" />, // no(?)
    // list: <BsList className={iconStyle} size={size} aria-hidden="true" />, // no(?)
    dropDown: <HiOutlineChevronDown className={iconStyle} size={size} aria-hidden="true" />, // no(?)
    dropUp: <HiOutlineChevronUp className={iconStyle} size={size} aria-hidden="true" />, // no(?)
    reset: <Reset className={iconStyle} color={iconColor} size={size} aria-hidden="true" />,
    rightArrow: (
      <RightArrow className={iconStyle} color={iconColor} size={size} aria-hidden="true" />
    ),
    search: <Search className={iconStyle} color={iconColor} size={size} aria-hidden="true" />,
    settings: <Settings className={iconStyle} color={iconColor} size={size} aria-hidden="true" />,
    new: <New className={iconStyle} color={iconColor} size={size} aria-hidden="true" />,
    edit: <Edit className={iconStyle} color={iconColor} size={size} aria-hidden="true" />,
    delete: <Delete className={iconStyle} size={size} aria-hidden="true" />,
    login: <Login className={iconStyle} color={iconColor} size={size} aria-hidden="true" />,
    logout: <Logout className={iconStyle} color={iconColor} size={size} aria-hidden="true" />,
    close: <Close className={iconStyle} color={iconColor} size={size} aria-hidden="true" />,
    eyeOn: <IoEye className={iconStyle} color={iconColor} size={size} aria-hidden="true" />,
    eyeOff: <IoEyeOff className={iconStyle} color={iconColor} size={size} aria-hidden="true" />,
  };
  return Icons[name];
};

export default IconSvg;
export type { ReactIconsName };
