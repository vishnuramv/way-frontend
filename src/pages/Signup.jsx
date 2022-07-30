import { Box, Button, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../assets/img/logonew.png";
import "../styles/login.css"
import { Signup as SignupApi } from '../apiclient/userapi'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../context/reducers/userReducer';
const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        name: '',
        username: '',
        dpUrl: '',
        dob: '',
    });
    const handleInput = (val, type) => {
        setUserData({
            ...userData,
            [type]: val
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const res = SignupApi(userData, dispatch, setUser).then(() => {
            navigate('/');
        });
        console.log(userData);
    }

    return (
        <div className='login'>
            <Box w='md' h="xl" borderRadius='sm' boxShadow='xl' className='login__container' overflow='hidden'>
                <div className="login__brandContainer">
                    <img src={logo} alt="" />
                    <Text fontSize="3xl">Hello Reader!</Text>
                </div>
                <form>
                    <Input variant='flushed' placeholder='Name' type="text" value={userData.name} onChange={(event) => handleInput(event.target.value, "name")} required my="1" />
                    <Input variant='flushed' placeholder='Username' type="text" value={userData.username} onChange={(event) => handleInput(event.target.value, "username")} required my="1" />
                    <Input variant='flushed' placeholder='Email' type="email" value={userData.email} onChange={(event) => handleInput(event.target.value, "email")} required my="1" />
                    <Input variant='flushed' placeholder='Password' type="password" value={userData.password} onChange={(event) => handleInput(event.target.value, "password")} required my="1" />
                    <Input variant='flushed' placeholder='Birth Date' type="date" value={userData.dob} onChange={(event) => handleInput(event.target.value, "dob")} required my="1" />
                    <Input variant='flushed' placeholder='Profile Image URL' type="url" value={userData.dp_url} onChange={(event) => handleInput(event.target.value, "dpUrl")} my="1" />
                    <Text fontSize="sm" mt="2" fontWeight="light" align="center">Click “Sign Up” to agree to Way’s <Link to="/"><u>Terms of Service</u></Link> and acknowledge that Way’s <Link to="/"><u>Privacy Policy</u></Link> applies to you.</Text>
                    <Button variant='outline' type="submit" onClick={handleSubmit} color='black' mt="5">Sign Up</Button>
                </form>
                <Text display="flex" mt="2">Already have an account? <Link to="/login"><Text as="span" color="green">&nbsp;Sign in</Text></Link></Text>
            </Box>
        </div>
    )
}

export default Signup