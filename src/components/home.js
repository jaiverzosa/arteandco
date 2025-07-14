import React, { useState, useEffect } from 'react';
import './components.css';
import GmailIcon from '../images/gmail.png';
import LinkedinIcon from '../images/linkedin.png';
import FacebookIcon from '../images/facebook.png';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [formData, setFormData] = useState({
    title: '',
    artistName: '',
    price: '',
    social: '',
    image: null,
    imagePreview: null
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [allArtists, setAllArtists] = useState([]);

  const currentUser = localStorage.getItem('username');

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const goToLink = (url) => {
    window.open(url, '_blank');
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const imageFile = files[0];
      setFormData({
        ...formData,
        image: imageFile,
        imagePreview: URL.createObjectURL(imageFile),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('artistName', formData.artistName);
    data.append('price', formData.price);
    data.append('social', formData.social);
    data.append('image', formData.image);
    data.append('username', currentUser);

    try {
      const res = await fetch('http://localhost/Projects/arteandco/arteandco/php_files/save_artist.php', {
        method: 'POST',
        body: data,
      });

      const result = await res.text();
      if (result === 'Success') {
        setSubmittedData(formData);
        fetchArtists();
        scrollTo('section2');
      } else {
        alert(result);
      }
    } catch (err) {
      alert("Could not connect to server.");
    }
  };

  const fetchArtists = () => {
    fetch('http://localhost/Projects/arteandco/arteandco/php_files/get_artists.php')
      .then(res => res.json())
      .then(data => setAllArtists(data))
      .catch(err => console.error('Fetch error:', err));
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this artwork?")) return;

    try {
      const res = await fetch('http://localhost/Projects/arteandco/arteandco/php_files/delete_artist.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, username: currentUser })
      });

      const result = await res.text();
      if (result === 'Deleted') {
        alert('Artwork deleted.');
        fetchArtists();
      } else {
        alert(result);
      }
    } catch (err) {
      alert("Failed to delete.");
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/signin');
  };

  return (
    <div className="container home-container">
      <div className='bg-container'></div>
      <nav className='nav_home'>
        <div className='title-div'>
          <p className='title-text title-home' onClick={() => scrollTo('section1')}>Arte & Co.</p>
        </div>
        <div className='logout-div'>
          <button className='logout-button' onClick={handleLogout}>LOG OUT</button>
        </div>
      </nav>

      <main>
        <div className='main-home'>

          <section id='section1'>
            <div className='section1-div'>
              <h1 className='welcome-text'>Showcase Your Masterpiece in this Creative Marketplace!</h1>
              <div className='buysell-buttons'>
                <button className='buysell-button buy' onClick={() => scrollTo('section2')}>BUY</button>
                <button className='buysell-button sell' onClick={() => scrollTo('section3')}>SELL</button>
              </div>
            </div>
          </section>

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
                        <div>
                          {artist.social_link && (
                            <button className='contact-button'
                              onClick={() => window.open(artist.social_link, '_blank')}
                            >
                              CONTACT
                            </button>
                          )}
                          {artist.username === currentUser && (
                            <button className='delete-button' onClick={() => handleDelete(artist.id)}>
                              ⛌
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <section id='section3'>
            <p className='showcase-text'>Showcase Your Artwork</p>
            <form onSubmit={handleSubmit} className='sell-form'>
              <div className='inputs-div'>
                <label>Artwork Title</label>
                <input
                  type='text'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <label>Artist Name</label>
                <input
                  type='text'
                  name='artistName'
                  value={formData.artistName}
                  onChange={handleChange}
                  required
                />
                <label>Price (₱)</label>
                <input
                  type='text'
                  name='price'
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
                <label>Link for clients to contact you</label>
                <input
                  type='url'
                  name='social'
                  placeholder='Ex: https://facebook.com/yourname'
                  value={formData.social}
                  onChange={handleChange}
                /><br />
                <label>Artwork Image</label>
              </div>
              <input className='input-file'
                type='file'
                name='image'
                accept='image/*'
                onChange={handleChange}
                required
              /><br />
              <button className='upload-button' type='submit'>UPLOAD</button>
            </form>
          </section>
        </div>
      </main>

      <footer>
        <div className='copyright-div'>
          <p>&copy; 2025 Arte & Co. All rights reserved. Designed by Jai Verzosa.</p>
        </div>
        <div className='contact-div'>
          <img src={GmailIcon} alt='Gmail' onClick={() => (window.location.href = 'mailto:jaiverzosa@gmail.com')} />
          <img src={LinkedinIcon} alt='LinkedIn' onClick={() => goToLink('https://www.linkedin.com/in/jairaericynverzosa/')} />
          <img src={FacebookIcon} alt='Facebook' onClick={() => goToLink('https://www.facebook.com/devsofira')} />
        </div>
      </footer>
    </div>
  );
}

export default Home;
