import React, { useEffect, useRef, useState, forwardRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import HeroPlaceholder from '@/components/HeroPlaceholder';

// Styled Components
const BackgroundWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: url('/logos/hero-illustration.svg') no-repeat center center;
  background-size: cover;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  /* background: #F8F9FA; */
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  background: transparent;
  transition: background 0.3s, box-shadow 0.3s;
  box-shadow: none;

  &.scrolled {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(5px);
    box-shadow: 0 2px 12px rgba(0,0,0,0.03);
  }
`;

const Logo = styled.img.attrs({
  src: '/proflr.svg',
  alt: 'Proflr Logo'
})`
  height: 28px;
  width: auto;
  
  @media (min-width: 768px) {
    height: 32px;
  }
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 30px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 12px 18px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  flex: 1;
  justify-content: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-family: var(--font-satoshi);
  color: #2D3C33;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  
  &:hover {
    color: #00CE93;
  }
`;

const NavButton = styled.button`
  font-family: var(--font-satoshi);
  background: #00CE93;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  &:hover {
    background: #00B883;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavSecondaryButton = styled.button`
  font-family: var(--font-satoshi);
  background: white;
  color: #2D3C33;
  border: 1px solid #E5E5E5;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  margin-right: 16px;
  transition: all 0.2s ease;
  &:hover {
    background: #F8F9FA;
    border-color: #00CE93;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120px 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 20%, rgba(0, 206, 147, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(0, 206, 147, 0.03) 0%, transparent 50%),
      linear-gradient(45deg, rgba(0, 206, 147, 0.02) 25%, transparent 25%),
      linear-gradient(-45deg, rgba(0, 206, 147, 0.02) 25%, transparent 25%);
    background-size: 100% 100%, 100% 100%, 60px 60px, 60px 60px;
    background-position: 0 0, 0 0, 0 0, 0 0;
    opacity: 0.8;
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  margin-top: 220px;
  text-shadow: 0 2px 16px rgba(0,0,0,0.12);
  @media (max-width: 768px) {
    margin-top: 120px;
    padding: 0 16px;
    text-align: center;
  }
`;

const HeroTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #E8F7F2;
  color: #00CE93;
  padding: 8px 16px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
`;

const BlinkingDot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #00CE93;
  margin-right: 2px;
  animation: blink 1.5s infinite;

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const LiveButton = styled.span`
  display: inline-block;
  background: #00CE93;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 100px;
  margin-left: 2px;
  letter-spacing: 0.02em;
`;

const HeroTitle = styled.h1`
  font-family: var(--font-satoshi);
  font-size: 72px;
  line-height: 1.1;
  margin-bottom: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #2D3C33;
  
  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const HeroDescription = styled.p`
  font-family: var(--font-satoshi);
  font-size: 24px;
  color: #2D3C33;
  max-width: 600px;
  margin: 0 auto 48px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
    align-items: center;
    width: 100%;
    margin-top: 24px;
    & > button {
      width: 100%;
      max-width: 320px;
    }
  }
`;

const PrimaryButton = styled.button`
  font-family: var(--font-satoshi);
  background: #00CE93;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  
  &:hover {
    background: #00B883;
  }
`;

const SecondaryButton = styled.button`
  font-family: var(--font-satoshi);
  background: white;
  color: #2D3C33;
  border: 1px solid #E5E5E5;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  
  &:hover {
    background: #F8F9FA;
    border-color: #00CE93;
  }
`;

const Metrics = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  padding: 80px 0 40px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const MetricCardWrapper = styled.div`
  padding: 32px;
  text-align: left;
  position: relative;
  transition: transform 0.2s ease;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-color: #E5E5E5;
  }
  
  @media (max-width: 768px) {
    &:not(:last-child)::after {
      display: none;
    }
  }
`;

const MetricNumber = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: #2D3C33;
  margin-bottom: 8px;
  font-family: var(--font-satoshi);
`;

const MetricLabel = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: #666;
  margin-bottom: 8px;
`;

const MetricDescription = styled.div`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  display: none;
`;

const MetricQualifier = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: #666;
  margin-bottom: 8px;
`;

