pragma solidity >=0.4.22 <0.6.0;

import './ERC721Full.sol';
import './Ownable.sol';
import './IERC721Enumerable.sol';
import './IERC721Metadata.sol';
import './ERC721MetadataMintable.sol';
import './SafeMath.sol';
import './IERC20.sol';




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
mapping(uint256 => seriesData) public seriesToTokenId;
struct seriesData {
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
event NewSeriesMade(string indexed url, uint256 indexed numberToMint);
event Staked(address indexed _sender, uint256 indexed _amount, uint256 indexed tokenStaked);
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
 function createNewSeries(string memory _url, uint256 numberToMint, uint256 DGXcost, uint256 _fee) public onlyOwner returns (bool _success){
      //takes input from admin to create a new nft series. Will have to define how many tokens to make, how much DGX they cost, and the url from s3.
      require(msg.sender == owner(), 'Only Owner'); //optional as onlyOwner Modifier is used 
      uint256 total = totalSupply();
      for(uint i = 0; i < numberToMint; i++){
          seriesToTokenId[total.add(i)].url = _url;
          seriesToTokenId[total.add(i)].numberInSeries = numberToMint;
          seriesToTokenId[total.add(i)].DGXcost = DGXcost;
          seriesToTokenId[total.add(i)].fee = _fee;
      }
   emit NewSeriesMade(_url, numberToMint);
   return true;
 }

 /* 
* @dev Stake to series and mint tokens 
*
**/
 function stake(uint256 _tokenToBuy) public payable  returns (bool){
      //takes input from admin to create a new nft series. Will have to define how many tokens to make, how much DGX they cost, and the url from s3.
      require(seriesToTokenId[_tokenToBuy].fee >= 0, "Doesn't Exist yet!");
      uint256  tempValue = seriesToTokenId[_tokenToBuy].DGXcost.add(seriesToTokenId[_tokenToBuy].fee);
      _transferFrom(msg.sender, tempValue);
     
   emit Staked(msg.sender, tempValue, _tokenToBuy);
   return true;
 }



/*
  * @dev Gets the total amount of tokens owned by the sender
  * @return uint[] with the id of each token owned
  */
function viewYourTokens() public view  returns (uint256[] memory _yourTokens){
       return super._tokensOfOwner(msg.sender);
}
/*
  * @dev returns the entire tokenURI 
  * @return uint256 with the id of the token
  */
function returnURL(uint256 _tokenId) public view returns (string memory _URL){
   require(_exists(_tokenId), "ERC721: approved query for nonexistent token");
   string memory uri = this.tokenURI(_tokenId);
   return string(abi.encodePacked("https://bullionix.io/metadata", uri));
}

// Internals 
/*
  * TransferForm called after user has approved DGX to be spent by this contract.
  * If transferform fails, return false 
  * @dev returns the entire tokenURI 
  * @return uint256 with the id of the token
  */
 function _transferFrom (address _owner, uint256 _amount)
    internal
  {
    require(IERC20(DGXContract1).transferFrom(_owner, address(this), _amount));
  }

  function _isAdmin(address _admin)
    internal view returns (bool)
  {
      
    // TODO: Implement better admin priviledge
    return (owner() == _admin);
  }
  //TODO
 /* function burn(){
      
  }*/
}