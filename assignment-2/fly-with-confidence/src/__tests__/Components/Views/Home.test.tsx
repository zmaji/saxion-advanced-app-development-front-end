import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../../../views/Home';
import tokenStore from '../../../stores/tokenStore';
import { Provider } from 'react-redux';

describe('Home', () => {
  it('should render the Home component correctly', () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const { getByText } = render(
        <Provider store={tokenStore}>
          <Home navigation={navigation} />
        </Provider>,
    );

    const header = getByText('Fly with Confidence');
    const subHeader = getByText('Reduce your fear of flight');
    const signUpButton = getByText('Sign up');
    const guestButton = getByText('Enter as guest');

    expect(header).toBeTruthy();
    expect(subHeader).toBeTruthy();
    expect(signUpButton).toBeTruthy();
    expect(guestButton).toBeTruthy();
  });

  it('should open and close the login and register modals', () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const { getByText, queryByTestId } = render(
        <Provider store={tokenStore}>
          <Home navigation={navigation} />
        </Provider>,
    );

    const loginLink = getByText('Login');
    fireEvent.press(loginLink);

    const closeLoginButton = getByText('Cancel');
    fireEvent.press(closeLoginButton);
    expect(queryByTestId('login-modal')).toBeNull();

    const signUpButton = getByText('Sign up');
    fireEvent.press(signUpButton);

    const closeRegisterButton = getByText('Cancel');
    fireEvent.press(closeRegisterButton);
    expect(queryByTestId('register-modal')).toBeNull();
  });

  it('should navigate to SelectionScreen when "Enter as guest" is pressed', () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const { getByText } = render(
        <Provider store={tokenStore}>
          <Home navigation={navigation} />
        </Provider>,
    );

    const guestButton = getByText('Enter as guest');
    fireEvent.press(guestButton);

    expect(navigation.navigate).toHaveBeenCalledWith('SelectionScreen');
  });
});
