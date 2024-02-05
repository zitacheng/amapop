import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const logIn = async ({username, password}) => {
  // const { username, password } = user;
  console.log("user info", username);

  const response = await axios.post('http://192.168.1.49:1337/api/auth/local', {
        identifier: username,
        password: password,
    })
   
    console.log("res ", response);
    // Handle success.
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
    // alert('Log in successful');
    if (response.status == 200) {
      console.log("2000000", JSON.stringify(response.data))
      await AsyncStorage.setItem("user", JSON.stringify(response.data));
      // navigation.navigate('TabScreen');
      return {
          status: "success",
          message: "You are redirecting to home page",
          user: response.data,
        };
    }
    else {
          // Handle error.
    alert("Erreur de connexion, vérifiez le mot de passe ou l'email / nom d'utilisateur");
    return {
      status: "failed",
      message: "Erreur de connexion, vérifiez le mot de passe ou l'email / nom d'utilisateur",
      user: response.data,
    };
    }
};
const logOut = async () => {
  AsyncStorage.clear();
  console.log("cleared")
  return {
    status: "success",
    message: "You are logged out",
  };
};
export default {
  logIn,
  logOut,
};