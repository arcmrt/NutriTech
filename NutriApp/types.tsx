/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserProfile, UserInfo } from "./profileClass/profile";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  VerifyScreen: { username: string };
  Home:{username: string};
  VitalsForm:{username: string};
  Profile:{username: string, profile: UserInfo};
  Details:{username: string};
  Settings:{username: string};
  Recipes: {username: string};
  Recipe:{userName: string, recipeId: string};
  Favorites:{info: any};

  getRecipes:{username: string};
};

/**
 * Represents the props for the root stack screen.
 * @template Screen - The type of the screen in the root stack.
 */
export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, Screen>;

/**
The import { NativeStackScreenProps } from "@react-navigation/native-stack"; statement is importing a type from the @react-navigation/native-stack package. NativeStackScreenProps is a type that represents the properties passed to a screen in a native stack navigator.

The declare global block is extending the global namespace with a new interface RootParamList. This is a TypeScript way of adding new types or interfaces to the global scope. Here, it's extending the ReactNavigation namespace with a new interface RootParamList that extends RootStackParamList.

The RootStackParamList is a type that represents the list of screens in the root stack navigator. It's an object where keys are the names of the screens (Welcome, Login, Register) and the values are the parameters for those screens. In this case, all screens are defined with undefined as they don't have any parameters.

Finally, RootStackScreenProps is a type that represents the props for a screen in the root stack. It's a generic type that takes a Screen parameter, which should be a key of RootStackParamList. The type is defined as NativeStackScreenProps<RootStackParamList, Screen>, meaning it represents the props for a screen in a native stack navigator, where the screen is part of the RootStackParamList.
*/ 