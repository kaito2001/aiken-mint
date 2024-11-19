import { applyDoubleCborEncoding, applyParamsToScript, Blockfrost, Data, fromText, Lucid } from "lucid-cardano";
import { getValidators } from "./validator.mjs";

const lucid = await Lucid.new(
  new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodaDCuJ1u8d8yNWBBjWcc5NCGJLr9mNZeJ"),
  "Preprod",
);

lucid.selectWalletFromSeed("woman dwarf clever illness ability liberty what useful lamp vacuum apart ankle parrot frequent coil crew siren clap vehicle present citizen top happy glare");

const TokenType = Data.Object({
  msg: Data.Bytes()
});

const TokenRedeemer = TokenType;

let {
  mintMintingPolicy
} = getValidators();

console.log("mint", mintMintingPolicy);

const mintingPolicyToken = {
  type: "PlutusV2",
  script: applyDoubleCborEncoding(
    applyParamsToScript(
        mintMintingPolicy.script, [fromText("new secret")]
    )
  )
}

// const unit = policyId + fromText("MyMintedToken");

const policyId = lucid.utils.mintingPolicyToId(mintingPolicyToken);


const tx = await lucid.newTx()
  .attachMintingPolicy(mintingPolicyToken)
  .mintAssets(
    {[policyId]: 10000n},
    Data.to(
      { msg: fromText("new secret") }, TokenType
    )
  )
  .complete();

const signedTx = await tx.sign().complete();

const txHash = await signedTx.submit();

console.log(txHash);
