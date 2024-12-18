import sodium from 'libsodium-wrappers'

  export const processAuthMessage = async (nodePubKeyHex, privateKey) => {
    await sodium.ready;

    const nodePubKey = sodium.from_hex(nodePubKeyHex);

    const diffieHellmanSecret = sodium.crypto_scalarmult(privateKey, nodePubKey);

    return diffieHellmanSecret;
  }
