use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod mycalculatordapp {
    use super::*;

    pub fn create(ctx: Context<Create>, init_message: String) -> Result<()> {
        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(())
    }
}

// Context - list of accounts create function needs to read from to execute it's logic
// Solana accounts are separate from smart contract

/**
 *  Below Create struct contains the three accounts needed for the create 
 *  instruction/function to work. The three accounts are:
 *          calculator, user and system_program
 *  
 */
#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=user, space=264)]
    pub calculator: Account<'info, Calculator>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}

/**
 *  Calculator struct defines what data we will store in an instance of Calculator
 *  account. 
 */
#[account]
pub struct Calculator {
    pub greeting: String,       // ??? bytes
    pub result: i64,            // 8 bytes
    pub remainder: i64          // 8 bytes
}