import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components.css';
import GmailIcon from '../images/gmail.png';
import LinkedinIcon from '../images/linkedin.png';
import FacebookIcon from '../images/facebook.png';


function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      //CHANGED
      const response = await fetch("http://localhost/Projects/arteandco/arteandco/php_files/signin.php", {
        method: "POST",
        body: formData,
      });

      const result = (await response.text()).trim();
      console.log("🔍 Server Response:", result); // ✅ Add this
      setMessage(result);

      if (result.includes("Login successful")) {
        localStorage.setItem("username", username);  // ✅ Save to localStorage
        navigate('/home'); // ✅ Redirect to Home
      }
    } catch (error) {
      setMessage("❌ Could not connect to server.");
    }
  };

    const  goToLink = (url) => {
        window.open(url, '_blank');
    }

  return (
    <div className="container signin-container">
            <nav className='nav_hero'>
                <div className='title-div'><p className='title-text title-signin' onClick={() => navigate('/')}>Arte & Co.</p></div>
                <div className='sign-buttons'>
                    <button className='sign-button signin' onClick={() => navigate('/signin')}>SIGN IN</button>
                    <button className='sign-button signup' onClick={() => navigate('/signup')}>SIGN UP</button>
                </div>
            </nav>
      
      <main className='main-signin'>
        <form onSubmit={handleLogin} className='signin-form'>
          <p className='signin-text'>WELCOME BACK</p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">SIGN IN</button>
        </form>
        {message && <p>{message}</p>}
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

export default SignIn;
