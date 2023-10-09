import { themeColors } from "./themeColors";
import { typographyStyles } from "./typography";

export const buttonStyles = {
  button: {
    borderRadius: 5,
    padding: 15,
    elevation: 1,
    minWidth: 170,
    backgroundColor: themeColors.primary
  },
  buttonText: {
    fontFamily: 'Montserrat-Medium',
    color: 'white',
    textAlign: 'center',
    ...typographyStyles.baseFontSize
  }
}