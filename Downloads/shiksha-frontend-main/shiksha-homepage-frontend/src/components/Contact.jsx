import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import email_icon from '../assets/envelope.svg'
import location_icon from '../assets/location.svg'
import phone_icon from '../assets/phone_icon.svg'

import "../css/Contact.css";

const Contact = () => {
  return (
    <div className="contact2-container">
      {/* Header */}
      <header className="contact2-header">
        <h1>Contact Shiksha</h1>
        <p>
          Get in touch with us! Here is how you can reach Shiksha.
        </p>
      </header>

      {/* Contact Information */}
      <section className="contact2-info">
        <div className="contact2-card">
          <img src={location_icon} alt="" />
          <h2>Head Office</h2>
          <p>
            House No. - 73A<br />
            Maruti Vihar<br />
            Gurgaon, Haryana - 122002
          </p>
        </div>

        <div className="contact2-card">
          <img src={email_icon} alt="" />

          <h2>Email</h2>
          <p>
            info@shikshacom.com
          </p>
        </div>

        <div className="contact2-card">
          <img src={phone_icon} alt="" />
          <h2>Phone</h2>
          <p>
             +91 3893570403
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;