const ValueProposition = styled.div`
  padding: 60px 0;
  text-align: left;
  max-width: 1200px;
  margin: 0 auto;
  
  h2 {
    font-size: 48px;
    font-weight: 600;
    color: #2D3C33;
    font-family: var(--font-satoshi);
    
    @media (max-width: 768px) {
      font-size: 36px;
    }
  }
`;

interface MetricCardProps {
  number: string;
  label: string;
  qualifier?: string;
  description: string;
}

// Metric Card Component
const MetricCard: React.FC<MetricCardProps> = ({ number, label, qualifier, description }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <MetricCardWrapper ref={ref}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 }
        }}
        transition={{ duration: 0.5         }}
      >
        {qualifier && <MetricQualifier>{qualifier}</MetricQualifier>}
        <MetricNumber>
          {number}
        </MetricNumber>
        <MetricLabel>{label}</MetricLabel>
        <MetricDescription>{description}</MetricDescription>
      </motion.div>
    </MetricCardWrapper>
  );
};

// Add HeroBackground styled component
const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 700px;
  background: 
    linear-gradient(to bottom, rgba(255,255,255,0) 90%, #F8F9FA 99%, #F8F9FA 100%),
    url('/logos/hero_image2.svg') no-repeat center top;
  background-size: 100% auto, 100% auto;
  z-index: 0;

  @media (max-width: 768px) {
    height: 400px;
    background: 
      linear-gradient(to bottom, rgba(255,255,255,0) 85%, #F8F9FA 99%, #F8F9FA 100%),
      url('/logos/hero_image2.svg') no-repeat center top;
    background-size: 100% auto, 100% auto;
  }
`;

// Add HamburgerIcon styled component
const HamburgerIcon = styled.div`
  width: 32px;
  height: 32px;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (max-width: 768px) {
    display: flex;
  }
  & > span {
    display: block;
    width: 22px;
    height: 2px;
    background: #222;
    margin: 4px 0;
    border-radius: 2px;
    transition: 0.3s;
  }
`;

// Add CloseIcon styled component
const CloseIcon = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10001;
  @media (min-width: 769px) {
    display: none;
  }
  & > span {
    display: block;
    width: 22px;
    height: 2px;
    background: #222;
    border-radius: 2px;
    position: absolute;
    left: 5px;
    right: 5px;
  }
  & > span:first-child {
    transform: rotate(45deg);
  }
  & > span:last-child {
    transform: rotate(-45deg);
  }
`;

// Add MobileMenuOverlay styled component
const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255,255,255,0.98);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileMenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-bottom: 32px;
`;

const MobileMenuButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 80vw;
  max-width: 320px;
`;

// Transparent SVG data URI for placeholder
const transparentSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'></svg>";

// Add dummy logo bar data
const logoBarLogos = [
  { src: '/nlmtd_logo.svg', alt: 'nlmtd' },
  { src: '/accenture_logo.svg', alt: 'accenture' },
  { src: '/elsevier_logo.svg', alt: 'Elsevier' },
  { src: '/capgemini_logo.svg', alt: 'Capgemini' },
  { src: '/dept_logo.svg', alt: 'Dept' },
  { src: '/berenschot_logo.svg', alt: 'Berenschot' },
];

// Update companyTiles to use transparentSvg for missing logos/avatars
const companyTiles = [
  {
    logo: transparentSvg,
    quote: '',
    person: null,
    bg: '',
  },
  {
    logo: transparentSvg,
    quote: '',
    person: {
      name: 'Jane Doe',
      title: 'COO, Adyen',
      avatar: transparentSvg,
    },
    bg: '',
  },
  {
    logo: transparentSvg,
    quote: "Business onboarding used to be a cost center for Plaid. Now, it's a revenue driver thanks to Proflr's intuitive onboarding flows, enterprise-grade UX and minimal engineering work.",
    person: {
      name: 'Zak Lambert',
      title: 'GM EMEA, Plaid',
      avatar: transparentSvg,
    },
    bg: '',
  },
  {
    logo: transparentSvg,
    quote: "Proflr's policy engine and architecture systems are exceptional. I wish a platform like Proflr existed when we scaled Stripe across the globe.",
    person: {
      name: 'David Singleton',
      title: 'Former CTO, Stripe',
      avatar: transparentSvg,
    },
    bg: '',
  },
  {
    logo: transparentSvg,
    quote: '',
    person: null,
    bg: '',
  },
  {
    logo: transparentSvg,
    quote: '',
    person: {
      name: 'Wopke Dost',
      title: 'Director, nlmtd',
      avatar: transparentSvg,
    },
    bg: '',
  },
];

// Create a forwardRef wrapper for the Hero section to properly handle the ref
const HeroWithRef = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => (
  <Hero ref={ref} {...props} />
));

