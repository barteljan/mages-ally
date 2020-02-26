import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import {Routes} from './Routes';
import {SpellsStackScreen} from './Navigation.stack.spells';
import {RollsStackScreen} from './Navigation.stack.rolls';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {localization} from './Navigation.strings';
import {theme} from '../layout/Theme';

const Tab = createBottomTabNavigator();

export function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.disabled,
        showLabel: false,
      }}>
      <Tab.Screen name={Routes.spellsTab} component={SpellsStackScreen} />
      <Tab.Screen name={Routes.rollsTab} component={RollsStackScreen} />
    </Tab.Navigator>
  );
}

type Route = {
  route: RouteProp<Record<string, object | undefined>, string>;
  navigation: any;
};

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

function screenOptions(nav: Route): BottomTabNavigationOptions {
  let title = '';

  switch (nav.route.name) {
    case Routes.spellsTab:
      title = localization.spells_route_title;
      break;
    case Routes.rollsTab:
      title = localization.add_roll_route_title;
      break;
    default:
  }

  return {
    tabBarIcon: (props: TabBarIconProps) => {
      switch (nav.route.name) {
        case Routes.spellsTab:
          return (
            <View style={styles.iconContainer}>
              <Icon name="magic" size={props.size - 3} color={props.color} />
            </View>
          );
        default:
          return (
            <View style={styles.iconContainer}>
              <Image
                source={require('../ressources/images/d10_dark.png')}
                style={{
                  width: props.size + 9,
                  height: props.size + 9,
                  resizeMode: 'contain',
                  tintColor: props.color,
                }}
              />
            </View>
          );
      }
    },
    title: title,
  };
}

let styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
  },
});
