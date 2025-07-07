// CustomButton.jsx
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CustomButton({ title, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
  backgroundColor: "#007B8C", // un azul verdoso profesional
  padding: 14,
  borderRadius: 10,
  alignItems: "center",
  marginVertical: 12,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 5, // para Android
},

  text: {
    color: "#FFFFFF", // blanco para texto del botón
    fontWeight: "bold",
    fontSize: 16,
  },
});
