use cardano/transaction.{Transaction}
use cardano/assets.{PolicyId}

pub type TokenRedeemer {
    msg: ByteArray
}

validator token(code_word: ByteArray)  {
  mint(redeemer: TokenRedeemer, _policy_id: PolicyId, tx: Transaction) -> Bool {
    redeemer.msg == code_word
  }
}