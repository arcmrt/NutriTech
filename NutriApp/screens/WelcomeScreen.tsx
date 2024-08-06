import React, { useEffect } from "react";
import { Dimensions,
         ImageBackground, 
         Text,
         TouchableOpacity,
         View,
 } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; 
import Spacing from "../constants/Spacing";
import FontSize from "@/constants/FontSize";
import Colors from "@/constants/colors/Colors";
import Fonts from "@/constants/Font";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import {signOut} from "@aws-amplify/auth";

 const {height} = Dimensions.get("window");

 type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;


 const WelcomeScreen:React.FC<Props> = ({navigation:{navigate}}) => {

    /**
    useEffect(() => {
        handleSignOut();
      }, []);

     async function handleSignOut() {
         try {
             await signOut();
             console.log('sign out success');
         } catch (error) {
             console.log('error signing out: ', error);
         }
     }
    */
     return (
        <SafeAreaView>
            <View>
                <ImageBackground 
                    style={{
                        height: height / 2.5,
                        alignContent: "center",
                        //backgroundColor: Colors.blue,
                        marginTop: Spacing * 5,
                    }}
                    resizeMode="contain"
                    source={require("../assets/images/welcome-img.png")}
                />
                <View style = {{
                    paddingHorizontal: Spacing * 4,
                    paddingTop: Spacing * 4,
                    
                }}/>
                <Text style={{
                    fontSize: FontSize.xxLarge,
                    color: Colors.blue,
                    fontWeight: "bold",
                    fontStyle: "italic",
                    //fontFamily: Fonts["poppins-bold"],
                    textAlign: "center"
                }}> 
                    Discover all about what you eat
                </Text>
                <Text style={{
                    fontSize: FontSize.large,
                    color: Colors.blue,
                    fontWeight: "bold",
                    fontStyle: "italic",
                    //fontFamily: Fonts["poppins-bold"],
                    textAlign: "center",
                    marginTop: Spacing * 1,
                }}>
                    Explore the world of nutrition
                </Text>
            </View>
            <View
                style={{
                    paddingHorizontal: Spacing * 2,
                    paddingTop: Spacing * 10,
                    flexDirection: "row",
                }}>
                <TouchableOpacity
                    onPress={() => navigate("Login")} 
                    style={{
                        paddingVertical: Spacing * 1.5,
                        paddingHorizontal: Spacing * 2,
                        width: "48%",
                        borderRadius: 10,
                        shadowColor: Colors.blue,
                        shadowOffset: {
                            width: 0,
                            height: Spacing,
                        },
                        shadowOpacity: 0.5, // modify
                        shadowRadius: 10,

                        elevation: 10, // For Android
                        
                        backgroundColor: Colors.blue,

                    }}>
                    <Text style={{
                        fontSize: FontSize.large,
                        fontWeight: "bold",
                        color: Colors.light,
                        //fontFamily: Fonts["poppins-bold"],
                        textAlign: "center",
                    }}>
                        Login
                    </Text>
                </TouchableOpacity>
                <View style={{width: "4%"}}/>
                <TouchableOpacity
                    onPress={() => navigate("Register")} 
                    style={{
                        paddingVertical: Spacing * 1.5,
                        paddingHorizontal: Spacing * 2,
                        width: "48%",
                        borderRadius: 10,
                        backgroundColor: Colors.light,
                        shadowColor: Colors.text,
                        shadowOffset: {
                            width: 0,
                            height: Spacing,
                        },
                        shadowOpacity: 0.5, // modify
                        shadowRadius: 10,

                        elevation: 10, // For Android
                    }}>
                    <Text style={{
                        fontSize: FontSize.large,
                        fontWeight: "bold",
                        color: "black",
                        //fontFamily: Fonts["poppins-bold"],
                        textAlign: "center",
                    }}>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{
                paddingHorizontal: Spacing ,
                paddingTop: Spacing,
                alignContent: "center",
                justifyContent: "center",
            }}>
            <TouchableOpacity
                    onPress={() => navigate("Home")} 
                    style={{
                        paddingVertical: Spacing * 1.5,
                        paddingHorizontal: Spacing * 2,
                        width: "52%",
                        borderRadius: 10,
                        backgroundColor: Colors.light,
                        shadowColor: Colors.text,
                        shadowOffset: {
                            width: 0,
                            height: Spacing,
                        },
                        shadowOpacity: 0.5, // modify
                        shadowRadius: 10,

                        elevation: 10, // For Android
                    }}>
                    <Text style={{
                        fontSize: FontSize.large,
                        fontWeight: "bold",
                        color: "black",
                        //fontFamily: Fonts["poppins-bold"],
                        textAlign: "center",
                    }}>
                        Dev Pass
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
 };

 export default WelcomeScreen;