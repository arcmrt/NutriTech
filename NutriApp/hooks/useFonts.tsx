// hooks/useFonts.ts
import { useEffect, useState } from 'react';
import { loadFont } from 'react-native-vector-icons/Fonts';

const useFonts = async () => {
  await loadFont({
    'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });
};

export default useFonts;
