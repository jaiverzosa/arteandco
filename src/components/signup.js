import React, {useState} from 'react';
import './components.css';
import GmailIcon from '../images/gmail.png';
import LinkedinIcon from '../images/linkedin.png';
import FacebookIcon from '../images/facebook.png';
import { useNavigate } from 'react-router-dom';

function SignUp(){
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            setMessage("Passwords do not match.");
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('confirm_password', confirmPassword);

        try{
            //CHANGED
            const response = await fetch('http://localhost/Projects/arteandco/arteandco/php_files/create_user.php', {
                method: 'POST',
                body: formData,
            });

            const result = await response.text();
            if(result.includes("User created successfully")){
                navigate("/signin");
            }else{
                setMessage(result);
            }
        }catch(error){
            setMessage("Could not connect to server.");
        }

    }

    const  goToLink = (url) => {
        window.open(url, '_blank');
    }
    
    return(
        <div className='container signup-container'>
            <nav className='nav_hero'>
                <div className='title-div'><p className='title-text title-signup' onClick={() => navigate('/')}>Arte & Co.</p></div>
                <div className='sign-buttons'>
                    <button className='sign-button signin' onClick={() => navigate('/signin')}>SIGN IN</button>
                    <button className='sign-button signup' onClick={() => navigate('/signup')}>SIGN UP</button>
                </div>
            </nav>
            <main className='main-signup'>
                <div className='main-signup'>
                    <form onSubmit={handleSubmit} className='signup-form'>
                        <p className='signup-text'>CREATE ACCOUNT</p>
                        <input
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        />
                        <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                        <input
                        type='password'
                        name='confirm_password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        />

                        <button type='submit'>SIGN UP</button>
                    </form>

                    {message && <p>{message}</p>}
                </div>
            </main>

            <footer>
                <div className='copyright-div'>
                    <p>&copy; 2025 Arte & Co. All rights reserved. Designed by Jai Verzosa.</p>
                </div>

                <div className='contact-div'>

                    <img src={GmailIcon} alt='Gmail' onClick={() => (window.location.href = 'mailto:jaiverzosa@gmail.com')}/>

                    <img src={LinkedinIcon} alt='LinkedIn' onClick={() => goToLink('https://www.linkedin.com/in/jairaericynverzosa/')}/>
                    
                    <img src={FacebookIcon} alt='Facebook' onClick={() => goToLink('https://www.facebook.com/devsofira')}/>
                </div>
            </footer>
        </div>

    );
}

export default SignUp;