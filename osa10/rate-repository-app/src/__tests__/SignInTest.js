import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInForm from '../components/SignInForm';

describe('SignInForm', () => {
    it('calls function provided by onSubmit prop after pressing the submit button', async () => {
      const onSubmit = jest.fn();
      const { debug, getByTestId } = render(<SignInForm onSubmit={onSubmit} />);
      //debug();

      fireEvent.changeText(getByTestId('username'), 'whatever');
      fireEvent.changeText(getByTestId('password'), 'passwd');
      fireEvent.press(getByTestId('submitSignIn'));
  
      await waitFor(() => {
          expect(onSubmit).toHaveBeenCalledTimes(1);
          expect(onSubmit.mock.calls[0][0]).toEqual({
            username: 'whatever',
            password: 'passwd',
            });
        });
    });
  });