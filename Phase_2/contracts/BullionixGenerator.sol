pragma solidity >=0.4.22 <0.6.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/token/ERC721/IERC721Metadata.sol";
import "openzeppelin-solidity/contracts/token/ERC721/IERC721Enumerable.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721MetadataMintable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./DGXinterface.sol";

contract BullionixGenerator is
    ERC721Enumerable,
    ERC721MetadataMintable,
    ERC721Burnable,
    Ownable
{
    modifier isActive {
        require(isOnline == true);
        _;
    }
    using SafeMath for uint256;
    /*
* @dev Beginning state and init values
**/
    DGXinterface dgx;
    DGXinterface dgxStorage;
    DGXinterface dgxToken;
    bool public isOnline = false;
    /*
Kovan KDGX token contract - 0xAEd4fc9663420eC8a6c892065BBA49c935581Dce
Kovan Storage contract - 0x3c5E7435190ecd13C88F3600Ca317A1A5FdD2Ae6
Kovan TokenInformation - 0x2651586330d05411e6bcecF9c4ff48341E6d02D5


Mainnet (storage) = 0xc672ec9cf3be7ad06be4c5650812aec23bbfb7e1
Mainnet (token)    = 0x4f3afec4e5a3f2a6a1a411def7d7dfe50ee057bf
Mainnet (token information) = 0xbb246ee3fa95b88b3b55a796346313738c6e0150
Mainnet storage contract - 0xC672EC9CF3Be7Ad06Be4C5650812aEc23BBfB7E1
*/
    address payable public DGXTokenContract = 0xAEd4fc9663420eC8a6c892065BBA49c935581Dce;
    address payable public DGXContract = 0x2651586330d05411e6bcecF9c4ff48341E6d02D5; //To be filled in
    address payable public DGXTokenStorage = 0x3c5E7435190ecd13C88F3600Ca317A1A5FdD2Ae6; //To be filled in
    string constant name = "Bullionix";
    string constant title = "Bullionix"; //To be filled in
    string constant symbol = "BLX"; //To be filled in
    string constant version = "Bullionix v0.2";
    mapping(uint256 => uint256) public StakedValue;
    mapping(uint256 => seriesData) public seriesToTokenId;
    uint256 public totalSeries = 0;
    uint256 public totalFeesCollected = 0;
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
    event Staked(address indexed _sender, uint256 _amount, uint256 tokenStaked);
    event Burned(address indexed _sender, uint256 _amount, uint256 _tokenId);
    event Withdrawal(address indexed _receiver, uint256 indexed _amount);
    event TransferFee(uint256 indexed transferFee);
    event DemurrageFee(uint256 indexed demurrageFee);
    event CheckFees(
        uint256 indexed feeValue,
        uint256 indexed stakedValue,
        uint256 indexed _totalWithdrawal
    );

    /*
* @dev Constructor() and storge init
* @dev Sets state
**/
    constructor() public ERC721Metadata(name, symbol) {
        if (
            address(DGXContract) != address(0x0) &&
            address(DGXTokenStorage) != address(0x0)
        ) {
            isOnline = true;
            dgx = DGXinterface(DGXContract);
            dgxStorage = DGXinterface(DGXTokenStorage);
            dgxToken = DGXinterface(DGXTokenContract);
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
    function createNewSeries(
        string memory _url,
        uint256 _numberToMint,
        uint256 _DGXcost,
        uint256 _fee
    ) public onlyOwner isActive returns (bool _success) {
        //takes input from admin to create a new nft series. Will have to define how many tokens to make, how much DGX they cost, and the url from s3.
        require(msg.sender == owner(), "Only Owner"); //optional as onlyOwner Modifier is used
        uint256 total = totalSeries;
        uint256 tempNumber = _numberToMint.add(totalSeries);
        for (uint256 i = total; i < tempNumber; i++) {
            seriesToTokenId[i].url = _url;
            seriesToTokenId[i].numberInSeries = _numberToMint;
            seriesToTokenId[i].DGXcost = _DGXcost;
            seriesToTokenId[i].fee = _fee;
            totalSeries = totalSeries.add(1);
        }

        emit NewSeriesMade(_url, _numberToMint);
        return true;
    }

    /* 
* @dev Stake to series and mint tokens 
*
**/
    function stake(uint256 _tokenToBuy) public payable isActive returns (bool) {
        //takes input from admin to create a new nft series. Will have to define how many tokens to make, how much DGX they cost, and the url from s3.
        require(
            seriesToTokenId[_tokenToBuy].fee >= 0 &&
                StakedValue[_tokenToBuy] == 0,
            "Can't stake to this token!"
        );
        uint256 amountRequired = (
            (
                seriesToTokenId[_tokenToBuy].DGXcost.add(
                    seriesToTokenId[_tokenToBuy].fee
                )
            )
        );
        uint256 transferFee = fetchTransferFee(amountRequired);
        totalFeesCollected = totalFeesCollected.add(
            seriesToTokenId[_tokenToBuy].fee
        );
        transferFee = transferFee.mul(2);
        uint256 demurageFee = fetchDemurrageFee(msg.sender);
        //add demurage fee to transfer fee
        uint256 totalFees = transferFee.add(demurageFee);
        amountRequired = amountRequired.sub(totalFees);
        //require transfer to contract succeeds
        require(
            _checkAllowance(msg.sender, amountRequired),
            "Not enough allowance"
        );
        require(
            _transferFromDGX(msg.sender, amountRequired),
            "Transfer DGX failed"
        );
        //get url
        string memory fullURL = returnURL(_tokenToBuy);

        emit CheckFees(
            totalFees,
            amountRequired,
            (
                (
                    seriesToTokenId[_tokenToBuy].DGXcost.add(
                        seriesToTokenId[_tokenToBuy].fee
                    )
                )
            )
        );
        require(amountRequired > totalFees, "Math invalid");
        require(
            mintWithTokenURI(msg.sender, _tokenToBuy, fullURL),
            "Minting NFT failed"
        );
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
    function burnStake(uint256 _tokenId) public payable returns (bool) {
        //solhint-disable-next-line max-line-length
        //check token is staked

        require(
            StakedValue[_tokenId] > 0 && seriesToTokenId[_tokenId].alive,
            "NFT not burnable yet"
        );
        //check that you are owner of token
        require(
            _isApprovedOrOwner(msg.sender, _tokenId),
            "ERC721Burnable: caller is not owner nor approved"
        );
        //check balance of smart contract
        //get fees to calculate
        uint256 transferFee = fetchTransferFee(StakedValue[_tokenId]);
        uint256 demurrageFee = fetchDemurrageFee(address(this));
        //total fees
        uint256 feeValue = transferFee.add(demurrageFee);
        require(
            feeValue < StakedValue[_tokenId],
            "Fee is more than StakedValue"
        );
        uint256 UserWithdrawal = StakedValue[_tokenId].sub(feeValue);
        UserWithdrawal = UserWithdrawal.sub((seriesToTokenId[_tokenId].fee));
        require(_checkBalance() >= UserWithdrawal, "Balance check failed");
        seriesToTokenId[_tokenId].alive = false;
        //transfer 721 to 0x000
        _burn(_tokenId);
        //transfer dgx from contract to msg.sender
        require(dgxToken.transfer(msg.sender, UserWithdrawal));
        emit Burned(msg.sender, UserWithdrawal, _tokenId);
        return true;
    }

    function checkFeesForBurn(uint256 _tokenId)
        public
        payable
        returns (uint256)
    {
        uint256 transferFee = fetchTransferFee(
            (
                seriesToTokenId[_tokenId].DGXcost.add(
                    seriesToTokenId[_tokenId].fee
                )
            )
        );
        uint256 demurrageFee = fetchDemurrageFee(address(this));
        //total fees
        uint256 feeValue = transferFee.add(demurrageFee);

        uint256 UserWithdrawal = (
            (
                seriesToTokenId[_tokenId].DGXcost.add(
                    seriesToTokenId[_tokenId].fee
                )
            )
                .sub(feeValue)
        );
        UserWithdrawal = UserWithdrawal.sub((seriesToTokenId[_tokenId].fee));
        emit CheckFees(
            feeValue,
            (
                seriesToTokenId[_tokenId].DGXcost.add(
                    seriesToTokenId[_tokenId].fee
                )
            ),
            UserWithdrawal
        );
    }
    /**
     * @dev Withdrawals DGX from the balance collected via fees only Owner.
     */
    function withdrawal() public onlyOwner returns (bool) {
        require(isOnline == false);
        uint256 temp = _checkBalance(); //calls checkBalance which will revert if no balance, if balance pass it into transfer as amount to withdrawal MAX
        require(
            temp >= totalFeesCollected,
            "Not enough balance to withdrawal the fees collected"
        );
        require(dgxToken.transfer(msg.sender, totalFeesCollected));
        emit Withdrawal(msg.sender, totalFeesCollected);
        totalFeesCollected = 0;
        return true;
    }
    function _checkBalance() internal view returns (uint256) {
        uint256 tempBalance = dgxToken.balanceOf(address(this)); //checking balance on DGX contract
        require(tempBalance > 0, "Revert: Balance is 0!"); //do I even have a balance? Lets see. If no balance revert.
        return tempBalance; //here is your balance! Fresh off the stove.
    }
    function _checkAllowance(address sender, uint256 amountNeeded)
        internal
        view
        returns (bool)
    {
        uint256 tempBalance = dgxToken.allowance(sender, address(this)); //checking balance on DGX contract
        require(tempBalance >= amountNeeded, "Revert: Balance is 0!"); //do I even have a balance? Lets see. If no balance revert.
        return true; //here is your balance! Fresh off the stove.
    }
    /*
  * @dev Gets the total amount of tokens owned by the sender
  * @return uint[] with the id of each token owned
  */
    function viewYourTokens()
        external
        view
        returns (uint256[] memory _yourTokens)
    {
        return super._tokensOfOwner(msg.sender);
    }
    function setDGXStorage(address payable newAddress)
        external
        onlyOwner
        returns (bool)
    {
        DGXTokenStorage = newAddress;
        dgxStorage = DGXinterface(DGXTokenStorage);
        return true;
    }
    function setDGXContract(address payable newAddress)
        external
        onlyOwner
        returns (bool)
    {
        DGXContract = newAddress;
        dgx = DGXinterface(DGXContract);
        return true;
    }
    function setDGXTokenContract(address payable newAddress)
        external
        onlyOwner
        returns (bool)
    {
        DGXContract = newAddress;
        dgxToken = DGXinterface(DGXContract);
        return true;
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
    function returnURL(uint256 _tokenId)
        internal
        view
        returns (string memory _URL)
    {
        require(
            checkURL(_tokenId),
            "ERC721: approved query for nonexistent token"
        ); //Does this token exist? Lets see.
        string memory uri = seriesToTokenId[_tokenId].url;
        return string(abi.encodePacked("https://bullionix.io/metadata/", uri)); //Here is your URL!
    }

    /*
  * @dev Returns the URL - internal 
  * @return URL of token with full website attached
  */
    function checkURL(uint256 _tokenId) internal view returns (bool) {
        string memory temp = seriesToTokenId[_tokenId].url;
        bytes memory tempEmptyStringTest = bytes(temp);
        require(tempEmptyStringTest.length >= 1, temp);
        return true;
    }
    function _transferFromDGX(address _owner, uint256 _amount)
        internal
        returns (bool)
    {
        require(dgxToken.transferFrom(_owner, address(this), _amount));
        return true;
    }

    function fetchTransferFee(uint256 _amountToBeTransferred)
        internal
        returns (uint256 rate)
    {
        (uint256 _base, uint256 _rate, address _collector, bool _no_transfer_fee, uint256 _minimum_transfer_amount) = dgx
            .showTransferConfigs();
        if (_no_transfer_fee) {
            return 0;
        }
        emit TransferFee(_rate.mul(_amountToBeTransferred).div(_base));
        return _rate.mul(_amountToBeTransferred).div(_base);

    }

    function fetchLastTransfer(address _user)
        internal
        returns (uint256 _payment_date)
    {
        //gets the timestamp from the DGX contract to help calculate the fees
        (bool _exists, uint256 _raw_balance, uint256 _payment_date, bool _no_demurrage_fee, bool _no_recast_fee, bool _no_transfer_fee) = dgxStorage
            .read_user(_user);
        require(
            _payment_date >= 0 && _payment_date < block.timestamp,
            "Last payment timestamp is invalid"
        );

        return _payment_date;

    }

    function fetchDemurrageFee(address _sender)
        internal
        returns (uint256 rate)
    {
        //calculate the fee taken by DGX using (rate/base)*(timestamp_now - last_payment) / number_of_seconds_in_a_day = demurrage fee
        (uint256 _base, uint256 _rate, address _collector, bool _no_demurrage_fee) = dgx
            .showDemurrageConfigs();
        if (_no_demurrage_fee) return 0;
        //get last transfer date
        uint256 last_timestamp = fetchLastTransfer(_sender);
        uint256 daysSinceTransfer = block.timestamp.sub(last_timestamp);

        //calculate total fees
        //get total demurage fee by taking fee*days
        uint256 totalFees = (
            (_rate * 10**8).div(_base).mul(daysSinceTransfer).div(86400)
        );
        emit DemurrageFee(totalFees);
        return totalFees;

    }
    function() external payable {
        revert("Please call a function");
    }
}
