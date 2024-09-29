import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from '../../globalStyles';
import img from '../../images/svg-1.svg';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1e2a38 0%, #1c2a3a 100%);
  padding: 0 20px;
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
`;

const FormSection = styled.div`
  flex: 1;
  max-width: 500px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-right: 20px;
`;

const Header = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #555;
  font-weight: 600;
  align-self: flex-start;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #1e2a38;
    box-shadow: 0 0 8px rgba(30, 42, 56, 0.2);
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const LinkWrapper = styled.div`
  margin-top: 15px;
  font-size: 14px;
  color: #555;

  a {
    color: #1e2a38;
    text-decoration: none;
    font-weight: 600;
    margin: 0 5px;

    &:hover {
      text-decoration: underline;
    }
  }

  .forgot-password {
    display: block;
    margin-bottom: 10px;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 10px 0;
`;

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData, {
        withCredentials: true,
      });
      console.log('Login successful:', response.data);
      Cookies.set('token', response.data.token, { secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });
      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Server error');
      console.error('Error during login:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <LoginFormContainer>
      <FormWrapper>
        <FormSection>
          <Header>Login to VAULTX</Header>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              required
              autoComplete="current-password"
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ButtonWrapper>
              <Button primary type="submit">Log In</Button>
            </ButtonWrapper>
            <LinkWrapper>
              <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
              <span>Don't have an account? <a href="/sign-up">Sign Up</a></span>
            </LinkWrapper>
          </Form>
        </FormSection>
        <ImageSection>
          <img src={img} alt="Login Icon" />
        </ImageSection>
      </FormWrapper>
    </LoginFormContainer>
  );
};

export default LoginForm;