// Add these Footer styled components right before the export default statement if they don't exist:
const Footer = styled.footer`
  background: #B4C96D;
  color: #EAE4D3;
  padding: 60px 0 40px;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 32px;
  margin-bottom: 40px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterLogo = styled.div`
  img {
    height: 40px;
  }
`;

const FooterLinksSection = styled.div`
  display: flex;
  justify-content: space-around;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const FooterLinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FooterLinkTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const FooterLink = styled.a`
  color: #EAE4D3;
  text-decoration: none;
  font-size: 15px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FooterCTA = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const FooterCTAButton = styled.button`
  background: #FA8072;
  color: #FFF;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  
  &:hover {
    background: #F57063;
  }
`;

const FooterDivider = styled.hr`
  border: none;
  height: 1px;
  background: rgba(234, 228, 211, 0.3);
  margin: 0 0 32px 0;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const FooterCopyright = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FooterTagline = styled.div`
  font-size: 14px;
`;

const FooterSocial = styled.div`
  display: flex;
  gap: 16px;
`;

const SocialLink = styled.a`
  color: #EAE4D3;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
`;

// Main Component
const LandingPage = () => {
  const [navScrolled, setNavScrolled] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState('connected-onboarding');
  
  // Add a ref for the hero section
  const heroRef = useRef<HTMLElement>(null);

  // Update the useEffect hook to trigger later in the scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        // Activate when we're about 70% through the hero section
        const heroHeight = heroRef.current.offsetHeight;
        const scrollPosition = window.scrollY;
        const triggerPosition = heroHeight * 0.9; 
        
        setNavScrolled(scrollPosition > triggerPosition);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <HeroBackground />
      <Nav className={navScrolled ? 'scrolled' : ''}>
        <NavContent>
          <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>
            <Logo />
          </div>
          <NavLinks>
          </NavLinks>
          <div style={{ flex: '0 0 auto', marginLeft: 32, display: 'flex', alignItems: 'center', gap: 0 }}>
            <NavSecondaryButton>Login</NavSecondaryButton>
            <NavButton as="a" href="https://cal.com/pompadourventures/proflrdemo" target="_blank" rel="noopener noreferrer">Schedule a Demo</NavButton>
          </div>
          {!mobileMenuOpen && (
            <HamburgerIcon onClick={() => setMobileMenuOpen(true)}>
              <span />
              <span />
              <span />
            </HamburgerIcon>
          )}
        </NavContent>
      </Nav>
      {mobileMenuOpen && (
        <MobileMenuOverlay onClick={() => setMobileMenuOpen(false)}>
          <MobileMenuLinks onClick={e => e.stopPropagation()}>
          </MobileMenuLinks>
          <MobileMenuButtonGroup onClick={e => e.stopPropagation()}>
            <NavSecondaryButton style={{ display: 'block', width: '100%' }}>Login</NavSecondaryButton>
            <NavButton as="a" href="https://cal.com/pompadourventures/proflrdemo" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%' }}>Schedule a Demo</NavButton>
          </MobileMenuButtonGroup>
        </MobileMenuOverlay>
      )}
      <Container>
        <HeroWithRef ref={heroRef}>
          <HeroContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <HeroTag>
                <BlinkingDot />
                Beta release
              </HeroTag>
              <HeroTitle>
                The new standard<br/>
                in expert matching
              </HeroTitle>
              <HeroDescription>
              AI-powered matching that connects your challenge with the right expert, promotes diversity, and accelerates both business and expert growth.
              </HeroDescription>
              <HeroButtons>
                <PrimaryButton as="a" href="https://cal.com/pompadourventures/proflrdemo" target="_blank" rel="noopener noreferrer">Schedule a Demo</PrimaryButton>
              </HeroButtons>
            </motion.div>
          </HeroContent>
        </HeroWithRef>

        <LogoBarSection>
          <LogoBarLabel>Built for businesses that lead with knowledge</LogoBarLabel>
          <LogoBarCarouselWrapper>
            <LogoBarGradient className="left" />
            <LogoBarGradient className="right" />
            <LogoBarCarousel>
              {[...logoBarLogos, ...logoBarLogos].map((logo, i) => (
                <LogoBarLogo key={i} src={logo.src} alt={logo.alt} />
              ))}
            </LogoBarCarousel>
          </LogoBarCarouselWrapper>
        </LogoBarSection>

        <Metrics>
          <MetricCard 
            number="10x"
            label="faster team assembly"
            qualifier="Up to"
            description=""
          />
          <MetricCard 
            number="200%"
            label="across people and skills"
            qualifier="Increase visibility by"
            description=""
          />
          <MetricCard 
            number="4x"
            label="more projects on expertise, not familiarity"
            qualifier="Match at least"
            description=""
          />
        </Metrics>

        <ValueProposition>
          <h2>Designed to connect. Built to match.</h2>
        </ValueProposition>

        <Features id="features">
          <FeatureGrid>
            <FeatureCol>
              <FeatureIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </FeatureIcon>
              <FeatureTitle>Staff the right people</FeatureTitle>
              <FeatureDescription>
              Find the best fit for every project. Proflr makes your team’s skills and strengths visible, so you can match people to work that truly fits.
              </FeatureDescription>
            </FeatureCol>
            <FeatureCol>
              <FeatureIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8a6 6 0 0 1-12 0"/>
                  <rect x="6" y="2" width="12" height="6" rx="2"/>
                  <path d="M9 18v-2"/>
                  <path d="M15 18v-2"/>
                  <path d="M8 22h8"/>
                  <path d="M12 16v6"/>
                </svg>
              </FeatureIcon>
              <FeatureTitle>Up-to-date availability</FeatureTitle>
              <FeatureDescription>
              Always know who’s available. Proflr keeps schedules in sync with live project data, ensuring accurate staffing decisions at every moment.
              </FeatureDescription>
            </FeatureCol>
            <FeatureCol>
              <FeatureIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                  <path d="M16 11V7a4 4 0 0 0-8 0v4"/>
                  <rect x="8" y="15" width="8" height="6" rx="2"/>
                </svg>
              </FeatureIcon>
              <FeatureTitle>Grow the right skills</FeatureTitle>
              <FeatureDescription>
              Stay ahead in a changing market. Proflr identifies and nurtures the skills that drive future success, helping consultants grow, teams evolve, and organizations stay ready for what’s next.
              </FeatureDescription>
            </FeatureCol>
          </FeatureGrid>
        </Features>

        <OnboardingSection id="onboarding">
          <Container>
            <SectionTitle>The team intelligence platform for modern organisations.</SectionTitle>
            <SectionSubtitle>Proflr connects people, projects, and skills. From onboarding to team formation, so you always know who fits where.</SectionSubtitle>
            
            <OnboardingContent>
              <OnboardingVisual>
                {activeFeature === 'connected-onboarding' && (
                  <OnboardingImage>
                    <LargeVisualPlaceholder>
                      <img 
                        alt="Connected onboarding visual" 
                        src="http://localhost:3845/assets/4874e3ef05efdb0a3a63cc89ce480cd4a67d78c2.svg"
                        style={{ width: '329px', height: '458px' }}
                      />
                    </LargeVisualPlaceholder>
                  </OnboardingImage>
                )}
                
                {activeFeature === 'smart-matching' && (
                  <OnboardingImage>
                    <LargeVisualPlaceholder>
                      <Frame2Container>
                        <img 
                          alt="Proflr Smart Project Interface" 
                          src="/profilr smart project.svg"
                          style={{ 
                            width: '100%', 
                            height: 'auto', 
                            maxHeight: '500px',
                            filter: 'drop-shadow(0 0 0 transparent)'
                          }}
                        />
                      </Frame2Container>
                    </LargeVisualPlaceholder>
                  </OnboardingImage>
                )}
                
                {activeFeature === 'team-intelligence' && (
                  <OnboardingImage>
                    <LargeVisualPlaceholder>
                      <img 
                        alt="Team intelligence visual" 
                        src="http://localhost:3845/assets/4bc6398a8b47f3ec4285705e4a4747fc4ba9638b.svg"
                        style={{ width: '331px', height: '458px' }}
                      />
                    </LargeVisualPlaceholder>
                  </OnboardingImage>
                )}
              </OnboardingVisual>
              
              <OnboardingFeatures>
                <OnboardingFeatureItem 
                  isActive={activeFeature === 'connected-onboarding'} 
                  onClick={() => setActiveFeature('connected-onboarding')}
                >
                  <OnboardingFeatureIcon>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00CE93" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </OnboardingFeatureIcon>
                  <OnboardingFeatureContent>
                    <OnboardingFeatureTitle>Connected onboarding</OnboardingFeatureTitle>
                    <OnboardingFeatureText>
                      Start strong from day one. Proflr connects new team members to the right colleagues based on shared skills and interests, creating a smooth landing and faster integration into the organisation.
                    </OnboardingFeatureText>
                  </OnboardingFeatureContent>
                </OnboardingFeatureItem>
                
                <OnboardingFeatureItem 
                  isActive={activeFeature === 'smart-matching'} 
                  onClick={() => setActiveFeature('smart-matching')}
                >
                  <OnboardingFeatureIcon>
                    <img 
                      alt="Smart project matching icon" 
                      src="http://localhost:3845/assets/a3b831a2d62779ef080a625f3066a0c43297fbe4.svg"
                      width="20"
                      height="20"
                    />
                  </OnboardingFeatureIcon>
                  <OnboardingFeatureContent>
                    <OnboardingFeatureTitle>Smart project matching</OnboardingFeatureTitle>
                    <OnboardingFeatureText>
                      Use natural language to describe a project and instantly see the best available consultants. Proflr ensures every role is filled with the right expertise at the right time.
                    </OnboardingFeatureText>
                  </OnboardingFeatureContent>
                </OnboardingFeatureItem>
                
                <OnboardingFeatureItem 
                  isActive={activeFeature === 'team-intelligence'} 
                  onClick={() => setActiveFeature('team-intelligence')}
                >
                  <OnboardingFeatureIcon>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00CE93" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      <circle cx="18" cy="12" r="3"/>
                      <path d="M18 9v6"/>
                      <path d="M16.5 10.5h3"/>
                      <path d="M16.5 13.5h3"/>
                    </svg>
                  </OnboardingFeatureIcon>
                  <OnboardingFeatureContent>
                    <OnboardingFeatureTitle>Team intelligence</OnboardingFeatureTitle>
                    <OnboardingFeatureText>
                      Build teams that work. Proflr looks beyond individual matches to shape balanced, high-performing teams — combining skills, experience, and availability for the best project outcomes.
                    </OnboardingFeatureText>
                  </OnboardingFeatureContent>
                </OnboardingFeatureItem>
              </OnboardingFeatures>
            </OnboardingContent>
          </Container>
        </OnboardingSection>

        <Testimonials>
          <SectionTitle>Trusted by leading companies</SectionTitle>
          <TestimonialGrid>
            <TestimonialCard>
              <TestimonialCompany>
                <img src="/nlmtd_logo.svg" alt="nlmtd logo" style={{ height: '24px' }} />
              </TestimonialCompany>
              <TestimonialText>
                "Our scheduling overview makes it hard to see who is really looking for new projects, let alone what kind of projects."
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorAvatar>
                  <img src="/Wopke-Dost-1.1-scaled-e1749050679512.webp" alt="Wopke Dost" />
                </AuthorAvatar>
                <AuthorInfo>
                  <AuthorName>Wopke Dost</AuthorName>
                  <AuthorTitle>Director, nlmtd</AuthorTitle>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
            <TestimonialCard>
              <TestimonialCompany>
                <img src="/nlmtd_logo.svg" alt="nlmtd logo" style={{ height: '24px' }} />
              </TestimonialCompany>
              <TestimonialText>
                "How might we shape perfect project team in less the 5 minutes? Proflr is giving us the tool to do so."
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorAvatar>
                  <img src="/Leonard-Bukenya-1.1-scaled-e1749042607447.webp" alt="Leonard Bukenya" />
                </AuthorAvatar>
                <AuthorInfo>
                  <AuthorName>Leonard Bukenya</AuthorName>
                  <AuthorTitle>Business Development, nlmtd</AuthorTitle>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialGrid>
        </Testimonials>

        <CTA ref={ctaRef}>
          <CTAContent>
            <CTATitle>Ready to transform your expert matching?</CTATitle>
            <CTADescription>
              Join leading companies who trust Proflr for their consultant matching needs.
            </CTADescription>
            <CTAButtons>
              <PrimaryButton>Get Started</PrimaryButton>
              <SecondaryButton as="a" href="https://cal.com/pompadourventures/proflrdemo" target="_blank" rel="noopener noreferrer">Schedule a Demo</SecondaryButton>
            </CTAButtons>
          </CTAContent>
        </CTA>
      </Container>
      
      <Footer>
        <FooterContainer>
          <FooterTop>
            <FooterLogo>
              <img src="/proflr.svg" alt="Proflr Logo" />
            </FooterLogo>
            <FooterLinksSection>
              <FooterLinkGroup>
                <FooterLinkTitle>Home</FooterLinkTitle>
              </FooterLinkGroup>
              <FooterLinkGroup>
                <FooterLinkTitle>How it works</FooterLinkTitle>
                <FooterLink href="#privacy">Privacy policy</FooterLink>
              </FooterLinkGroup>
              <FooterLinkGroup>
                <FooterLinkTitle>Our mission</FooterLinkTitle>
                <FooterLink href="https://www.pompadour.ventures/ventures/proflr" target="_blank" rel="noopener noreferrer">Proflr</FooterLink>
              </FooterLinkGroup>
            </FooterLinksSection>
            <FooterCTA>
              <FooterCTAButton as="a" href="mailto:madame@pompadour.ventures?subject=I%20have%20a%20question/idea">CONTACT US</FooterCTAButton>
            </FooterCTA>
          </FooterTop>
          <FooterDivider />
          <FooterBottom>
            <FooterCopyright>
              Copyright © {new Date().getFullYear()}
              <FooterTagline>A Pompadour.ventures initiative.</FooterTagline>
            </FooterCopyright>
            <FooterSocial>
              <SocialLink href="https://www.linkedin.com/company/pompadour-ventures" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </SocialLink>
            </FooterSocial>
          </FooterBottom>
        </FooterContainer>
      </Footer>
    </div>
  );
};

