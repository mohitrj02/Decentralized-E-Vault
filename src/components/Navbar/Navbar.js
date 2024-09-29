import React, { useState, useEffect } from 'react';
import { Nav, 
    NavbarContainer, 
    NavLogo, 
    NavIcon, 
    HamburgerIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavItemBtn,
    NavBtnLink
 } from './Navbar.elements';
import { FaTimes, FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Button } from '../../globalStyles';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
        window.addEventListener('resize', showButton);

        return () => window.removeEventListener('resize', showButton);
    }, []);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Nav>
                    <NavbarContainer>
                        <NavLogo to='/'> 
                            <NavIcon />
                            VAULTX
                        </NavLogo>
                        <HamburgerIcon onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </HamburgerIcon>
                        <NavMenu onClick={handleClick} click={click}>
                            <NavItem>
                                <NavLinks to='/' onClick={closeMobileMenu}>
                                    Home
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='/services' onClick={closeMobileMenu}>
                                    Services
                                </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='/products' onClick={closeMobileMenu}>
                                    Products
                                </NavLinks>
                            </NavItem>
                            <NavItemBtn>
                                {button ? (
                                    <NavBtnLink to='/sign-up'>
                                        <Button primary>SIGN UP</Button>
                                    </NavBtnLink>
                                ) : (
                                    <NavBtnLink to='/sign-up'>
                                        <Button onClick={closeMobileMenu} fontBig primary>SIGN UP</Button>
                                    </NavBtnLink>
                                )}
                            </NavItemBtn>
                            <NavItemBtn>
                                {button ? (
                                    <NavBtnLink to='/log-in'>
                                        <Button primary>LOG IN</Button>
                                    </NavBtnLink>
                                ) : (
                                    <NavBtnLink to='/log-in'>
                                        <Button onClick={closeMobileMenu} fontBig primary>LOG IN</Button>
                                    </NavBtnLink>
                                )}
                            </NavItemBtn>
                        </NavMenu>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;
