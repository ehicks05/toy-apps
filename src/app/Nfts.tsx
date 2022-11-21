// import React, { useEffect, useState } from 'react';
// import { useConnection } from '@solana/wallet-adapter-react';
// import {
//   JsonMetadata,
//   Metadata,
//   Metaplex,
//   Nft,
//   Sft,
// } from '@metaplex-foundation/js';
// import { PublicKey } from '@solana/web3.js';

// interface Props {
//   publicKey: PublicKey;
// }

// const Nfts = ({ publicKey }: Props) => {
//   const { connection } = useConnection();

//   const metaplex = new Metaplex(connection);

//   const [nfts, setNfts] = useState<
//     (Metadata<JsonMetadata<string>> | Nft | Sft)[] | undefined
//   >();

//   useEffect(() => {
//     const doIt = async () => {
//       const nfts = await metaplex.nfts().findAllByOwner({ owner: publicKey! });
//       setNfts(nfts);
//     };

//     if (publicKey) doIt();
//   }, []);

//   return (
//     <div>
//       <pre>{JSON.stringify(nfts, null, 2)}</pre>
//     </div>
//   );
// };

// export default Nfts;
