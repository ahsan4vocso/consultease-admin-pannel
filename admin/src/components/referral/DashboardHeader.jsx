import styled, { keyframes } from 'styled-components';

const HeaderWrapper = styled.div`
  padding: 0 0 1.5rem 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const HeaderLeft = styled.div`
  flex: 1;
`;

const wave = keyframes`
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.025em;
  
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.neutral800} 0%,
    ${({ theme }) => theme.colors.neutral800} 25%,
    ${({ theme }) => theme.colors.primary600} 50%,
    ${({ theme }) => theme.colors.neutral800} 75%,
    ${({ theme }) => theme.colors.neutral800} 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${wave} 4s linear infinite;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.neutral600};
  margin: 0;
  font-weight: 500;
`;

const DashboardHeader = () => {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <HeaderLeft>
          <Title>Referral Analytics</Title>
          <Subtitle>
            Monitor and analyze referral performance across the network
          </Subtitle>
        </HeaderLeft>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default DashboardHeader;
