import ShareIcon from '../../components/InfoSection/share_1.png';
import UploadIcon from '../../components/InfoSection/upload_1.png';
import RetriveIcon from '../../components/InfoSection/retrieve.png'

// import RetriveIcon from '../../components/InfoSection/retrive.png';
import React from 'react'; 
import { FeatureIcon } from '../../components/InfoSection/InfoSection.elements'; // Import FeatureIcon
export const homeObjOne = {
  primary: true,
  // lightBg: false,
  lightTopLine: true,
  lightText: true,
  lightTextDesc: true,
  topLine: 'Decentralized Evault',
  headline: 'Secure platform for managing and sharing files',
  description:
    'Your Important Documents Deserve the Highest Level of Protection, Security to Ensure Their Integrity and Accessibility at All Times',
  // buttonLabel: 'Get Started',
  imgStart: '',
  img: require('../../images/svg-1.svg'),
  alt: 'Credit Card',
  start: '',
  backgroundImage: require('../../images/transformation-4707710_1280.jpg')
};

export const homeObjTwo = {
  primary: true,
  lightBg: false,
  lightTopLine: true,
  lightText: true,
  lightTextDesc: true,
  TopHeading: 'Our Services',
  topLine: 'Comprehensive Solutions for Your Needs',
  headline: 'Explore Our Wide Range of Professional Services',
  description: 
    "At VaultX, we offer a variety of services designed to meet your every need. From secure document management to seamless data sharing, our solutions ensure your information is protected and easily accessible. ",
  bulletPoints: [
    'Secure Document Management',
    'Seamless Data Sharing',
    'Tamper-Proof',
    'Customized Solutions',
    'High-Level Security',
  ],
  buttonLabel: 'Learn More',
  imgStart: '',
  img: require('../../images/svg-2.svg'),
  alt: 'Vault',
  start: ''
};


export const homeObjThree = {
  primary: false,
  lightBg: true,
  lightTopLine: false,
  lightText: false,
  lightTextDesc: false,
  topLine: 'Our Features',
  headline: 'Manage Your Files Efficiently',
  description: '',
  buttonLabel: '',
  imgStart: '',
  img: '',
  alt: '',
  start: '',
  features: [
    {
      title: 'Sharing',
      description: 'Easily share your important documents securely with others.',
      icon: ShareIcon,
    },
    {
      title: 'Uploading',
      description: 'Upload your files to our secure platform with ease.',
      icon:UploadIcon
    },
    {
      title: 'Retrieving',
      description: 'Quickly retrieve your documents whenever you need them.',
       icon:RetriveIcon
     
    }
  ]
};
export const homeObjFour = {
  primary: true,
  lightBg: false,
  lightTopLine: true,
  lightText: true,
  lightTextDesc: true,
  topLine: 'Secure Database',
  headline: 'All your data is stored on our secure server',
  description:
    'You will never have to worry about your information getting leaked. Our team of security experts will ensure your records are kept safe.',
  buttonLabel: 'Sign Up Now',
  imgStart: 'start',
  img: require('../../images/svg-3.svg'),
  alt: 'Vault',
  start: 'true',
  isFeatureSection: true, // Indicates that this section uses the feature layout
  backgroundImage: '',
};
