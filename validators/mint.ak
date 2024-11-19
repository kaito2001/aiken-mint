use aiken/transaction.{
    ScriptContext
}

type TokenRedeemer {
    msg: ByteArray
}

validator(code_word: ByteArray) {
    fn mint(redeemer: TokenRedeemer, _ctx: ScriptContext) -> Bool {
        redeemer.msg == code_word
    }
}

