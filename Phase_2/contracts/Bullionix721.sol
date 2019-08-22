
pragma solidity >=0.4.22 <0.6.0;
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721full.sol';
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import "./ERC721Enumerable.sol";
import "./ERC721Metadata.sol";
import "./ERC721MetadataMintable.sol";
import "./MinterRole.sol";



contract BullionixGenerator is ERC721Enumerable, ERC721Metadata, Ownable, MinterRole{

/*
* @dev Beginning state and init values
**/
bool public isOnline = false;
address public DGXContract1 = ""; //To be filled in
uint256 public DGXFees = ""; //To be filled in
string public name = "Bullionix";
string public title = "";  //To be filled in
string public symbol = ""; //To be filled in
string public version = "Bullionix v0.1";


mapping(uint256 => uint256) public StakedValue;

/*
* @dev Constructor() and storge init
* @dev Constructor, Sets state
**/
constructor() public ERC721Metadata(name, symbol){
        if (address(X) != 0x0 && address(Y) != 0x0) {
/*set addresses*/
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
**/
event NewSeries(address indexed _sender, uint256 indexed _tokenId);
event Staked(address indexed _sender, uint256 indexed _amount, uint256 indexed _tokenId);
event Burned(address indexed _sender,  uint256 indexed _amount, uint256 indexed _tokenId);


/* 
* @dev changes online status to disable contract, must be current owner
*
**/
 function toggleOnline() public onlyOwner {
         isOnline = !isOnline;
 }
/*
  * @dev Gets the total amount of tokens owned by the sender
  * @return uint[] with the id of each token owned
  */
function viewYourTokens() public view  returns (uint256[] _yourTokens){
       return super._tokensOfOwner(msg.sender);
}
}