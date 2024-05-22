import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from './Axios';
import '../style/NavBar.css';

function NavBar() {
    const navRef = useRef<HTMLDivElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const employee_id = Number(localStorage.getItem('employee_id') || 0);
    const token = localStorage.getItem('token');
    
    const navigate = useNavigate();

    const showNav = () => {
        if (navRef.current) {
            navRef.current.classList.toggle('responsive_nav');
        }
    };

    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        checkIfLoggedIn();
    };

    useEffect(() => {
        checkIfLoggedIn();
    }, []);

    const checkIfLoggedIn = () => {
        if (employee_id !== 0 && token !== null) {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    };

    const handleLogout = useCallback(async (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); // Prevent the default action
        try {
            const response = await AxiosInstance.post('/logout/', {
                headers: {
                    'Authorization': `Token ${token}`
            }
            });
            if (response.status === 200) {
                console.log('Logged out');
                localStorage.removeItem('user_id');
                localStorage.removeItem('token');
                localStorage.removeItem('manager_id');
                setIsLoggedIn(false);
                navigate('/');
            } else {
                console.log('Logout failed with status:', response.status);
            }
        } catch (error) {
            console.error(error);
        }
    }, [navigate]);

   

    return (
        <header>
            <h3>LOGO</h3>
            <nav ref={navRef}>
                <a href="/">Home</a>
                {!isLoggedIn && <a href="/login" onClick={handleLinkClick}>Login</a>}
                {/* {isLoggedIn && <a href="/profile" onClick={handleLinkClick}>Profile</a>} */}
                {!isLoggedIn && <a href="/register" onClick={handleLinkClick}>Register</a>}
                {isLoggedIn && <a href="/logout" onClick={handleLogout}>Logout</a>}
                {isLoggedIn && <a href="/services" onClick={handleLinkClick}>Cargar Servicio</a>}
                {/* {isLoggedIn && <a href="/products" onClick={handleLinkClick}>Add Product</a>} */}
                <button className="nav-btn nav-cls-btn" onClick={showNav}>
                    <FaTimes />
                </button>
            </nav>
            <button className="nav-btn" onClick={showNav}>
                <FaBars />
            </button>
        </header>
    );
}

export default NavBar;