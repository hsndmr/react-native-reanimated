import { NavigationProp } from "@react-navigation/native";
import { Button, StyleSheet, View } from "react-native";

interface Props {
  navigation: NavigationProp<any>;
}

export default function HomeScreen(props: Props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Button
        title="Introduction"
        onPress={() => {
          navigation.navigate("Introduction");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
