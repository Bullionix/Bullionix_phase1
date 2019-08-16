
pragma solidity >=0.4.22 <0.6.0;
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721full.sol';
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract BullionixGenerator is Ownable, ERC721Full {
bool public IsOnline = false;
address public DGXContract1 = ""; //To be filled in
uint256 public DGXFees = ""; //To be filled in
string public name = "Bullionix";
string public title = "";  //To be filled in
string public symbol = ""; //To be filled in



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

     
/* @dev Events
*-----Events-------*
* New Series Made
* Staked to token
* Burned and withdrew
* ----Errors--------*
* Not proper amount
* Not Approved
* Already Staked
*/
event NewSeries(address indexed _sender, uint256 indexed _tokenId);
event Staked(address indexed _sender, uint256 indexed _amount, uint256 indexed _tokenId);
event Burned(address indexed _sender,  uint256 indexed _amount, uint256 indexed _tokenId);

}
