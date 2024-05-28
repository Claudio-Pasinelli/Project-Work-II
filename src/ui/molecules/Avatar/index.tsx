import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES, User } from '../../../utils';

interface Props {
  userData: User | null;
  isMe?: boolean | null;
  title?: string | undefined;
}

const Avatar = ({ userData, isMe = false, title }: Props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [meId, setMeId] = useState<string | undefined>(undefined);

  const navigateToUserPage = (userId: string, isMe: boolean | null) => {
    if (isMe === true) {
      navigate(ROUTES.myRecipes);
    } else if (isMe === false && userId) {
      navigate(`${ROUTES.users}/${userId}`);
    }
  };

  const fetchUser = async () => {
    try {
      if (userData && userData.id) {
        const nameParts = userData.name.split(' ');
        let initials = '';
        if (nameParts.length === 1) {
          initials = nameParts[0].charAt(0) + nameParts[0].charAt(nameParts[0].length - 1);
        } else {
          initials = nameParts.map((part: string) => part.charAt(0)).join('');
        }
        setUsername(initials.toUpperCase());
        setMeId(userData.id);
      } else {
        setUsername('NR');
        setMeId(undefined);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userData]);

  return (
    <figure
      className="size-11 flex bg-gray-50 border border-black rounded-full justify-center items-center cursor-pointer shadow-xl"
      onClick={() => meId && navigateToUserPage(meId, isMe)}
      title={title ? title : undefined}>
      <p>{username}</p>
    </figure>
  );
};

export default Avatar;
