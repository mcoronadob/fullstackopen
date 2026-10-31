import { FormContainer, FieldGroup, StyledInput, StyledButton } from './StyledComponents'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <FormContainer>
      <h2>Login to application</h2>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <label htmlFor="username">username </label>
          <StyledInput
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </FieldGroup>
        <FieldGroup>
          <label htmlFor="password">password </label>
          <StyledInput
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FieldGroup>
        <StyledButton type="submit">login</StyledButton>
      </form>
    </FormContainer>
  )
}

export default LoginForm