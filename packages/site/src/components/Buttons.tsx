import { ComponentProps } from 'react';
import styled from 'styled-components';
import { MetamaskState } from '../hooks';
import { ReactComponent as FlaskFox } from '../assets/flask_fox.svg';
import { ReactComponent as TenderlyLogo } from '../assets/logo.svg';
import { shouldDisplayReconnectButton } from '../utils';

const Link = styled.a`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.small};
  border-radius: ${(props) => props.theme.radii.button};
  border: 1px solid ${(props) => props.theme.colors.background.inverse};
  background-color: ${(props) => props.theme.colors.background.inverse};
  color: ${(props) => props.theme.colors.text.inverse};
  text-decoration: none;
  font-weight: bold;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  svg {
    height: 20px;
  }

  &:hover {
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.colors.background.inverse};
    color: ${(props) => props.theme.colors.text.default};
  }

  ${({ theme }) => theme.mediaQueries.small} {
    width: 100%;
    box-sizing: border-box;
  }
`;

const Button = styled.button`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  margin-top: auto;

  ${({ theme }) => theme.mediaQueries.small} {
    width: 100%;
  }
`;

const FailedButton = styled.button`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  background-color: #d73a49;
  color: #ffffff;

  &:hover {
    color: #ffffff;
    background-color: #b92534;
  }

  ${({ theme }) => theme.mediaQueries.small} {
    width: 100%;
  }
`;

const SuccessButton = styled.button`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  background-color: #4caf50;
  color: #ffffff;

  &:hover {
    color: #ffffff;
    background-color: #62b966;
  }

  ${({ theme }) => theme.mediaQueries.small} {
    width: 100%;
  }
`;

const ButtonText = styled.span`
  margin-left: 1rem;
`;

const ConnectedContainer = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.small};
  border-radius: ${(props) => props.theme.radii.button};
  border: 1px solid ${(props) => props.theme.colors.background.inverse};
  background-color: ${(props) => props.theme.colors.background.inverse};
  color: ${(props) => props.theme.colors.text.inverse};
  font-weight: bold;
  padding: 1.2rem;
`;

const ConnectedIndicator = styled.div`
  content: ' ';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green;
`;

export const InstallFlaskButton = () => (
  <Link href="https://metamask.io/flask/" target="_blank">
    <FlaskFox />
    <ButtonText>Install MetaMask Flask</ButtonText>
  </Link>
);

export const ConnectButton = (props: ComponentProps<typeof Button>) => {
  return (
    <Button {...props}>
      <FlaskFox />
      <ButtonText>Connect</ButtonText>
    </Button>
  );
};

export const ReconnectButton = (props: ComponentProps<typeof Button>) => {
  return (
    <Button {...props}>
      <FlaskFox />
      <ButtonText>Reconnect</ButtonText>
    </Button>
  );
};

export const SendTxButton = (props: ComponentProps<typeof Button>) => {
  return <Button {...props}>Send Transaction</Button>;
};

export const SendSuccessfulTxButton = (
  props: ComponentProps<typeof Button>,
) => {
  return <SuccessButton {...props}>Send Transaction</SuccessButton>;
};

export const SendFailedTxButton = (props: ComponentProps<typeof Button>) => {
  return <FailedButton {...props}>Send Transaction</FailedButton>;
};

export const UpdateTenderlyAccessKeyButton = (
  props: ComponentProps<typeof Button>,
) => {
  return <Button {...props}>Add Access Token</Button>;
};

export const GoToDocsButton = () => {
  return (
    <Link
      href="https://docs.tenderly.co/other/platform-access/how-to-generate-api-access-tokens"
      target="_blank"
    >
      <TenderlyLogo />
      <ButtonText>Go to Tenderly Docs</ButtonText>
    </Link>
  );
};

export const HeaderButtons = ({
  state,
  onConnectClick,
}: {
  state: MetamaskState;
  onConnectClick(): unknown;
}) => {
  if (!state.isFlask && !state.installedSnap) {
    return <InstallFlaskButton />;
  }

  if (!state.installedSnap) {
    return <ConnectButton onClick={onConnectClick} />;
  }

  if (shouldDisplayReconnectButton(state.installedSnap)) {
    return <ReconnectButton onClick={onConnectClick} />;
  }

  return (
    <ConnectedContainer>
      <ConnectedIndicator />
      <ButtonText>Connected</ButtonText>
    </ConnectedContainer>
  );
};
