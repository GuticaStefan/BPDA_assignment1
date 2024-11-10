import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/nft/properties')
  async getYourNftCardProperties() {
    return await this.appService.getYourNftCardProperties();  
  }

  @Get('/nft/supply/:properties/nonce')
  async getNftNonce(
    @Param('properties') properties: string,
  ): Promise<number> {
    return await this.appService.getNftNonce(properties);
  }

  @Get('/nft/exchange/:nonce')
  async exchangeNft(
    @Param('nonce') nonce: bigint,
    @Query('identifier') identifier: string,
  ) {
    return await this.appService.exchangeNft(nonce, identifier);
  }


// mxpy contract call erd1vhfuv9qznn59vlasthdgsp7pzc99snzvchvcrjzhgn3cdequ7jxsvwtu50 --pem bpda_wallet.pem --proxy https://devnet-api.multiversx.com --chain D --recall-nonce --gas-limit 60000000 --function ESDTNFTCreate --arguments 0x534e46542d343033613334 0x01 0x73746566616e2e677574696361 0x1d4c 0x 0x050100 0x68747470733a2f2f697066732e696f2f697066732f516d5479366a546458613475686e3831736a6f58436554394c767a51437664396e343476475a62374c3252414e31 --send

}
