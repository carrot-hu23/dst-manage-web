// ----------------------------------------------------------------------
const userJson = localStorage.getItem('user');
const user = JSON.parse(userJson);
console.log('user', user);

if(user.displayName=== undefined) {
  user.displayName = ''
  user.email = ''
  user.photoURL = ''
}

const account = {
  displayName: user.displayName,
  email: user.email,
  photoURL: user.photoURL,
};

export default account;
