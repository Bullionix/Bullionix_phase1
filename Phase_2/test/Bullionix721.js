const Bullionix721 = artifacts.require("./Bullionix721.sol");
const DummyToken = artifacts.require("./DummyToken.sol");

const NULL_ADDRESS = 0x0000000000000000000000000000000000000000;
const ETHER = Math.pow(10, 18);

contract("Bullionix721", function(accounts) {
  const NewSeriesEvent = "NewSeriesMade";
  const StakeEvent = "Staked";
  const FEEs = 13;

  const owner = accounts[0];
  const signer = accounts[6];
  const approvedContracts = accounts.filter(
    (contract, index) => index > 0 && index < 4
  );
  const demurrageFee = 13 * 10 ** 5;

  let dgxContract;

  before(async function() {
    DummyToken = await DummyToken.new();
    assert(DummyToken.address, "Failed to deploy DummyToken with an address.");

    Bullionx721 = await ERC721Generator.new(DummyToken.address, {
      gas: 6420000,
      from: owner
    });
    assert(
      Bullionx721.address,
      "Failed to deploy Bullionx721 with an address."
    );

    const dgx = await Bullionx721.DGXContract.call();
    assert.equal(dgx, DummyToken.address, "Wrong address set as DGXContract");

    await DummyToken.approve(Bullionx721.address, 15000000000, {
      from: owner
    });
    const approved = await DummyToken.allowance.call(
      owner,
      Bullionix721.address
    );
    assert.equal(approved, 15000000000, "Allowance incorrect");
  });

  describe("changeOwner()", function() {
    it("should fail to changeOwner from non-priviledged account", async function() {
      try {
        await Bullionx721.transferOwnership(accounts[1], {
          from: accounts[2]
        });
        assert.fail(true, "Expected function to fail");
      } catch (e) {
        assert.exists(e.message || e, "Expected function to fail with error");
        assert.isFalse(
          (e.message || e) === "assert.fail()",
          "Expected non-assert failure"
        );
      }
    });

    it("should changeOwner", async function() {
      await Bullionx721.transferOwnership(accounts[1], {
        from: owner
      });
      const newOwner = await Bullionx721.owner.call();
      assert.equal(newOwner, accounts[1], "Failed to successfully changeOwner");

      await Bullionx721.changeOwner(owner, {
        from: accounts[1]
      });
      const finalNewOwner = await Bullionx721.owner.call();
      assert.equal(finalNewOwner, owner, "Failed to successfully changeOwner");
    });
  });

  describe("turnOff", function() {
    it("should fail to change isOnline from non-owner", async function() {
      try {
        await Bullionx721.toggleOnline({
          from: accounts[2]
        });
        assert.fail(true, "Expected function to fail");
      } catch (e) {
        assert.exists(
          e.message || e,
          "Expected function to fail with an error"
        );
        assert.isFalse(
          (e.message || e) === "assert.fail()",
          "Expected non-assert failure"
        );
      }
    });

    it("should successfully setStorageContract", async function() {
      await Bullionx721.toggleOnline({
        from: owner
      });
      const isOnline = await Bullionx721.isOnline.call();
      assert.false(isOnline, "Should be offline but is not");
      await Bullionx721.toggleOnline({
        from: owner
      });
      await Bullionx721.isOnline.call();
      assert.true(isOnline, "Should be online but is not");
    });
  });
});
