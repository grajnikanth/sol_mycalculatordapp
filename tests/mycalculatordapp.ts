const assert = require('assert')
const anchor = require('@project-serum/anchor')
const {SystemProgram} = anchor.web3

describe('mycalculatordapp', () => {

    const provider = anchor.AnchorProvider.local();
    console.log("Provider properties based on local method");
    console.log("provider.connection is ", provider.connection);
    console.log("provider.publicKey is ", provider.publicKey.toString());
    console.log("provider.wallet is ", provider.wallet);
    console.log("provider.wallet.publicKey is ", provider.wallet.publicKey.toString());

    anchor.setProvider(provider)
    const calculator = anchor.web3.Keypair.generate()
    const program = anchor.workspace.Mycalculatordapp
    console.log("program variable - ", program);
    

    it('creates a calculator', async() => {
        await program.rpc.create("welcome to calculator", {
            accounts: {
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
            },
            signers: [calculator]
        })

        const account = await program.account.calculator.fetch(calculator.publicKey);
        console.log("calculator account data obtained from Blockchain");
        console.log("fetch function of anchor returns deserialized account");
        console.log("account.greeting is ", account.greeting);
        console.log("account.result is ", account.result);
        console.log("account.remainder is ", account.remainder);
        assert.ok(account.greeting == "welcome to calculator")
    })
})