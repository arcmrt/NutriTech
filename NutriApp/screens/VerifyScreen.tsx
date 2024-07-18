import React, { useState } from 'react';
import { View, Text, ImageBackground, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacing from '@/constants/Spacing';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import Colors from '@/constants/colors/Colors';
import FontSize from '@/constants/FontSize';
import InputText from '@/components/InputText';
import { confirmSignUp, ConfirmSignUpInput } from 'aws-amplify/auth';

const { height } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "VerifyScreen">;

const VerificationScreen: React.FC<Props> = ({ route, navigation: { navigate } }) => {
    const { username: initialUsername} = route.params;
    const [username, setUsername] = useState(initialUsername || '');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [error, setError] = useState('');

    async function handleSignUpConfirmation() {
        try {
            const { isSignUpComplete} = await confirmSignUp({
                username,
                confirmationCode
            });
            if (isSignUpComplete) {
                navigate("Home");
            } else {

            }
        } catch (error: any) {
            console.log('Error confirming sign up', error);
            setError(error.message || 'An error occurred. Please try again.');
        }
    }

    return (
        <SafeAreaView>
            <View style={{ padding: Spacing * 2 }}>
                <ImageBackground
                    style={{
                        height: height / 4,
                        marginVertical: Spacing * 2,
                    }}
                    resizeMode="contain"
                    source={require("../assets/images/adaptive-icon.png")}
                />
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        paddingVertical: Spacing * 1.2,
                        paddingHorizontal: Spacing * 1.2,
                        fontWeight: "bold",
                        marginVertical: Spacing,
                        color: Colors.blue,
                        borderRadius: 10,
                        fontSize: FontSize.xxLarge,
                    }}>Register</Text>
                    <Text style={{
                        fontSize: FontSize.large,
                        fontWeight: "bold",
                        width: "85%",
                        textAlign: "center",
                    }}>
                        Welcome! Please confirm to complete your registration.
                    </Text>
                </View>
                <View style={{ marginVertical: Spacing * 3 }}>
                    <InputText
                        placeholder="Confirmation Code"
                        value={confirmationCode}
                        onChangeText={setConfirmationCode}
                    />
                </View>
                {error ? <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text> : null}
                <TouchableOpacity
                    onPress={handleSignUpConfirmation}
                    style={{
                        padding: Spacing * 2,
                        backgroundColor: Colors.blue,
                        borderRadius: 10,
                        marginVertical: Spacing,
                        shadowColor: Colors.blue,
                        shadowOffset: { width: 0, height: Spacing },
                        shadowOpacity: 0.5,
                        shadowRadius: Spacing,
                        elevation: 5,
                    }}>
                    <Text style={{
                        color: Colors.light,
                        textAlign: "center",
                        fontSize: FontSize.large,
                        fontWeight: "bold",
                    }}>
                        Verify
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default VerificationScreen;
