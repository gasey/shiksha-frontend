import React, { useState } from "react";
import "../css/Faq.css";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What courses does the coaching provide?",
      answer:
        "We provide courses for competitive exams, school subjects, and professional skill development."
    },
    {
      question: "How can I join the classes?",
      answer:
        "You can register on our website or contact us for more details."
    },
    {
      question: "Do you offer online classes?",
      answer:
        "Yes, we offer both live classes and recorded sessions ."
    },
    {
      question: "What are the refund policy?",
      answer:
        "Refund requests must be raised within 24 hours from the date of purchase, please refer to our refund policy page for more details."
      }
  ];

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <p className="faq-subtext">
        Find answers to the most commonly asked questions.
      </p>

      <div className="faq-wrapper">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-card">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <h3>{faq.question}</h3>
              <span>{activeIndex === index ? <FaMinus /> : <FaPlus />}</span>
            </div>

            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
