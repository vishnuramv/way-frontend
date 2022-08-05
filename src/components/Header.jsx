
import { Avatar, Button, Divider, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom"
import logo from "../assets/img/logonew.png";
import "../styles/header.css";

const Header = () => {
    const [open, setOpen] = useState(false)
    return (
        <header className="header" >
            <Link className="brandContainer" to="/">
                <img src={logo} alt="" />
                <Text fontSize="md" className="brandName text">Way</Text>
            </Link>
            <nav className={`${open ? "nav-open" : "nav-close"} nav`}>
                {/* <Link to="/">
                    <Text fontSize="lg">Feed</Text>
                </Link> */}
                <Divider className="header__menuDivder" />
                <Link to="/login">
                    <Text fontSize="lg">Sign In</Text>
                </Link>
                <Divider className="header__menuDivder" />
                <Link to="/signup">
                    <Button variant="solid">
                        <Text color="black" fontSize="lg">Get Started</Text>
                    </Button>
                </Link>
            </nav>
            <IconButton onClick={() => setOpen(!open)} size="sm" variant='unstyled' className="header__menuBtn">
                {
                    !open ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    )
                }
            </IconButton>
        </header >
    )
}

export default Header