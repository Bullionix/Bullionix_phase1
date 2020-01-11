pragma solidity ^0.5.0;

/**
 * @title ERC721 token receiver interface
 * @dev Interface for any contract that wants to support safeTransfers
 * from ERC721 asset contracts.
 */
interface DGXinterface {
  /// @dev read transfer configurations
/// @return {
///   "_base": "denominator for calculating transfer fees",
///   "_rate": "numerator for calculating transfer fees",
///   "_collector": "the ethereum address of the transfer fees collector",
///   "_no_transfer_fee": "true if transfer fees is turned off globally",
///   "_minimum_transfer_amount": "minimum amount of DGX that can be transferred"
/// }
function showTransferConfigs()
 external
  returns (uint256 _base, uint256 _rate, address _collector, bool _no_transfer_fee, uint256 _minimum_transfer_amount);
  /// @dev read the demurrage configurations
/// @return {
///   "_base": "denominator for calculating demurrage fees",
///   "_rate": "numerator for calculating demurrage fees",
///   "_collector": "ethereum address of the demurrage fees collector"
///   "_no_demurrage_fee": "true if demurrage fees is turned off globally"
/// }
function showDemurrageConfigs()
  external
  returns (uint256 _base, uint256 _rate, address _collector, bool _no_demurrage_fee);
      /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a `Transfer` event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through `transferFrom`. This is
     * zero by default.
     *
     * This value changes when `approve` or `transferFrom` are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * > Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an `Approval` event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a `Transfer` event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    
    /**
     @dev Returns the user data for an account
     * Specifically calling this to get the last time of transfer to calculate demurrage fees
     * 
     *
     * Returns bool _exists,
     * Returns uint256 _raw_balance,
     * Returns uint256 _payment_date,
     * Returns bool _no_demurrage_fee,
     * Returns bool _no_recast_fee,
     * Returns bool _no_transfer_fee
     *
     * Emits a `Transfer` event.
     **/
function read_user(address _account)
        external
    returns (
        bool _exists,
        uint256 _raw_balance,
        uint256 _payment_date,
        bool _no_demurrage_fee,
        bool _no_recast_fee,
        bool _no_transfer_fee
    );

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to `approve`. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
