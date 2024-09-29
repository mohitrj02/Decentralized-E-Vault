import React from 'react';
import { 
  InfoSec, 
  InfoRow, 
  InfoColumn, 
  TextWrapper, 
  TopLine, 
  Heading, 
  Subtitle, 
  ImgWrapper, 
  Img, 
  BulletList, 
  BulletItem, 
  FeatureBox, 
  FeatureTitle, 
  FeatureDescription,
  FeatureContainer, 
  FeatureIcon,
} from './InfoSection.elements';
import { Container, Button } from '../../globalStyles';


const InfoSection = ({
  primary,
  lightBg,
  lightTopLine,
  lightText,
  lightTextDesc,
  topLine,
  headline,
  description,
  bulletPoints,
  buttonLabel,
  img,
  alt,
  imgStart,
  start,
  backgroundImage,
  features // Add this prop to handle the features in homeObjThree
}) => {
  return (
    <>
      <InfoSec lightBg={lightBg} backgroundImage={backgroundImage}>
        <Container>
          {features ? (
            <>
              <TextWrapper>
                <TopLine lightTopLine={lightTopLine}>{topLine}</TopLine>
                <Heading lightText={lightText}>{headline}</Heading>
              </TextWrapper>
              <FeatureContainer>
                {features.map((feature, index) => (
                  <FeatureBox key={index}>
                    <FeatureIcon>
    <img src={feature.icon} />
  </FeatureIcon>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                  </FeatureBox>
                ))}
              </FeatureContainer>
            </>
          ) : (
            <InfoRow imgStart={imgStart}>
              <InfoColumn>
                <TextWrapper>
                  <TopLine lightTopLine={lightTopLine}>{topLine}</TopLine>
                  <Heading lightText={lightText}>{headline}</Heading>
                  <Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>
                  {bulletPoints && (
                    <BulletList>
                      {bulletPoints.map((point, index) => (
                        <BulletItem key={index}>{point}</BulletItem>
                      ))}
                    </BulletList>
                  )}
                  {/* <Button big fontBig primary={primary}>
                    {buttonLabel}
                  </Button> */}
                </TextWrapper>
              </InfoColumn>
              <InfoColumn>
                <ImgWrapper start={start}>
                  <Img src={img} alt={alt} />
                </ImgWrapper>
              </InfoColumn>
            </InfoRow>
          )}
        </Container>
      </InfoSec>
    </>
  );
};

export default InfoSection;
