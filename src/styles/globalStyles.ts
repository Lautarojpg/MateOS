import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#121212",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  navbar: {
    backgroundColor: "#1E1E1E",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  links: {
    flexDirection: "row",
    gap: 18,
  },

  link: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

});