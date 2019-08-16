
pragma solidity >=0.4.22 <0.6.0;
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721full.sol';
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract BullionixGenerator is ERC721Full, Ownable {
    
string public name = "Bullionix";
string public title = "";  //To be filled in
string public symbol = ""; //To be filled in
address public DGXContract1 = ""; //To be filled in
uint256 public DGXFees = ""; //To be filled in
bool public IsOnline = false;

 mapping(uint256 => uint256) public StakedValue;

/*
* Constructor() and storge init
* @dev Constructor, Sets state 
*/

    constructor (string memory name, string memory symbol) public ERC721Metadata(name, symbol){
        admin = msg.sender; //or owner
        if (address(X) != 0x0 && address(Y) != 0x0) {
            //set addresses 
            isOnline = true;
        }
    }

     
/*
*-----Events-------*
* New Series Made
* Staked to token
* Burned and withdrew
* ----Errors--------*
* Not proper amount
* Not Approved
* Already Staked
/*

}
