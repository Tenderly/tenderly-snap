import { ReactNode } from 'react';
import styled from 'styled-components';

type CardProps = {
  content: {
    title?: string;
    description: ReactNode;
    data?: ReactNode;
  };
  disabled?: boolean;
  fullWidth?: boolean;
};

const CardWrapper = styled.div<{ fullWidth?: boolean; disabled: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? 'auto' : '250px')};
  background-color: ${({ theme }) => theme.colors.card.default};
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.default};
  box-shadow: ${({ theme }) => theme.shadows.default};
  filter: opacity(${({ disabled }) => (disabled ? '.4' : '1')});
  align-self: stretch;

  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin: 0;

  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const Description = styled.div`
  margin-top: 2.4rem;
  margin-bottom: 2.4rem;
`;

export const Card = ({ content, disabled = false, fullWidth }: CardProps) => {
  const { title, description, data } = content;
  return (
    <CardWrapper fullWidth={fullWidth} disabled={disabled}>
      {title && <Title>{title}</Title>}
      <Description>{description}</Description>
      {data}
    </CardWrapper>
  );
};
