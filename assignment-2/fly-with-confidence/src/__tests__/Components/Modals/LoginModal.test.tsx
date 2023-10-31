import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LoginModal from '../../../components/modals/LoginModal';

const mockStore = configureStore();

describe('LoginModal', () => {
  it('should render the modal and interact with input fields', async () => {
    const store = mockStore();

    const { getAllByText, getByPlaceholderText, getByTestId } = render(
      <Provider store={store}>
        <LoginModal isVisible={true} closeLoginModal={() => { }} onLoginSuccess={() => { }} />
      </Provider>,
    );

    expect(getByTestId('loginModal')).toBeTruthy();
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Username'), 'TestUser');
      fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    });

    expect(getByPlaceholderText('Username').props.value).toBe('TestUser');
    expect(getByPlaceholderText('Password').props.value).toBe('password123');

    const loginElements = getAllByText('Login');
    const loginElement = loginElements[1];

    fireEvent.press(loginElement);
  });

  it('should display error messages for invalid input', async () => {
    const store = mockStore();

    const { getAllByText, getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <LoginModal isVisible={true} closeLoginModal={() => { }} onLoginSuccess={() => { }} />
      </Provider>,
    );

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Username'), '');
      fireEvent.changeText(getByPlaceholderText('Password'), '');
    });

    const loginElements = getAllByText('Login');
    const loginElement = loginElements[1];

    fireEvent.press(loginElement);

    expect(getByText('Username is required')).toBeTruthy();
    expect(getByText('Password is required')).toBeTruthy();
  });
});
