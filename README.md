# Bullionix_phase1
## Bullionix framework - laying the foundations - Milestone 1

| Deliverables    | Description |
|:----------:|-------------|
| **`Planning the foundation`** | Establish an opensource github and start laying the foundation of the smart contract architecture - including user cases and examples - security applications and potential issues  |
| `Drawing the blueprints` | Develop the prototype smart contract and explore best architectures |
| `Refining the idea for testnet` | Optimization for the most economical route for gas savings while maintaining security focused interactions between users |


### Bullionix Phase 1 Deliverables 
#### 1. Userflow chart and architecture design 
<img src="https://raw.githubusercontent.com/Bullionix/Bullionix_phase1/master/userflow.png"
     alt="Userflow"
     />
<object width="400" height="500" type="application/pdf" data="https://docs.google.com/viewer?url=http://raw.githubusercontent.com/Bullionix/Bullionix_phase1/master/UserFlowChart.pdf">
</object>

PDF of Userflow: [Userflow Raw](http://raw.githubusercontent.com/Bullionix/Bullionix_phase1/master/UserFlowChart.pdf)

#### 2. Security concerns and outlining/brainstorming

# Bullionix Smart Contract

# Security Concerns

There are always security concerns that need to be accounted for when dealing with smart
contracts; especially if those contracts hold funds for users and allow anyone to interact with
them. This document contains an outline of the potential foreseen security concerns that could
happen and how to deal with them.

**Premise** ​:

Any user who has DGX can claim ownership of a Bullionix NFT by sending their DGX to our
contract to back the NFT with DGX. This NFT would have ownership of DGX so if its sold or
traded, the new owner can claim the previously staked DGX for themselves at any point.

**Potential Risk Areas and Corresponding Solutions:**

Owner Functions and ‘god power’ abuse**
Limit functionality for admin, only to do what is needed, without access to change user/address
amounts or balances. No code written that can be exploited by malicious actors.

**Withdrawing/burning the NFT to reclaim the DGX associated with it**
Just need to confirm that there are no overflow issues with the balances and proper standards
are upheld. Security audit will prevent this from being an issue.

**Loss of funds due to miscalculations**
Safe math and open source code review.

**Injection of bad data**
Limit the data coming into the contract from the user, and confirm anything and everything via
requires and reverts. Minimum viable input.

**Compromised accounts**
Hardware wallet accounts as admin and owner.

See document: [Security Concerns](https://raw.github.com/Bullionix/Bullionix_phase1/master/Phase_1/Bullionix_Smart_Contracts_Security_v1.1.pdf)

#### 3. Smart contract architecture UML
