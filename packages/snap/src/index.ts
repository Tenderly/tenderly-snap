import {
  OnRpcRequestHandler,
  OnTransactionHandler,
} from '@metamask/snaps-types';
import { NodeType } from '@metamask/snaps-ui';
import { hasProperty, isObject } from '@metamask/utils';
import {
  handleSendTenderlyTransaction,
  handleUpdateTenderlyCredentials,
  handleSetTenderlyCredentials,
  simulate,
  isTenderlyDomain,
} from './tenderly';
import { CustomRequestMethod } from './constants';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case CustomRequestMethod.UPDATE_TENDERLY_CREDENTIALS:
      return handleUpdateTenderlyCredentials(origin);
    case CustomRequestMethod.SET_TENDERLY_CREDENTIALS: {
      if (!isTenderlyDomain(origin)) {
        throw new Error(
          'The origin of the request must be sent from the Tenderly domain.',
        );
      }

      return handleSetTenderlyCredentials(request);
    }
    case CustomRequestMethod.SEND_TENDERLY_TRANSACTION:
      return handleSendTenderlyTransaction(origin);
    default:
      throw new Error(`Method ${request.method} not supported.`);
  }
};

/**
 * Handles transactions by providing insights before a transaction is signed.
 * This function is a required export for a snap that wishes to interact with MetaMask transactions.
 * Whenever there's a contract interaction and a transaction is submitted through MetaMask, this method is invoked.
 * The raw unsigned transaction payload is passed as an argument to this handler method.
 *
 * @param args - The request handler args as object.
 * @param args.transaction - The transaction to handle.
 * @param args.transactionOrigin - The transaction origin.
 * @param args.chainId - The chain ID of the transaction.
 */
export const onTransaction: OnTransactionHandler = async ({
  transaction,
  transactionOrigin,
  chainId,
}) => {
  if (!isObject(transaction) || !hasProperty(transaction, 'to')) {
    return {
      content: {
        value: 'Unknown transaction type',
        type: NodeType.Text,
      },
    };
  }

  const simulationResponse = await simulate(
    chainId,
    transaction,
    transactionOrigin || '',
  );

  return {
    content: {
      children: simulationResponse.children,
      type: NodeType.Panel,
    },
  };
};
