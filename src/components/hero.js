import './components.css';
import GmailIcon from '../images/gmail.png';
import LinkedinIcon from '../images/linkedin.png';
import FacebookIcon from '../images/facebook.png';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';



function Hero(){
    const navigate = useNavigate();

    const  goToLink = (url) => {
        window.open(url, '_blank');
    }

      const [submittedData, setSubmittedData] = useState(null);
      const [allArtists, setAllArtists] = useState([]);
        
      const fetchArtists = () => {
        fetch('http://localhost/Projects/arteandco/arteandco/php_files/get_artists.php')
          .then(res => res.json())
          .then(data => setAllArtists(data))
          .catch(err => console.error('Fetch error:', err));
      };
    
      useEffect(() => {
        fetchArtists();
      }, []);
        
    
    return(
        <div className='container hero-container'>

            <nav className='nav_hero'>
                <div className='title-div'><p className='title-text'>Arte & Co.</p></div>
                <div className='sign-buttons'>
                    <button className='sign-button signin' onClick={() => navigate('/signin')}>SIGN IN</button>
                    <button className='sign-button signup' onClick={() => navigate('/signup')}>SIGN UP</button>
                </div>
            </nav>

      <main>
        <div className='main-home'>

          {/* Section 1 */}
          <section id='section1'>
            <div className='section1-div'>
              <h1 className='welcome-text'>Showcase Your Masterpiece in this Creative Marketplace!</h1>
              <div className='buysell-buttons'>
                <button className='buysell-button buy' onClick={() => navigate('/signin')}>BUY</button>
                <button className='buysell-button sell' onClick={() => navigate('/signin')}>SELL</button>
              </div>
            </div>
          </section>

          {/* Section 2 - All Artworks */}
          <section id='section2'>
            <div className='section2-div'>
              <h2>ARTWORKS FOR SALE</h2>
              <div className='artist-card-div'>
                {allArtists.length === 0 ? (
                  <p>No available artworks.</p>
                ) : (
                  allArtists.map((artist, index) => (
                    <div key={index} className='artist-card'>
                      <img
                        src={`http://localhost/Projects/arteandco/arteandco/uploads/${artist.image_filename}`}
                        alt="Artist"
                      />
                      <div className='artist-button'>
                        <div className='art-info'>
                          <p><strong>Title:</strong> {artist.title}</p>
                          <p><strong>Artist:</strong> {artist.artist_name}</p>
                          <p><strong>Price:</strong> ₱{artist.price}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
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

export default Hero;