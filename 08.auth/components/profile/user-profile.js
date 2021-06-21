import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  const router = useRouter();
  // Redirect away if NOT auth
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getSession().then(session => {
  //     if (!session) {
  //       window.location.href = '/auth';
  //       return;
  //     }

  //     setIsLoading(false);
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  async function changePasswordHandler(passwordData) {
    try {
      //send the password to the api
      const response = await fetch('/api/users/change-password', {
        method: 'PATCH',
        body: JSON.stringify(passwordData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      console.log(response);
      console.log(data);

      //handle errors
      if (!response.ok) {
        throw new Error(
          data.message ||
            'Something went wrong! Please resubmit again or contact the administrator.'
        );
      }

      //redirect to the profile page
      router.replace('/profile');

      console.log(data);
    } catch (error) {
      //handle errors
      console.error(`💥💥💥, ${error}`);
      //throw error; //Can't re-throw errors through props
    }
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
