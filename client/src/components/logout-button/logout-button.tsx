import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({
          logoutParams: {
            returnTo: import.meta.env.PROD
              ? 'https://your-macros.onrender.com/dashboard'
              : 'http://localhost:5173/dashboard',
          },
        })
      }
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
