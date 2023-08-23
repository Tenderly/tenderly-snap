import { useContext } from 'react';
import styled from 'styled-components';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import {
  updateTenderlyAccessKey,
  sendTransaction,
  sendTenderlyTransaction,
  sendFailedTransaction,
} from '../utils';
import {
  InstallFlaskButton,
  UpdateTenderlyAccessKeyButton,
  SendSuccessfulTxButton,
  SendTxButton,
  SendFailedTxButton,
  GoToDocsButton,
  Card,
} from '../components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 7rem;
  margin-bottom: 7rem;
  padding: 1.5rem;
  gap: 2rem;

  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const BoldText = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 1rem;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary.default};
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: 500;
  text-align: center;
  margin-top: 0;
  margin-bottom: 2rem;

  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const CardContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  ${({ theme }) => theme.mediaQueries.small} {
    grid-template-columns: repeat(auto-fill, 100%);
  }
`;

const ExampleContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error.muted};
  border: 1px solid ${({ theme }) => theme.colors.error.default};
  color: ${({ theme }) => theme.colors.error.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2rem;
  margin-bottom: 2rem;
  max-width: 60rem;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

const PreContainer = styled.pre`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background.alternative};
  border-radius: 4px;
  word-break: break-all;
  white-space: pre-wrap;
`;

const successfulTxPayload = {
  to: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  value: '0x0',
  data: '0xa9059cbb000000000000000000000000fc43f5f9dd45258b3aff31bdbe6561d97e8b71de00000000000000000000000000000000000000000000000000000000004c4b40',
};

const Index = () => {
  const [state, dispatch] = useContext(MetaMaskContext);

  const handleSendTxClick = async () => {
    try {
      const txData = await sendTenderlyTransaction();
      await sendTransaction(JSON.parse(txData));
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleSendSuccessfulTxClick = async (txData: any) => {
    try {
      await sendTransaction(txData);
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleSendFailedTxClick = async () => {
    try {
      await sendFailedTransaction();
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleUpdateTenderlyAccessKeyClick = async () => {
    try {
      await updateTenderlyAccessKey();
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  return (
    <Container>
      <Heading>
        Welcome to <Span>Tenderly Snap</Span>
      </Heading>
      <Subtitle>
        Asset changes present opportunities for wallets, DeFi projects, and DEXs
        to make transactions more human-readable for their users.
      </Subtitle>
      {state.error && (
        <ErrorMessage>
          <b>An error happened:</b> {state.error.message}
        </ErrorMessage>
      )}
      <CardContainer>
        {!state.isFlask && (
          <Card
            content={{
              title: 'Install',
              description:
                'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
              data: <InstallFlaskButton />,
            }}
            fullWidth
          />
        )}
      </CardContainer>
      <ExampleContainer>
        <Title>Step 1</Title>
        <Card
          content={{
            title: 'Add Tenderly Credentials',
            description:
              'Add Tenderly Account ID, Project ID and Access Token. Required to interact with Tenderly API.',
            data: (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <UpdateTenderlyAccessKeyButton
                  onClick={handleUpdateTenderlyAccessKeyClick}
                  disabled={!state.installedSnap}
                />
                <GoToDocsButton />
              </div>
            ),
          }}
          disabled={!state.installedSnap}
          fullWidth
        />
      </ExampleContainer>
      <ExampleContainer>
        <Title>Step 2</Title>
        <CardContainer>
          <Card
            content={{
              title: 'Send Successful Transaction',
              description:
                'Send a successful transaction with a predefined payload. It will be simulated using Tenderly Simulation API. Do not confirm it!',
              data: (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <BoldText>
                      ERC20 Transfer - send 1 USDC to demo.eth
                    </BoldText>
                    <SendSuccessfulTxButton
                      onClick={() =>
                        handleSendSuccessfulTxClick({
                          // ERC20 Transfer - sending 1 USDC to demo.eth
                          to: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                          value: '0x0',
                          data: '0xa9059cbb000000000000000000000000fc43f5f9dd45258b3aff31bdbe6561d97e8b71de00000000000000000000000000000000000000000000000000000000000f4240',
                        })
                      }
                      disabled={!state.installedSnap}
                    />
                  </div>
                  <div>
                    <BoldText>
                      NFT Transfer - send 1 NFT to other address
                    </BoldText>
                    <SendSuccessfulTxButton
                      onClick={() =>
                        handleSendSuccessfulTxClick({
                          // NFT Transfer - sending 1 NFT to other address
                          to: '0x469823c7b84264d1bafbcd6010e9cdf1cac305a3',
                          data: '0x23b872dd0000000000000000000000003ec7ef9b96a36faa0c0949a2ba804f60d12593dd000000000000000000000000b62369195f0c705bb1b9cf1e444df2502cbca1d50000000000000000000000000000000000000000000000000000000000000cd1',
                        })
                      }
                      disabled={!state.installedSnap}
                    />
                  </div>
                </div>
              ),
            }}
            disabled={!state.installedSnap}
            fullWidth
          />
          <Card
            content={{
              title: 'Send Failed Transaction',
              description:
                'Send a failed transaction with a predefined payload. It will be simulated using Tenderly Simulation API. Do not confirm it!',
              data: (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <BoldText>
                      ERC20 Transfer - send 1,000,000 USDC to demo.eth
                    </BoldText>
                    <SendFailedTxButton
                      onClick={handleSendFailedTxClick}
                      disabled={!state.installedSnap}
                    />
                  </div>
                </div>
              ),
            }}
            disabled={!state.installedSnap}
            fullWidth
          />
        </CardContainer>
      </ExampleContainer>
      <ExampleContainer>
        <Title>Step 3</Title>
        <Card
          content={{
            title: 'Send Any Transaction',
            description:
              'Send a transaction with a custom payload. It will be simulated using Tenderly Simulation API. Do not confirm it!',
            data: (
              <div>
                <div>
                  This example transaction payload will send{' '}
                  <strong>5 USDC</strong> to demo.eth. Copy it and click on the{' '}
                  <strong>Send Transaction</strong> button.
                </div>
                <PreContainer>
                  {JSON.stringify(successfulTxPayload, null, 2)}
                </PreContainer>
                <SendTxButton
                  onClick={handleSendTxClick}
                  disabled={!state.installedSnap}
                />
              </div>
            ),
          }}
          disabled={!state.installedSnap}
          fullWidth
        />
      </ExampleContainer>
    </Container>
  );
};

export default Index;
