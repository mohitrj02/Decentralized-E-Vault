import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from '../../globalStyles';
import img from '../../images/svg-1.svg'; // Import your SVG file
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const SignUpFormContainer = styled.div`
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
  max-width: 500px; /* Adjust as needed */
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-right: 20px; /* Space between form and image */
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
    border-color: #1e2a38; /* Darkish blue */
    box-shadow: 0 0 8px rgba(30, 42, 56, 0.2);
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
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

  .already-have-account {
    display: block;
    margin-bottom: 10px;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  max-width: 500px; /* Adjust as needed */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate for redirection

  const { name, email, username, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', formData);
      console.log('Signup successful:', response.data);
      // Show success message
      alert('Sign up successful!');
      // Redirect to home page
      navigate('/'); // Use navigate('/home') if needed
    } catch (error) {
      setError(error.response ? error.response.data : { error: 'Server error' });
      console.error('Error during signup:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <SignUpFormContainer>
      <FormWrapper>
        <FormSection>
          <Header>Sign Up for VAULTX</Header>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" type="text" value={name} onChange={handleChange} placeholder="Full Name" required />
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" value={email} onChange={handleChange} placeholder="Email Address" required />
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" type="text" value={username} onChange={handleChange} placeholder="Username" required />
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" value={password} onChange={handleChange} placeholder="Password" required autoComplete="new-password" />
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" name="confirmPassword" type="password" value={confirmPassword} onChange={handleChange} placeholder="Confirm Password" required autoComplete="new-password" />
            <ButtonWrapper>
              <Button primary type="submit">Sign Up</Button>
            </ButtonWrapper>
            <LinkWrapper>
              <span>Already have an account? <a href="/log-in">Log In</a></span>
            </LinkWrapper>
          </Form>
        </FormSection>
        <ImageSection>
          <img src={img} alt="Sign Up Icon" />
        </ImageSection>
      </FormWrapper>
    </SignUpFormContainer>
  );
};

export default SignUpForm;
