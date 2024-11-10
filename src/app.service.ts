import { Injectable } from '@nestjs/common';
import { Tema1 } from './tema1';
import { EsdtTokenData } from './tema1CustomTypes';
import { promises } from "fs";
import { TransactionComputer, ApiNetworkProvider, TransactionWatcher, IContractResultItem, TokenTransfer, Token, Transaction } from "@multiversx/sdk-core";
import { UserSigner } from "@multiversx/sdk-wallet";

@Injectable()
export class AppService {
  private readonly contractService: Tema1 = new Tema1();
  private readonly apiNetworkProvider: ApiNetworkProvider = new ApiNetworkProvider("https://devnet-api.multiversx.com", { clientName: "trading-cards" });
  constructor() {}
  async getYourNftCardProperties() {
    const tx = this.contractService.getYourNftCardProperties();
    const {txHash, transactionOnNetworkUsingApi} = await this.sendTx(tx);
    const data = transactionOnNetworkUsingApi.contractResults.items[0].data;
    const properties = data.split('@').pop();
 
    return {txHash, properties} ;
  }

  async getNftNonce(properties: string) {
    const nfts =  await this.contractService.nftSupply();  
    let idx = 1;
    for(const nft of nfts[0]) {
   
      const nftProperties = Buffer.from(nft.attributes).toString('hex');
      if(properties === nftProperties) {
        return idx;
      }
      idx++;
    }
  }

  async exchangeNft(nonce: bigint, identifier: string) {
    const myNftNonce = parseInt(identifier.split('-')[2])
    const tx = this.contractService.exchangeNft({ nonce, tokenTransfers: [new TokenTransfer( {token: {identifier, nonce: BigInt(myNftNonce)}, amount: 1n})]})
    const {txHash, transactionOnNetworkUsingApi} = await this.sendTx(tx);

    return {txHash, transactionOnNetworkUsingApi} ; 
  }

  private async sendTx(tx: Transaction) {
    const fileContent = await promises.readFile('../../bpda_wallet.pem', { encoding: "utf8" });
    const signer = UserSigner.fromPem(fileContent);
    const accountOnNetwork = await this.apiNetworkProvider.getAccount(signer.getAddress());
    tx.sender = accountOnNetwork.address.bech32();
    tx.receiver = tx.sender;
    tx.nonce = BigInt(accountOnNetwork.nonce);

    const computer = new TransactionComputer();
    const seralizedTx = computer.computeBytesForSigning(tx);
    tx.signature = await signer.sign(seralizedTx);
    
    const txHash = await this.apiNetworkProvider.sendTransaction(tx);
    const watcherUsingApi = new TransactionWatcher(this.apiNetworkProvider);
    const transactionOnNetworkUsingApi = await watcherUsingApi.awaitCompleted(txHash);
    return {txHash, transactionOnNetworkUsingApi};
  }
}
