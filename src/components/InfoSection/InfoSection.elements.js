import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const InfoSec = styled.div`
  color: #fff;
  padding: 110px 0;
  background: ${({ backgroundImage, lightBg }) => 
    backgroundImage ? 
    `url(${backgroundImage}) center/cover no-repeat` : 
    (lightBg ? '#fff' : '#101522')
  };
`;

export const InfoRow = styled.div`
  display: flex;
  margin: 0 -15px -15px -15px;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: ${({ imgStart }) => (imgStart ? 'row-reverse' : 'row')};
`;

export const InfoColumn = styled.div`
  margin-bottom: 15px;
  padding-right: 15px;
  padding-left: 15px;
  flex: 1;
  max-width: 50%;
  flex-basis: 50%;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    flex-basis: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 60px;

  @media screen and (max-width: 768px) {
    padding-bottom: 65px;
  }
`;

export const TopLine = styled.div`
  color: ${({ lightTopLine }) => (lightTopLine ? '#a9b3c1' : '#4b59f7')};
  font-size: 28px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  margin-bottom: 16px;
`;

export const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  color: ${({ lightText }) => (lightText ? '#f7f8fa' : '#1c2237')};
`;

export const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({ lightTextDesc }) => (lightTextDesc ? '#a9b3c1' : '#1c2237')};
`;

export const ImgWrapper = styled.div`
  max-width: 555px;
  display: flex;
  justify-content: ${({ start }) => (start ? 'flex-start' : 'flex-end')};
`;

export const Img = styled.img`
  padding-right: 0;
  border: 0;
  max-width: 100%;
  vertical-align: middle;
  display: inline-block;
  max-height: 500px;
`;

export const BulletList = styled.ul`
  margin-bottom: 35px;
  padding-left: 20px;
`;

export const BulletItem = styled.li`
  font-size: 18px;
  line-height: 24px;
  color: #a9b3c1;
  margin-bottom: 10px;
`;

// New styles for the feature sections in homeObjThree
export const FeatureBox = styled.div`
  background: #101522;
  padding: 20px;
  height: 400px;
  border-radius: 60px;
  border-style: solid;
  border-color: blue;
  border-width: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1;
  min-width: 250px; /* Ensures a minimum width */
  max-width: 30%; /* Ensures no more than three boxes fit in one row */
  margin: 10px; /* Add margin to separate boxes */

  /* Ensure boxes are responsive and stack vertically on smaller screens */
  // @media screen and (max-width: 768px) {
  //   max-width: 90%; /* Stack vertically on small screens */
  // }

  &:hover {
    transform: scale(1.06);
    transition: all 0.3s ease-out;
    color: #1c2237;
  }
`;

export const FeatureContainer = styled.div`
  display: flex;
  flex-direction: row; /* Default layout is row */
  justify-content: space-between;
  flex-wrap: wrap; /* Allow wrapping on small screens */
  gap: 20px; /* Space between boxes */
  padding: 0 15px;

  @media screen and (max-width: 768px) {
    flex-direction: column; /* Stack boxes vertically on small screens */
    align-items: center;
  }
`;


export const FeatureTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #fff;
`;

export const FeatureDescription = styled.p`
  font-size: 16px;
  color: #fff;
  line-height: 24px;
`;
export const FeatureIcon = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
   /* Adjust size as needed */
  height: 60px; /* Adjust size as needed */
  margin-top:60px;
  margin-bottom: 50px; /* Space between icon and title */
  

  img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Adjust as needed */
  }
`;