import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Main from "./pages/Main";
import Profile from "./pages/Profile";

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          title: "devRadar - Gab"
        }
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          title: "Perfil do Github"
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerTintColor: "#fff",
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: "#fa0f84"
        }
      }
    }
  )
);

export default Routes;
