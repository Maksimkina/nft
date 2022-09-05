import { char2Bytes, } from '@taquito/utils';
import { TezosToolkit,MichelsonMap } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';



async function example() {
    const provider = 'https://jakartanet.ecadinfra.com';
    //const signer: any = new InMemorySigner('edskRdkUMmmBorjeetbGiU4cjZ1pbewF6ZmBMj7jCEWxA6pmgTooYTCStHZFitsEgnut7V3YpKt8ptgT1hgK5DuLS4baqXHQXj');
    const signer: any = new InMemorySigner('edskRqb1qvkC1bgmn48LsjHhwjntfNAmgAuXvBMXwbTar4Yp9ss1Ffd8mJevGoZbV4VsTjgc8aDdX8EaKmuBKJbFn58HBNLtVP')
        const tezos = new TezosToolkit(provider);
    tezos.setSignerProvider( signer );
    try {
        // const metadata = new MichelsonMap({
        //     prim: 'map',
        //     args:[{prim:"string"},{prim:"bytes"}]
        // });

        const metadata = MichelsonMap.fromLiteral({
            "":"0x"+char2Bytes("https://gist.githubusercontent.com/Maksimkina/bb1405298ec42b22ec28c9e52204d477/raw/aec0c08fc68789d1ec1048791d5915ae457b4bd9/gistfile1.txt")
        });

        const batch = await tezos.contract.batch()
      // .withTransfer({ to: 'KT1QsSi4rN5EPrE9SsMjUg3XwLFL3rgRTJ9H', amount: 2 })

        const contract = await tezos.contract.at('KT1NByd9HTk6TWWfu1MruPceUiEM5rjPepXR')
      
      batch
      // .withContractCall(contract.methods.openLock('KT1JMWkKAtB8eNMTYSAmkRuS3xjKHdkgTVGW', char2Bytes('')))
      
      .withContractCall(contract.methods.mint("tz1V2TxmFHjnkMMjjMGKPSye698SkpSeDpvd", 1, metadata, 0));
    
      
      
   
        batch.send()

        const batchOp = await batch.send()
        console.log(`Awaiting confirmed...`)
        return batchOp.confirmation(1).then(() => batchOp.hash) //ждем одно подтверждение сети
        .then((hash) => console.log(`Hash: ${hash}`)) //получаем хеш операции


  }


     catch (ex) {
        console.log(ex)
    }
}

example();
