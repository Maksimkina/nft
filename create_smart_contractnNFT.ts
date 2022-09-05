// для того чтобы пользоватся кодом пишем в командной строке
// 1) npm install -g yarn
// 2) yarn
// 3) npx ts-node deploy_multisig.ts


import { TezosToolkit,MichelsonMap } from '@taquito/taquito'
import { importKey,InMemorySigner } from '@taquito/signer'
import * as fs from 'fs';
import {char2Bytes} from '@taquito/utils';
import { readFileSync } from "fs";

// чтение кода из файла 
const nft_contract: string = fs.readFileSync('./nft_contract.tz').toString(); 
   
const provider = 'https://jakartanet.ecadinfra.com'                                      // провайдер сети 
// приватный ключь кошелька человека который деплоит контракт 
const signer = new InMemorySigner('edskRqb1qvkC1bgmn48LsjHhwjntfNAmgAuXvBMXwbTar4Yp9ss1Ffd8mJevGoZbV4VsTjgc8aDdX8EaKmuBKJbFn58HBNLtVP');
async function deploy() {
  const tezos = new TezosToolkit(provider)
  tezos.setSignerProvider(signer)
  // пустые значения для big_maps
  const ledger = new MichelsonMap(); 
  const metadata = new MichelsonMap();
  const operators = new MichelsonMap();
  const token_metadata = new MichelsonMap();
  const token_info = new MichelsonMap();
    try {
      
      const op = await tezos.contract.originate({
        //код смарт-контракта
        code: nft_contract,
        //значение хранилища
        
        storage: {
                administrator:"tz1V2TxmFHjnkMMjjMGKPSye698SkpSeDpvd", 
                all_tokens:10,
                ledger,
                metadata,
                operators,
                paused:false,
                token_metadata,

              },
      })


    //начало развертывания
    console.log('Awaiting confirmation...');
    const contract = await op.contract();
    //отчет о развертывании: количество использованного газа, значение хранилища
    console.log('Address contract', op.contractAddress);

    //хеш операции, по которому можно найти контракт в блокчейн-обозревателе
    console.log('Operation hash:', op.hash);
  } catch (ex) {
    console.error(ex)
  }
}
deploy();
