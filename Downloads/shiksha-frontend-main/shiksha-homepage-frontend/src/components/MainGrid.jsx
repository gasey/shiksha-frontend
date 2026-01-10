import '../css/MainGrid.css';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import demoImage from '../assets/demo.png';
import studioImage from '../assets/studio.jpeg';
import teacherImage from '../assets/teacher.jpeg';
import meetImage from '../assets/meet.jpeg';
import mualpuiImage from '../assets/mualpui.jpeg';
import codeImage from '../assets/code.jpeg';
import teach1Image from '../assets/teach1.jpeg';
import teach2Image from '../assets/teach2.jpeg';
import teach3Image from '../assets/teach3.jpeg';
import teach4Image from '../assets/teach4.jpeg';
import teach5Image from '../assets/teach5.jpeg';
import itImage from '../assets/it.jpeg';
import s1Image from '../assets/s1.png';
import s2Image from '../assets/s2.png';
import s3Image from '../assets/s3.png';
import s4Image from '../assets/s4.png';
import s5Image from '../assets/s5.png';
import ShikshaImage from '../assets/Shiksha.png';

const MainGrid = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Auto-changing slideshow index
  const [slideIndex, setSlideIndex] = useState(0);

  // Change image every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(prev => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const notifications = [
    "New JEE courses will be available soon!",
    "Live classes starting soon",
    "Scholarship opportunities for students",
    "Teacher training programs coming soon",
    "Upcoming career counselling sessions",
    "Digital India initiative updates",
    "Admission guidance for abroad",
    "Skill development workshops"
  ];

  const longNotificationsList = [...notifications, ...notifications, ...notifications, ...notifications, ...notifications, ...notifications, ...notifications, ...notifications, ...notifications, ...notifications];

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => prev + 60);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { 
      title: "Demo", 
      description: "Experience the simulation of our e-learning program",
      image: demoImage,
      link: "/demo"
    },
    { 
      title: "Company Location", 
      description: "Mualpui, Aizawl, Mizoram",
      mapEmbed: "https://www.google.com/maps/embed?pb=!4v1763618981533!6m8!1m7!1swqm8EtHkZ2fUAJh_9XGAzA!2m2!1d23.71419532118896!2d92.73220398118785!3f123.39608083079833!4f-5.179024440157605!5f0.7820865974627469",
      link: null
    },
    { 
      title: "Our Office", 
      description: "Shots of our office",
      images: [teacherImage, studioImage, meetImage, itImage],
      link: null
    },
    { 
      title: "In-house teacher in action", 
      description: "Preparing for their presentations",
      images: [teach1Image, teach2Image, teach3Image, teach4Image, teach5Image],
      link: null
    },
    { 
      title: "Our Website", 
      description: "Some screenshot of our website",
      images: [s1Image, s2Image, s3Image, s4Image, s5Image],
      link: null
    },
    { 
      title: "ShikshaCom", 
      description: "Empowerment through Education",
      images: [ShikshaImage, codeImage],
      link: null
    }
  ];

  return (
    <div className="main-grid">

      <div className="left-column">
        <div className="cards-grid">

          {cards.map((card, index) => {

            const cardContent = (
              <>
                <div className="card-image">

                  {/* Embedded Map */}
                  {card.mapEmbed ? (
                    <iframe
                      src={card.mapEmbed}
                      style={{ width: "100%", height: "200px", border: 0, borderRadius: "10px" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  ) : card.images ? (

                    /* Sliding Image Animation */
                    <div className="slideshow-container">
                      <div
                        className="slideshow-inner"
                        style={{
                          transform: `translateX(-${(slideIndex % card.images.length) * 100}%)`,
                          transition: "transform 0.6s ease-in-out",
                          display: "flex",
                          width: `${card.images.length * 100}%`
                        }}
                      >
                        {card.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={card.title}
                          />
                        ))}
                      </div>
                    </div>

                  ) : (
                    <img src={card.image} alt={card.title} />
                  )}

                </div>

                <div className="card-content">
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              </>
            );

            if (card.link) {
              return (
                <Link to={card.link} key={index} className="card card-link">
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={index} className="card">
                {cardContent}
              </div>
            );
          })}

        </div>
      </div>

      <div className="right-column">
        <div className="notification-panel">
          <h3>Latest Updates</h3>
          <div className="rolling-notification-container">
            <div
              className="notification-list"
              style={{
                transform: `translateY(-${scrollPosition}px)`,
                transition: 'transform 0.8s ease-in-out'
              }}
            >
              {longNotificationsList.map((notification, index) => (
                <div key={index} className="notification-item">
                  <p>{notification}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MainGrid;