const LogoCloud = styled.section`
  text-align: center;
  padding: 80px 0;
  background: #F8F9FA;
`;

const TrustedBy = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 32px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 40px;
  align-items: center;
`;

const CompanyLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const LogoImage = styled.img`
  max-width: 140px;
  height: auto;
  filter: grayscale(100%);
  transition: filter 0.2s ease;
  
  &:hover {
    filter: grayscale(0%);
  }
`;

const Features = styled.section`
  padding: 40px 0 80px 0;
  background: transparent;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeaturesHeadline = styled.h2`
  font-size: 44px;
  font-weight: 700;
  margin-bottom: 64px;
  color: #2D3C33;
  text-align: left;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  max-width: 1100px;
  margin: 0 auto;
`;

const FeatureCol = styled.div`
  text-align: left;
`;

const FeatureIcon = styled.div`
  font-size: 32px;
  margin-bottom: 24px;
  color: #2D3C33;
  svg {
    width: 32px;
    height: 32px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #2D3C33;
`;

const FeatureDescription = styled.p`
  color: #888;
  font-size: 17px;
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 48px;
  color: #2D3C33;
`;

const Testimonials = styled.section`
  padding: 80px 0;
  background: #F8F9FA;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;
`;

const TestimonialCard = styled.div`
  background: #FFFFFF;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TestimonialText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #2D3C33;
  margin-bottom: 24px;
  flex-grow: 1;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AuthorName = styled.div`
  font-weight: 600;
  color: #2D3C33;
