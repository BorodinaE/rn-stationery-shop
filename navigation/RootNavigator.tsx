import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import AuthScreen from '../screens/AuthScreen';
import HeaderCartButton from '../components/HeaderCartButton';
import { useAuthStore } from '../stores/authStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  // Если токена нет — показываем экран авторизации, иначе — основной стек.
  const token = useAuthStore((s) => s.token);
  const signOut = useAuthStore((s) => s.signOut);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token === null ? (
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="ProductList"
              component={ProductListScreen}
              options={{
                title: 'Канцтовары',
                headerRight: () => <HeaderCartButton />,
                headerLeft: () => <Button title="Выйти" onPress={signOut} />,
              }}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetailsScreen}
              options={{
                title: 'Товар',
                headerRight: () => <HeaderCartButton />,
              }}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{ title: 'Корзина' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
