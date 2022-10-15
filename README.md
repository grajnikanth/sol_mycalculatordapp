<!-- ABOUT THE PROJECT -->
## mycalculatordapp

In this project, I implemented a simple calculator Program(smart contract) on the Solana Blockchain. The calculator will initialize an account to
store basic arithmetic operations performed. The calculator has functions create, add, substract, multiply and divide. The client
can call these functions with inputs and the calculator will compute a result and store it in an account initialized by
the client in the create step.

The project was developed using Anchor framework. All the tests were implemented. A new account is first created on the
Solana Blockchain and the account data will store the result. When the client calls any of the functions on the smart-contract,
the result from the operation is stored in the data of account on the Blockchain.

### Built With

* Anchor

### Installation and Execution

Install Anchor, Rust and Solana and then clone the repository. Then to compile the code run
   ```sh
   anchor build
   ```
   
To deploy the smart contract on a local solana blockchain and run all the tests use the command
   ```sh
   anchor test
   ```
Anchor will start a local Blokchain, deploy the smart code and execute the tests and shut down the local Blockchain.
