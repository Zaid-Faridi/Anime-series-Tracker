import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabs } from './MainTabs';
import { DetailScreen } from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={MainTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={({ route }: any) => ({ title: route.params.anime.title })}
            />
        </Stack.Navigator>
    );
};
