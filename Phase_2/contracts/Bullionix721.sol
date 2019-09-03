pragma solidity >=0.4.22 <0.6.0;

import './ERC721Full.sol';
import './Ownable.sol';
import './IERC721Enumerable.sol';
import './IERC721Metadata.sol';
import './ERC721MetadataMintable.sol';
import './SafeMath.sol';




contract BullionixGenerator is ERC721Enumerable, ERC721Metadata, Ownable{
using SafeMath for uint256;
/*
* @dev Beginning state and init values
**/
bool public isOnline = false;
address public DGXContract1 = address(0x0); //To be filled in
uint256 public DGXFees = 0; //To be filled in
string public name = "Bullionix";
string public title = "";  //To be filled in
string public symbol = ""; //To be filled in
string public version = "Bullionix v0.1";
string public preURL = "https://bullionix.io/metadata"; //metadata url to save gas

mapping(uint256 => uint256) public StakedValue;
struct tokenData {
                string url;
                uint256 numberInSeries;
                uint256 DGXcost;
                uint256 fee;
        }
/*
* @dev Constructor() and storge init
* @dev Constructor, Sets state
**/
constructor() public ERC721Metadata(name, symbol){
        if (address(DGXContract1) != address(0x0)) {
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
TODO:
        - Need to add admin abilities to owner.sol
        - Make Admin storage here and make admin only modifiers or use owner
        - Allow for admin to make new data series
        - Figure out data structure for each new series
        - Create asset to series

        Data Structure: 
        struct {
                string url
                uint numberInSeries
                uint DGX cost
                uint fee
        }
        -
*/
/* 
* @dev changes online status to disable contract, must be current owner
*
**/
 function toggleOnline() public onlyOwner {
         isOnline = !isOnline;
 }


 /* 
* @dev Create a new series
*
**/
 function createNewSeries(string memory url, uint256 numberToMint, uint256 DGXcost) public onlyOwner {
      //takes input from admin to create a new nft series. Will have to define how many tokens to make, how much DGX they cost, and the url from s3.
      require(msg.sender == owner(), 'Only Owner'); //optional as onlyOwner Modifier is used 

 }

/*
  * @dev Gets the total amount of tokens owned by the sender
  * @return uint[] with the id of each token owned
  */
function viewYourTokens() public view  returns (uint256[] memory _yourTokens){
       return super._tokensOfOwner(msg.sender);
}

function returnUrl() internal view returns (uint256 _tokenId, string memory _URL){
   require(super._exists(_tokenId), "ERC721: approved query for nonexistent token");
  string url memory = _tokenURIs[_tokenId];
   return preURL +  url
}

// Internals 

 /* function _listingIdExists (bytes32 listingId)
    internal view returns (bool)
  {
    Listing memory listing = _listingByListingId(listingId);
    return (listing.owner != address(0));
  }*/
/*
  * @dev IsAdmin checks if address is the admin
  * @return Bool 
  */
  function _isAdmin(address _admin)
    internal view returns (bool)
  {
      
    // TODO: Implement better admin priviledge
    return (owner() == _admin);
  }
}