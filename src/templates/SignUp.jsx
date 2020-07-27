import React, {useState, useCallback} from 'react';
import { TextInput, PrimaryButton } from '../components/UIkit';
import { signUp } from '../reducks/users/operations';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const SignUp = () => {
  const dispatch = useDispatch()

  const[username, setUsername] = useState(""),
      [email, setEmail] = useState(""),
      [password, setPassword] = useState(""),
      [confirmPassword, setConfirmPassword] = useState("");

  const inputUsername = useCallback((event) => {
    setUsername(event.target.value)
  }, [setUsername])

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword])

  const inputConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value)
  }, [setConfirmPassword])

  
  return(
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <div className="module-spacer--medium" />
      <TextInput 
        fullWidth={ true }
        label={ "ユーザー名" }
        multiline={ false }
        rows={ 1 }
        value={ username }
        type={ "text" }
        required={ true }
        onChange={ inputUsername }
      />

      <TextInput 
        fullWidth={ true }
        label={ "メールアドレス" }
        multiline={ false }
        rows={ 1 }
        value={ email }
        type={ "email" }
        required={ true }
        onChange={ inputEmail }
      />

      <TextInput 
        fullWidth={ true }
        label={ "パスワード" }
        multiline={ false }
        rows={ 1 }
        value={ password }
        type={ "password" }
        required={ true }
        onChange={ inputPassword }
      />

      <TextInput 
        fullWidth={ true }
        label={ "パスワード(再確認)" }
        multiline={ false }
        rows={ 1 }
        value={ confirmPassword }
        type={ "password" }
        required={ true }
        onChange={ inputConfirmPassword }
      />
      <div className="center">
        <PrimaryButton 
          label={ "アカウントを登録する" }
          onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
        />
        <div className="module-spacer--medium" />
        <p onClick={() => dispatch(push("/signin"))}>アカウントをすでにお持ちの方はこちら</p>
      </div>
    </div>
  )
}

export default SignUp