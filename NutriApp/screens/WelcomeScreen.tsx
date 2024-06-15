import React from "react";
import { Dimensions, ImageBackground, 
         SafeAreaView,
         Text,
         View,
 } from "react-native"; 
import Spacing from "../constants/Spacing";
import FontSize from "@/constants/FontSize";
import Colors from "@/constants/colors/Colors";
import Fonts from "@/constants/Font";

 const {height} = Dimensions.get("window")

 const WelcomeScreen = () => {
    return (
        <SafeAreaView>
            <View>
                <ImageBackground 
                    style={{
                        height: height / 2.5,
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

            </View>
        </SafeAreaView>
    );
 };

 export default WelcomeScreen;