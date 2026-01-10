import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    home: "Home",
    about: "About",
    vision: "Our Vision",
    mission: "Our Mission",
    values: "Our Values",
    whyShiksha: "Why Shiksha?",
    registration: "Registration",
    students: "Students",
    teachers: "Teachers",
    experts: "Experts",
    services: "Services",
    online: "Online",
    offline: "Offline",
    classroom: "Classroom",
    softwareDev: "Software Development",
    generalStudies: "General Studies",
    currentAffairs: "Current Affairs",
    counselling: "Counselling",
    forum: "Forum",
    insight: "Insight",
    training: "Training",
    industrial: "Industrial",
    specialized: "Specialized",
    placements: "Placements",
    contact: "Contact",
    searchPlaceholder: "Search courses, teachers, topics...",
    login: "Login",
    signup: "Signup",
    loginTitle: "Login",
    signupTitle: "Sign Up",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    firstName: "First Name",
    lastName: "Last Name",
    address: "Address",
    class: "Class",
    subjectStream: "Subject Stream",
    selectClass: "Select Class",
    selectSubject: "Select Subject",
    science: "Science",
    arts: "Arts",
    commerce: "Commerce",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    language: "EN"
  },
  hi: {
    home: "होम",
    about: "हमारे बारे में",
    vision: "हमारा विजन",
    mission: "हमारा मिशन",
    values: "हमारे मूल्य",
    whyShiksha: "शिक्षा क्यों?",
    registration: "पंजीकरण",
    students: "छात्र",
    teachers: "शिक्षक",
    experts: "विशेषज्ञ",
    services: "सेवाएं",
    online: "ऑनलाइन",
    offline: "ऑफलाइन",
    classroom: "कक्षा",
    softwareDev: "सॉफ्टवेयर विकास",
    generalStudies: "सामान्य अध्ययन",
    currentAffairs: "वर्तमान मामले",
    counselling: "परामर्श",
    forum: "फोरम",
    insight: "अंतर्दृष्टि",
    training: "ट्रेनिंग",
    industrial: "इंडस्ट्रियल",
    specialized: "स्पेशलाइज़्ड",
    placements: "प्लेसमेंट",
    contact: "संपर्क",
    searchPlaceholder: "कोर्स, शिक्षक, विषय खोजें...",
    login: "लॉगिन",
    signup: "साइन अप",
    loginTitle: "लॉगिन",
    signupTitle: "साइन अप",
    email: "ईमेल",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    firstName: "पहला नाम",
    lastName: "अंतिम नाम",
    address: "पता",
    class: "कक्षा",
    subjectStream: "विषय स्ट्रीम",
    selectClass: "कक्षा चुनें",
    selectSubject: "विषय चुनें",
    science: "विज्ञान",
    arts: "कला",
    commerce: "वाणिज्य",
    dontHaveAccount: "खाता नहीं है?",
    alreadyHaveAccount: "पहले से खाता है?",
    language: "हिंदी"
  },
  bn: {
    home: "হোম",
    about: "আমাদের সম্পর্কে",
    vision: "আমাদের দৃষ্টি",
    mission: "আমাদের মিশন",
    values: "আমাদের মূল্যবোধ",
    whyShiksha: "শিক্ষা কেন?",
    registration: "নিবন্ধন",
    students: "ছাত্রছাত্রী",
    teachers: "শিক্ষক",
    experts: "বিশেষজ্ঞ",
    services: "পরিষেবা",
    online: "অনলাইন",
    offline: "অফলাইন",
    classroom: "ক্লাসরুম",
    softwareDev: "সফ্টওয়্যার উন্নয়ন",
    generalStudies: "সাধারণ অধ্যয়ন",
    currentAffairs: "বর্তমান বিষয়",
    counselling: "পরামর্শ",
    forum: "ফোরাম",
    insight: "অন্তর্দৃষ্টি",
    training: "ট্রেনিং",
    industrial: "ইন্ডাস্ট্রিয়াল",
    specialized: "স্পেশালাইজড",   
    placements: "প্লেসমেন্ট",
    contact: "যোগাযোগ",
    searchPlaceholder: "কোর্স, শিক্ষক, বিষয় অনুসন্ধান করুন...",
    login: "লগইন",
    signup: "সাইন আপ",
    loginTitle: "লগইন",
    signupTitle: "সাইন আপ",
    email: "ইমেল",
    password: "পাসওয়ার্ড",
    confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
    firstName: "প্রথম নাম",
    lastName: "শেষ নাম",
    address: "ঠিকানা",
    class: "ক্লাস",
    subjectStream: "বিষয় স্ট্রিম",
    selectClass: "ক্লাস নির্বাচন করুন",
    selectSubject: "বিষয় নির্বাচন করুন",
    science: "বিজ্ঞান",
    arts: "কলা",
    commerce: "বাণিজ্য",
    dontHaveAccount: "অ্যাকাউন্ট নেই?",
    alreadyHaveAccount: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
    language: "বাংলা"
  }
};

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  switchLanguage: () => {},
});

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language][key] || key;
  };

  const switchLanguage = () => {
    setLanguage(prev => {
      if (prev === 'en') return 'hi';
      if (prev === 'hi') return 'bn';
      return 'en';
    });
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};