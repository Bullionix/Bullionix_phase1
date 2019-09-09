pragma solidity >=0.4.22 <0.6.0;

import './ERC721Full.sol';
import './Ownable.sol';
import './IERC721Enumerable.sol';
import './IERC721Metadata.sol';
import './ERC721MetadataMintable.sol';
import './SafeMath.sol';
import './IERC20.sol';




contract BullionixGenerator is ERC721Enumerable, ERC721MetadataMintable{
    
    modifier isActive{
    require(isOnline == true);
    _;
    }
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


event NewSeriesMade(string indexed url, uint256 indexed numberToMint);
event Staked(address indexed _sender, uint256 indexed _amount, uint256 indexed tokenStaked);
event Burned(address indexed _sender,  uint256 indexed _amount, uint256 indexed _tokenId);

/*
TODO:
      
        - Allow for admin to make new data series
        - Create asset to series

*/
/* 
* @dev changes online status to disable contract, must be current owner
*
**/
 function toggleOnline() public onlyOwner {
         isOnline = !isOnline;
 }
   /**
     * @dev Create a new series of NFTs.
     * @param _url location of metadata on backend server. Will be tacked onto the end of set url using returnURL().
     * @param numberToMint  The token number for this series. 10 would make 10 tokens avaliable 
     * @param DGXcost The amount of DGX to send
     * @param _fee Bullionix fee for generation
     * @return A boolean that indicates if the operation was successful.
     */
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
 function stake(uint256 _tokenToBuy) public payable isActive returns (bool){
      //takes input from admin to create a new nft series. Will have to define how many tokens to make, how much DGX they cost, and the url from s3.
      require(seriesToTokenId[_tokenToBuy].fee >= 0, "Doesn't Exist yet!");
      uint256  totalCost = seriesToTokenId[_tokenToBuy].DGXcost.add(seriesToTokenId[_tokenToBuy].fee);
      _transferFrom(msg.sender, totalCost);
      
     
//TODO: 
//Create/Mint token and send to buyer
   string memory fullURL = returnURL(_tokenToBuy);
   require(mintWithTokenURI(msg.sender, _tokenToBuy, fullURL));
   emit Staked(msg.sender, totalCost, _tokenToBuy);
   return true;
 }



/*
  * @dev Gets the total amount of tokens owned by the sender
  * @return uint[] with the id of each token owned
  */
function viewYourTokens() public view  returns (uint256[] memory _yourTokens){
       return super._tokensOfOwner(msg.sender);
}


// Internals 
/*
  * TransferForm called after user has approved DGX to be spent by this contract.
  * If transferform fails, return false 
  * @dev returns the entire tokenURI 
  * @return uint256 with the id of the token
  */
  
  /*
  * @dev returns the entire tokenURI 
  * @return uint256 with the id of the token
  */
function returnURL(uint256 _tokenId) internal view returns (string memory _URL){
   require(_exists(_tokenId), "ERC721: approved query for nonexistent token");
   string memory uri = seriesToTokenId[_tokenId].url;
   return string(abi.encodePacked("https://bullionix.io/metadata", uri));
}

  /*
  * @dev transfer ERC20 token to contract
  * @return true or false if failed
  */
 function _transferFrom (address _owner, uint256 _amount)internal returns (bool)
    
  {
    require(IERC20(DGXContract1).transferFrom(_owner, address(this), _amount));
    return true;
  }


  //TODO
 /* function burn(){
      
  }*/
}