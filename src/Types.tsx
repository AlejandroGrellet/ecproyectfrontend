import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';


// Define the types for the navigation stack
type RootStackParamList = {
    Home: undefined, // undefined because you aren't passing any params to the home screen
    Details: undefined;
    Register: undefined;
    Login: undefined;
    AddService: undefined;
    ListEmployees: undefined;
    ListDayServices: undefined;
    ManageServices: undefined;
    Logout: undefined;
  };
  // Define the types for the navigation stack
  
  //Create the stack
  const Stack = createStackNavigator<RootStackParamList>();
  //Create the stack
  
  // Define the navigation prop types
  type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Home'
  >;
  // Define the navigation prop types
  
type Props = {
    navigation: ProfileScreenNavigationProp;
  };
export type {Props};
export {Stack};
  