import React from 'react';
import { Button } from '../../globalStyles';
import { AiFillThunderbolt } from 'react-icons/ai';
import { GiCrystalBars } from 'react-icons/gi';
import { GiCutDiamond, GiRock } from 'react-icons/gi';
import { GiFloatingCrystal } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';
// Pricing.js

import {
  PricingSection,
  PricingWrapper,
  PricingHeading,
  PricingContainer,
  PricingCard,
  PricingCardInfo,
  PricingCardIcon,
  PricingCardPlan,
  PricingCardCost,
  PricingCardLength,
  PricingCardFeatures,
  PricingCardFeature,
  backgroundImage
 
} from './Pricing.elements';

 const Pricing = () => {
  return (
    <IconContext.Provider value={{ color: '#a9b3c1', size: 64 }} >
      <PricingSection backgroundImage={backgroundImage}>
        <PricingWrapper>
          <PricingHeading>Our Services</PricingHeading>
          <PricingContainer>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon>
                  <GiRock />
                </PricingCardIcon>
                <PricingCardPlan>Basic</PricingCardPlan>
                <PricingCardCost>299 INR</PricingCardCost>
                <PricingCardLength>per month</PricingCardLength>
                <PricingCardFeatures>
                  <PricingCardFeature>50 Uploads per day</PricingCardFeature>
                  <PricingCardFeature>Basic Support</PricingCardFeature>
                  <PricingCardFeature>Limited Storage</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Choose Plan</Button>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon>
                  <GiCrystalBars />
                </PricingCardIcon>
                <PricingCardPlan>Standard</PricingCardPlan>
                <PricingCardCost>599 INR</PricingCardCost>
                <PricingCardLength>per month</PricingCardLength>
                <PricingCardFeatures>
                  <PricingCardFeature>100 Uploads per day</PricingCardFeature>
                  <PricingCardFeature>Standard Support</PricingCardFeature>
                  <PricingCardFeature>Unlimited Storage</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Choose Plan</Button>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/sign-up'>
              <PricingCardInfo>
                <PricingCardIcon>
                  <GiCutDiamond />
                </PricingCardIcon>
                <PricingCardPlan>Premium</PricingCardPlan>
                <PricingCardCost>999 INR</PricingCardCost>
                <PricingCardLength>per month</PricingCardLength>
                <PricingCardFeatures>
                  <PricingCardFeature>Unlimited Uploads</PricingCardFeature>
                  <PricingCardFeature>24/7 Priority Support</PricingCardFeature>
                  <PricingCardFeature>Full Customziation</PricingCardFeature>
                  <PricingCardFeature>Unlimited Storage</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Choose Plan</Button>
              </PricingCardInfo>
            </PricingCard>
          </PricingContainer>
        </PricingWrapper>
      </PricingSection>
    </IconContext.Provider>
  );
}

export default Pricing