`;

const AuthorTitle = styled.div`
  color: #666;
  font-size: 14px;
`;

const TestimonialCompany = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #2D3C33;
  margin-bottom: 16px;
`;

const AuthorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CTA = styled.section`
  padding: 80px 0;
  background: #F8F9FA;
  text-align: center;
`;

const CTAContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #2D3C33;
`;

const CTADescription = styled.p`
  font-size: 18px;
  color: #2D3C33;
  margin-bottom: 32px;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

// Add LogoBarSection styled components
const LogoBarSection = styled.section`
  padding: 48px 0 32px 0;
  background: #F8F9FA;
  text-align: center;
`;
const LogoBarLabel = styled.div`
  color: #888;
  font-size: 18px;
  margin-bottom: 32px;
`;
const LogoBarCarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
`;
const LogoBarCarousel = styled.div`
  display: flex;
  align-items: center;
  min-width: 1200px;
  animation: scroll-logos 32s linear infinite;
  will-change: transform;

  @keyframes scroll-logos {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;
const LogoBarGradient = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  pointer-events: none;
  z-index: 2;

  &.left {
    left: 0;
    background: linear-gradient(to right, #F8F9FA 80%, rgba(248,249,250,0) 100%);
  }
  &.right {
    right: 0;
    background: linear-gradient(to left, #F8F9FA 80%, rgba(248,249,250,0) 100%);
  }
`;
const LogoBarLogo = styled.img`
  height: 40px;
  opacity: 0.5;
  filter: grayscale(100%);
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.8;
  }
  margin: 0 20px;
`;

// Add OnboardingSection styled components
const OnboardingSection = styled.section`
  padding: 120px 0;
  background: transparent;
`;

const SectionSubtitle = styled.p`
  font-size: 20px;
  color: #2D3C33;
  margin-bottom: 64px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const OnboardingContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  margin-top: 60px;
  text-align: left;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const OnboardingVisual = styled.div`
  background: transparent;
  border-radius: 0;
  height: 500px;
  position: relative;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 992px) {
    height: 400px;
    margin-bottom: 40px;
  }
`;

const OnboardingImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  overflow: visible;
`;

const OnboardingCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  padding: 32px;
  border-radius: 12px;
  background: #FFFFFF;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const CardHeader = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #2D3C33;
`;

const CardItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CardLabel = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #2D3C33;
`;

const CardValue = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #2D3C33;
`;

const CardCheck = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #00CE93;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OnboardingFeatures = styled.div`
  display: flex;
  flex-direction: column;
`;

interface OnboardingFeatureItemProps {
  isActive: boolean;
}

const OnboardingFeatureItem = styled.div<OnboardingFeatureItemProps>`
  display: flex;
  gap: 20px;
  padding: 24px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.isActive ? '#F0FBF8' : 'white'};
  border: 1px solid ${props => props.isActive ? '#00CE93' : '#E5E5E5'};
  margin-bottom: 16px;
  
  &:hover {
    border-color: #00CE93;
  }
`;

const OnboardingFeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #E5E5E5;
  flex-shrink: 0;
  
  span {
    color: #00CE93;
    font-weight: 600;
  }
`;

const OnboardingFeatureContent = styled.div`
  flex: 1;
`;

const OnboardingFeatureTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 8px;
`;

const OnboardingFeatureText = styled.div`
  color: #666;
  font-size: 15px;
  line-height: 1.5;
`;

const VisualPlaceholder = styled.div<{ size: string }>`
  width: ${props => props.size};
  height: ${props => props.size};
  background: #F0F0F0;
  border: 2px dashed #CCC;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 12px;
  font-weight: 500;
  
  &::after {
    content: 'Visual';
  }
`;

const LargeVisualPlaceholder = styled.div`
  width: 400px;
  height: 500px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: none;
  border-radius: 0;
  box-shadow: none;
`;

const PlaceholderImage = styled.div`
  text-align: center;
  color: #999;
`;

const PlaceholderText = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #666;
`;

const PlaceholderDimensions = styled.div`
  font-size: 12px;
  color: #999;
`;

const ResponseCardContainer = styled.div`
  position: relative;
  width: 280px;
  height: 315px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 38px 6px rgba(112, 144, 176, 0.2);
  overflow: hidden;
`;

const ResponseCardHeader = styled.div`
  position: absolute;
  top: 41px;
  left: 42px;
  width: 128px;
  height: 12px;
  
  img {
    width: 100%;
    height: 100%;
  }
`;

const ResponseCardRow = styled.div`
  position: relative;
  width: 100%;
  height: 64px;
  
  img {
    width: 100%;
    height: 100%;
  }
  
  &:nth-child(2) {
    top: 75px;
  }
  
  &:nth-child(3) {
    top: 139px;
  }
  
  &:nth-child(4) {
    top: 203px;
  }
`;

const CandidateName = styled.div`
  position: absolute;
  top: 24px;
  left: 25px;
  width: 109px;
  height: 14px;
  
  img {
    width: 100%;
    height: 100%;
  }
`;

const MatchPercentage = styled.div`
  position: absolute;
  top: 26px;
  left: 191px;
  width: 101px;
  height: 14px;
  
  img {
    width: 100%;
    height: 100%;
  }
`;

const ArrowIcon = styled.div`
  position: absolute;
  top: 23px;
  right: 24px;
  width: 19px;
  height: 19px;
  
  img {
    width: 100%;
    height: 100%;
  }
`;

const Frame2Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  border-radius: 0;
  background: transparent;
  
  img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
  }
