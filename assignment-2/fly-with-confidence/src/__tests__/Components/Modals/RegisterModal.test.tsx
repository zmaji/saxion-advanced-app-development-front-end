import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import RegisterModal from '../../../components/modals/RegisterModal';

describe('RegisterModal', () => {
  it('should render the register modal and interact with input fields', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
        <RegisterModal isVisible={true} closeRegisterModal={() => { }} onRegisterSuccess={() => { }} />,
    );

    expect(getByTestId('registerModal')).toBeTruthy();
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Username'), 'TestUser');
      fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
      fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
      fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password123');
    });

    expect(getByPlaceholderText('Username').props.value).toBe('TestUser');
    expect(getByPlaceholderText('Email').props.value).toBe('test@example.com');
    expect(getByPlaceholderText('Password').props.value).toBe('password123');
    expect(getByPlaceholderText('Confirm Password').props.value).toBe('password123');

    fireEvent.press(getByText('Register account'));
  });

  it('should display error messages for invalid input', async () => {
    const { getByPlaceholderText, getByText } = render(
        <RegisterModal isVisible={true} closeRegisterModal={() => { }} onRegisterSuccess={() => { }} />,
    );

    let queryByText: Element | null;

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Username'), '');
      fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
      fireEvent.changeText(getByPlaceholderText('Password'), 'pass');
      fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password');
    });

    fireEvent.press(getByText('Register account'));

    queryByText = getByText('Username is required');
    expect(queryByText).toBeTruthy();

    queryByText = getByText('Email is not valid');
    expect(queryByText).toBeTruthy();

    queryByText = getByText('Password must be at least 8 characters long');
    expect(queryByText).toBeTruthy();

    queryByText = getByText('Passwords do not match');
    expect(queryByText).toBeTruthy();
  });
});
