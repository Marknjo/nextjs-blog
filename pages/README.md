# :rocket: Handling authentication in NextJs Apps

This section was all about handling authentication. We used the next-auth library to handle authentications through jwt sessions.

## :balloon: Skills Gained in the Session

- User registration - data was stored in MongoDb (email, and password)
- Handling login - using the nex-auth library. using the signIn next-auth method to submit data to the credentials provider. The api aside was custom rather than out of the box as provided by the next-auth.
- Handling client side validation - using the next-auth getSession() method,and react hooks the useState, useEffect, and useRouter (next route hook) to redirect user. The reason was to display a loading/spinner component before retrieving the session.
- Protecting protected pages/Server side redirection - here we used the getSession() to grab the state using the getServerSideProps hook on the protected routes. The session object was stored in the props, which is useful in optimizing session requests in case users reload pages.
- Login out user - using routes signOut() methed; - clears the session.
- Hiding or showing UI elements based on JWT sessions - this is showing elements based on whether a user is logged in or not.
- Password reset - this was a bit complex as it involves the following steps
  - Determing if a user is logged in - that means, using the getSession() next auth, passing current req to determing if the user is logged in before submiting collecting user email stored in the session
  - Getting the user email stored in the session and determing if it is a valid user email.
  - Validating the submitted passwords (old & new)
  - Fetching the old password from MongoDb and veryfying if it is valid
  - Hashing the newPassword
  - Updating the newHashed password in the MongoDb
  - handling all types of errors in the whole transaction

## :bookmark_tabs: Footnotes

- This section was intensive compared to what I had envisioned. It took me two days rather than two sittings.
- I did a stupid mistake by putting an api (the catch all nextAuth route) in a differnt folder (component/auth) - this made me debug for hours only to realize my silly mistake.
- The section only covers a fraction of the next-auth authentication. There is a lot into it I need to experiment on. However, this section has set the ground, it is up to me to do the rest.