`;

// Add the OnboardingPlaceholder styled component
const OnboardingPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  
  .settings-card, .info-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    width: 240px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    
    h4 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #333;
    }
    
    .item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
      
      &:last-child {
        border-bottom: none;
      }
      
      .check {
        width: 20px;
        height: 20px;
        background: #00CE93;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }
    }
  }
  
  .arrow {
    margin: 0 24px;
    font-size: 24px;
    color: #00CE93;
  }
  
  .conversion-chart {
    display: flex;
    align-items: flex-end;
    gap: 32px;
    height: 300px;
    
    .bar-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 80px;
      
      .bar {
        width: 100%;
        background: #ddd;
        border-radius: 8px 8px 0 0;
        transition: height 0.5s ease;
        
        &.highlight {
          background: #00CE93;
        }
      }
      
      .label {
        margin-top: 12px;
        font-size: 16px;
        color: #666;
      }
    }
    
    .metric {
      margin-left: 24px;
      
      .value {
        font-size: 36px;
        font-weight: 700;
        color: #00CE93;
      }
      
      .label {
        font-size: 16px;
        color: #666;
      }
    }
  }
  
  .globe {
    position: relative;
    width: 300px;
    height: 300px;
    
    .circle {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid #ddd;
      background: #f8f9fa;
    }
    
    .marker {
      position: absolute;
      font-size: 24px;
      transform: translate(-50%, -50%);
      transition: all 0.3s ease;
      
      &:hover {
        transform: translate(-50%, -50%) scale(1.2);
      }
    }
  }
  
  .localization-metric {
    position: absolute;
    bottom: 60px;
    right: 80px;
    text-align: center;
    background: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    
    .value {
      font-size: 36px;
      font-weight: 700;
      color: #00CE93;
    }
    
    .label {
      font-size: 16px;
      color: #666;
    }
  }
`;

export default LandingPage; 