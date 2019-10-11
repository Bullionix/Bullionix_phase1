pragma solidity >=0.4.22 <0.6.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/IERC721Enumerable.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/IERC721Metadata.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721MetadataMintable.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import './DGXinterface.sol';


contract BullionixGenerator is ERC721Enumerable, ERC721MetadataMintable, Ownable{
    
modifier isActive{
    require(isOnline == true);
    _;
    }
using SafeMath for uint256;
/*
* @dev Beginning state and init values
**/
DGXinterface dgx; 
bool public isOnline = false;
address payable public  DGXContract; //0x692a70D2e424a56D2C6C27aA97D1a86395877b3A; //To be filled in
string constant  name = "Bullionix";
string constant  title = "";  //To be filled in
string constant  symbol = ""; //To be filled in
string constant  version = "Bullionix v0.2";
mapping(uint256 => uint256) public StakedValue;
mapping(uint256 => seriesData) public seriesToTokenId;
struct seriesData {
                string url;
                uint256 numberInSeries;
                uint256 DGXcost;
                uint256 fee;
                bool alive;
        }
        
     /*
* @dev Events
* @dev Events to read when things happen
**/
event NewSeriesMade(string indexed url, uint256 indexed numberToMint);
event Staked(address indexed _sender, uint256 indexed _amount, uint256 indexed tokenStaked);
event Burned(address indexed _sender,  uint256 indexed _amount, uint256 indexed _tokenId);
event Withdrawal(address indexed _receiver,  uint256 indexed _amount);
event PublishFees(uint256 _Beforefees, uint256 _fee);
/*
* @dev Constructor() and storge init
* @dev Sets state
* @param Address _DGXAddress is the address of the live DGX token contract
**/
constructor(address payable _DGXAddress) public ERC721Metadata(name, symbol){
        if (address(_DGXAddress) != address(0x0)) {
            isOnline = true;
            DGXContract = address(_DGXAddress);
            dgx = DGXinterface(DGXContract);
        }
}


/* 
* @dev changes online status to disable contract, must be current owner
*
**/
 function toggleOnline() external onlyOwner {
         isOnline = !isOnline;
 }
   /**
     * @dev Create a new series of NFTs.
     * @param _url location of metadata on backend server. Will be tacked onto the end of set url using returnURL().
     * @param _numberToMint  The token number for this series. 10 would make 10 tokens avaliable 
     * @param _DGXcost The amount of DGX to send
     * @param _fee Bullionix fee for generation
     * @return A boolean that indicates if the operation was successful.
     */
 function createNewSeries(string memory _url, uint256 _numberToMint, uint256 _DGXcost, uint256 _fee) public onlyOwner isActive returns (bool _success){
      //takes input from admin to create a new nft series. Will have to define how many tokens to make, how much DGX they cost, and the url from s3.
      require(msg.sender == owner(), 'Only Owner'); //optional as onlyOwner Modifier is used 
      uint256 total = totalSupply();
      for(uint i = 0; i < _numberToMint; i++){
          seriesToTokenId[total.add(i)].url = _url;
          seriesToTokenId[total.add(i)].numberInSeries = _numberToMint;
          seriesToTokenId[total.add(i)].DGXcost = _DGXcost;
          seriesToTokenId[total.add(i)].fee = _fee;
      }
    
   emit NewSeriesMade(_url, _numberToMint);
   return true;
 }

 /* 
* @dev Stake to series and mint tokens 
*
**/
 function stake(uint256 _tokenToBuy) public payable isActive returns (bool){
      //takes input from admin to create a new nft series. Will have to define how many tokens to make, how much DGX they cost, and the url from s3.
      require(seriesToTokenId[_tokenToBuy].fee >= 0 && StakedValue[_tokenToBuy] == 0, "Can't stake to this token!");
      uint256  amountRequired = ((seriesToTokenId[_tokenToBuy].DGXcost.add(seriesToTokenId[_tokenToBuy].fee))*10**9);
        uint256 transferFee = fetchTransferFee();
       
      //require transfer to contract succeeds
      require(_checkAllowance(msg.sender, amountRequired));
      require(_transferFromDGX(msg.sender, amountRequired));
      //get url 
     string memory fullURL = returnURL(_tokenToBuy);
     amountRequired = amountRequired.sub(transferFee);
     require(amountRequired > transferFee, "Math invalid");
     require(mintWithTokenURI(msg.sender, _tokenToBuy, fullURL));
     //staked value is set to DGXCost sent by user minus the total fees 
     StakedValue[_tokenToBuy] = amountRequired;
     emit Staked(msg.sender, StakedValue[_tokenToBuy], _tokenToBuy);
     seriesToTokenId[_tokenToBuy].alive = true;
     return true;
 }


  /**
     * @dev Burns a specific ERC721 token and refunds user the DGX on the NFT
     * @param _tokenId uint256 id of the ERC721 token to be burned.
     */
     
     //TODO: Finalize this function and transfer the DGX back to msg.sender for burning their nft 
function burn(uint256 _tokenId)public payable returns (bool){
        //solhint-disable-next-line max-line-length
        //check token is staked 
        require(StakedValue[_tokenId] > 0 && seriesToTokenId[_tokenId].alive, "NFT not burnable yet");
        //check that you are owner of token
         require(_isApprovedOrOwner(msg.sender, _tokenId), "ERC721Burnable: caller is not owner nor approved");
        //check balance of smart contract
          //get fees to calculate 
     uint256 transferFee = fetchTransferFee();
     uint256 demurrageFee = fetchDemurrageFee();
     //total fees
     uint256 feeValue = transferFee.add(demurrageFee);
     feeValue = StakedValue[_tokenId].sub(feeValue);
        require(_checkBalance() >= feeValue, "Balance check failed");
       require(feeValue < StakedValue[_tokenId], "Fee is more than StakedValue");
     seriesToTokenId[_tokenId].alive = false;
        //transfer 721 to 0x000
        _burn(_tokenId);
        //transfer dgx from contract to msg.sender
    require(dgx.transfer(msg.sender, feeValue));
         
       return true;
    }
    
      /**
     * @dev Withdrawals DGX from the balance collected via fees only Owner.
     */
function withdrawal() onlyOwner
    public
  returns (bool){
    require(isOnline == false);
    uint256 temp = _checkBalance(); //calls checkBalance which will revert if no balance, if balance pass it into transfer as amount to withdrawal MAX
    require(dgx.transfer(msg.sender, temp)); 
    emit Withdrawal(msg.sender, temp);
    return true;    
  }
function _checkBalance() internal view returns (uint256){
    uint256 tempBalance = dgx.balanceOf(address(this)); //checking balance on DGX contract
    require(tempBalance > 0, "Revert: Balance is 0!");  //do I even have a balance? Lets see. If no balance revert. 
    return tempBalance;  //here is your balance! Fresh off the stove. 
}
function _checkAllowance(address sender, uint256 amountNeeded) internal view returns (bool){
    uint256 tempBalance = dgx.allowance(sender, address(this)); //checking balance on DGX contract
    require(tempBalance >= amountNeeded, "Revert: Balance is 0!");  //do I even have a balance? Lets see. If no balance revert. 
    return true;  //here is your balance! Fresh off the stove. 
} 
/*
  * @dev Gets the total amount of tokens owned by the sender
  * @return uint[] with the id of each token owned
  */
function viewYourTokens() external view  returns (uint256[] memory _yourTokens){
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
   require(checkURL(_tokenId), "ERC721: approved query for nonexistent token"); //Does this token exist? Lets see. 
   string memory uri = seriesToTokenId[_tokenId].url;
   return string(abi.encodePacked("https://bullionix.io/metadata/", uri)); //Here is your URL! 
}

  /*
  * @dev Returns the URL - internal 
  * @return URL of token with full website attached
  */
  function checkURL(uint256 _tokenId) internal view returns (bool){
      string memory temp = seriesToTokenId[_tokenId].url;
      bytes memory tempEmptyStringTest = bytes(temp);
      require(tempEmptyStringTest.length >= 1, temp);
      return true;
  }
 function _transferFromDGX (address _owner,  uint256 _amount)internal returns (bool)
    
  {
    require(dgx.transferFrom(_owner, address(this), _amount));
    return true;
  }

function() external payable {

}

function fetchTransferFee() public returns (uint256 rate){
  
   (uint256 _base, uint256 _rate, address _collector, bool _no_transfer_fee, uint256 _minimum_transfer_amount) = dgx.showTransferConfigs();
   
   return _rate*10**5;
   
}

function fetchDemurrageFee() public returns (uint256 rate){
  
   (uint256 _base, uint256 _rate, address _collector, bool _no_demurrage_fee) = dgx.showDemurrageConfigs();
   
   return _rate*10**5;
   
}
}