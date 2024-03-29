import { useState } from 'react';
import { styled } from 'styled-components';

/**
 * styled is a JS object.

 * styled.div`` --> 
 * a) tagged template (a regular JS feature)
 * b) a function that will create and return a div as a separate component that will have the styles we apply to it
 * c) accepts template literals as input

 * TEMPLATE LITERAL --> contains all the styles that we want to aplly to this div
*/

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({$invalid}) => $invalid ? '#f87171' : '#6b7280'};
`
/** 
 * UP (IN COLOR PROPERTY) : 
 * -> pass a function as value. This function will be executed by styled-components package to dynamically derive a value.
 * -> styled-components package will give us props object as input to this anonymous function which it will execute for us.
 * -> This props object will include all the props that are set on this styled component (here: Label).
 * -> Thus color style is derived dynamically based on props.
*/

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  background-color: ${({$invalid}) => $invalid ? '#fed2d2' : '#d1d5db'};
  color: ${({$invalid}) => $invalid ? '#ef4444' : '#374151'};
  border: 1px solid ${({$invalid}) => $invalid ? '#f73f3f' : 'transparent'};
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`
const Button = styled.button`
  padding: 1rem 2rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 0.25rem;
  color: #1f2937;
  background-color: #f0b322;
  border-radius: 6px;
  border: none;

  &:hover {
    background-color: #f0920e;
  }
`
/**
 * UP:
 * & :hover --> applies styles on the child elements of button when they are hovered upon
 * &:hover --> applied styles on button itself when it is hovered upon
 */

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      {/* <div className="controls"> */}
      <ControlContainer>
        <p>
          <Label $invalid={emailNotValid}>Email</Label>
          <Input
            type="email"
            $invalid={emailNotValid} // invalid is a built-in prop on input component. To avoid any clash or overriding, it is advised to put a $ symbol before any of the user defined props while dealing with styled-components.
            onChange={(event) => handleInputChange('email', event.target.value)} // All these props added on Input component are forwarded to the built-in JSX element
          />
        </p>
        <p>
          <Label $invalid={passwordNotValid}>Password</Label>
          <Input
            type="password"
            $invalid={passwordNotValid}
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          />
        </p>
      </ControlContainer>
      {/* </div> */}
      <div className="actions">
        <button type="button" className="text-button">
          Create a new account
        </button>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
