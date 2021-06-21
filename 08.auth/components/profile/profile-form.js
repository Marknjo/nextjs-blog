import { useRef } from 'react';
import classes from './profile-form.module.css';

function ProfileForm(props) {
  const oldPasswordInput = useRef();
  const newPasswordInput = useRef();

  function changePasswordHandler(event) {
    try {
      event.preventDefault();

      const enteredOldPassword = oldPasswordInput.current.value.trim();
      const enteredNewPassword = newPasswordInput.current.value.trim();

      //validate
      if (!enteredNewPassword || !enteredOldPassword) {
        throw new Error('Password Field empty!');
      }

      props.onChangePassword({
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
      });

      //no errors
      /// redirect to  the profile page
      oldPasswordInput.current.value = '';
      newPasswordInput.current.value = '';
    } catch (error) {
      //handle errors
      console.error(`💥💥💥 ${error.message}`);
    }
  }

  return (
    <form
      className={classes.form}
      action="patch"
      onSubmit={changePasswordHandler}
    >
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input
          ref={oldPasswordInput}
          name="password"
          type="password"
          id="old-password"
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          ref={newPasswordInput}
          name="password"
          type="password"
          id="new-password"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
