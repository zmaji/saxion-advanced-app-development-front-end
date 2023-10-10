import { StyleSheet } from 'react-native';
import { themeColors } from "./themeColors";

export const globalStyles = StyleSheet.create({
  marginBottom: {
    marginBottom: 25,
  },
  pageContainer: {
    backgroundColor: themeColors.white,
    padding: 25,
    paddingTop: 15,
    minHeight: "100%"
  },
  defaultShadow: {
    shadowColor: '#002E74',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 5,
  },
  subTitleContainer: {
    flexDirection: "row",
  },
  flexDirectionRow: {
    flexDirection: "row"
  }
});
