import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import Colors from "../constants/colors/Colors";
  import Font from "../constants/Font";
  import FontSize from "../constants/FontSize";
  import Spacing from "../constants/Spacing";
  
  const AppTextInput: React.FC<TextInputProps> = ({ ...otherProps }) => {
    const [focused, setFocused] = useState<boolean>(false);
    return (
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={Colors.darkText}
        style={[
          {
            fontSize: FontSize.small,
            padding: Spacing * 2,
            backgroundColor: "#eeeeee",
            borderRadius: Spacing,
            marginVertical: Spacing,
          },
          focused && {
            borderWidth: 3,
            borderColor: Colors.blue,
            shadowOffset: { width: 4, height: Spacing },
            shadowColor: Colors.blue,
            shadowOpacity: 0.2,
            shadowRadius: Spacing,
          },
        ]}
        {...otherProps}
      />
    );
  };
  
  export default AppTextInput;
  
  const styles = StyleSheet.create({});