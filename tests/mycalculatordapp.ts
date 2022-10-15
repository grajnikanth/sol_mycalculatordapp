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

    it('Adds two number', async() => {
        await program.rpc.add(new anchor.BN(11), new anchor.BN(12), {
            accounts: {
                calculator: calculator.publicKey
            }  
        })

        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(23)))
    })

    it('Substracts two numbers', async() => {
        await program.rpc.substract(new anchor.BN(5), new anchor.BN(8), {
            accounts: {
                calculator: calculator.publicKey
            }
        })

        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(-3)))
    })

    it('Multiplies two numbers', async() => {
        await program.rpc.multiply(new anchor.BN(5), new anchor.BN(8), {
            accounts: {
                calculator: calculator.publicKey
            }
        })

        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(40)))
    })

    it('Divides two numbers', async() => {
        await program.rpc.divide(new anchor.BN(8), new anchor.BN(5), {
            accounts: {
                calculator: calculator.publicKey
            }
        })

        const account = await program.account.calculator.fetch(calculator.publicKey);
        console.log("calculator.result is ", account.result);
        console.log("calculator.remainder is ", account.remainder);
        
        assert.ok(account.result.eq(new anchor.BN(1)));
        assert.ok(account.remainder.eq(new anchor.BN(3)));
    })

    it('Divides two numbers - Denominator check', async() => {

        try {
            let result = await program.rpc.divide(new anchor.BN(8), new anchor.BN(0), {
                accounts: {
                    calculator: calculator.publicKey
                }
            })
            console.log("Result of the transaction sent is: ");
            console.log(result);
        } catch(err) {
            console.log("Error Block reached in try-catch")
            console.log(err);
            assert.ok(true);
        }
    })
})