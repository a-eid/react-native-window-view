import * as React from 'react';

import { Button, StyleSheet, View, Modal } from 'react-native';
import RNWindowView from 'react-native-window-view';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from 'react-native-screens/native-stack';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';

function Home({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ParamListBase>;
}) {
  const [shown, setShown] = React.useState(true);
  const [draggable, setDraggable] = React.useState(true);
  const [isShowModal, setIsShowModal] = React.useState(false);

  return (
    <View style={styles.container}>
      <Button title="Show/hide window view" onPress={() => setShown(!shown)} />
      <Button
        title="Enable/disable dragging behavior"
        onPress={() => setDraggable(!draggable)}
      />
      <Button title="show rn modal" onPress={() => setIsShowModal(true)} />
      <Button
        title="Go to RNScreens modal"
        onPress={() => navigation.navigate('Modal')}
      />
      <Modal
        animationType="slide"
        visible={isShowModal}
        presentationStyle="pageSheet"
      >
        <View style={styles.container}>
          <Button
            title="dismiss rn modal"
            onPress={() => setIsShowModal(false)}
          />
          <Button
            title="Show/hide window view"
            onPress={() => setShown(!shown)}
          />
        </View>
      </Modal>
      <RNWindowView shown={shown} draggable={draggable}>
        <View style={styles.box} />
        <Button title="click me" onPress={() => console.warn('clicked')} />
      </RNWindowView>
    </View>
  );
}

function ModalScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ParamListBase>;
}) {
  return (
    <View style={styles.container}>
      <Button title="dismiss modal" onPress={() => navigation.goBack()} />
    </View>
  );
}

const NativeStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeStack.Navigator>
        <NativeStack.Screen name="Home" component={Home} />
        <NativeStack.Screen
          name="Modal"
          component={ModalScreen}
          options={{ stackPresentation: 'modal' }}
        />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  box: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'red',
  },
});
