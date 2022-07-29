import { Box, Button, Container, Input, Text, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import "../styles/login.css"
import logo from "../assets/img/logonew.png";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Login as LoginApi } from '../apiclient/userapi'
import { setUser } from '../context/reducers/userReducer';


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const handleInput = (val, type) => {
        setUserData({
            ...userData,
            [type]: val
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        LoginApi(userData, dispatch, setUser).then(() => {
            navigate('/');
        });
        console.log(userData);
    }
    return (
        <div className='login'>
            <Box w='md' h="md" borderRadius='sm' boxShadow='xl' className='login__container' overflow='hidden'>
                <div className="login__brandContainer">
                    <img src={logo} alt="" />
                    {/* <Text fontSize="md" className="brandName text">Way</Text> */}
                    <Text fontSize="3xl">Welcome Back</Text>
                </div>
                <form>
                    <Input variant='flushed' placeholder='Email' type="email" value={userData.email} onChange={(event) => handleInput(event.target.value, "email")} required />
                    <Input variant='flushed' placeholder='Password' type="password" value={userData.password} onChange={(event) => handleInput(event.target.value, "password")} required my="5" />
                    <Text fontSize="sm" fontWeight="light" align="center">Click “Sign In” to agree to Way’s <Link to="/"><Text as='u'>Terms of Service</Text></Link> and acknowledge that Way’s <Link to="/"><Text as='u'>Privacy Policy</Text></Link> applies to you.</Text>
                    <Button variant='outline' type="submit" onClick={handleSubmit} color='black' mt="5">Sign In</Button>
                </form>
                <Text display="flex">No account? <Link to="/signup"> <Text color="green">&nbsp; Create one</Text></Link></Text>
            </Box>
        </div>
    )
}

export default Login