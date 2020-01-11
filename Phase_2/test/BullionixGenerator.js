const BullionixGenerator = artifacts.require("./BullionixGenerator.sol");
const DGXinterface = artifacts.require("./DGXinterface.sol");

const NULL_ADDRESS = 0x0000000000000000000000000000000000000000;
const ETHER = Math.pow(10, 18);

contract("BullionixGenerator", function(accounts) {
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

    BullionixGenerator = await ERC721Generator.new(DummyToken.address, {
      gas: 6420000,
      from: owner
    });
    assert(
      BullionixGenerator.address,
      "Failed to deploy BullionixGenerator with an address."
    );

    const dgx = await BullionixGenerator.DGXContract.call();
    assert.equal(dgx, DummyToken.address, "Wrong address set as DGXContract");

    await DummyToken.approve(BullionixGenerator.address, 15000000000, {
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
        await BullionixGenerator.transferOwnership(accounts[1], {
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
      await BullionixGenerator.transferOwnership(accounts[1], {
        from: owner
      });
      const newOwner = await BullionixGenerator.owner.call();
      assert.equal(newOwner, accounts[1], "Failed to successfully changeOwner");

      await BullionixGenerator.changeOwner(owner, {
        from: accounts[1]
      });
      const finalNewOwner = await BullionixGenerator.owner.call();
      assert.equal(finalNewOwner, owner, "Failed to successfully changeOwner");
    });
  });

  describe("turnOff and turn on", function() {
    it("should fail to change isOnline from non-owner", async function() {
      try {
        await BullionixGenerator.toggleOnline({
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

    it("should successfully turn online and offline", async function() {
      await BullionixGenerator.toggleOnline({
        from: owner
      });
      const isOnline = await BullionixGenerator.isOnline.call();
      assert.false(isOnline, "Should be offline but is not");
      await BullionixGenerator.toggleOnline({
        from: owner
      });
      await BullionixGenerator.isOnline.call();
      assert.true(isOnline, "Should be online but is not");
    });
  });
  describe("create new series", function() {
    const seriesData = {
      name: "Vitalik Test Token",
      numberToMint: "10",
      DGXCost: "10",
      Fee: "1"
    };

    before(async function() {
      const onlineStatus = await Bullionix721.isOnline.call();
      if (onlineStatus) {
        await Bullionix721.toggleOnline({
          from: owner
        });
      }
      const newOnlineStatus = await eRC721Generator.isOnline.call();
      assert.isFalse(newOnlineStatus, "Failed to turn Generator offline");
    });

    it("should fail to create new series when offline", async function() {
      try {
        await Bullionix721.createNewSeries(
          seriesData.name,
          seriesData.numberToMint,
          seriesData.DGXCost,
          seriesData.Fee,
          {
            from: accounts[2]
          }
        );
        assert.fail(true, "Expected transaction to fail");
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

    it("should fail to create new series not from owner and offline", async function() {
      try {
        // const
        const onlineStatus = await Bullionix721.isOnline.call();
        if (!onlineStatus) {
          await Bullionix721.toggleOnline({
            from: owner
          });
        }
        const newOnlineStatus = await Bullionix721.isOnline.call();
        assert.isTrue(newOnlineStatus, "Failed to turn Generator offline");

        await Bullionix721.createERC721(token.name, token.symbol, token.url, {
          from: accounts[2]
        });
        assert.fail(true, "Expected transaction to fail");
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

    it("should successfully create new series", async function() {
      const onlineStatus = await Bullionix721.isOnline.call();
      assert.isTrue(onlineStatus, "Generator not online");

      const creation = await Bullionix721.createNewSeries(
        seriesData.name,
        seriesData.numberToMint,
        seriesData.DGXCost,
        seriesData.Fee,
        {
          from: owner
        }
      );
      const newSeries = Bullionix721.seriesToTokenId.call(1);
      assert.equal(
        newSeries.DGXCost,
        seriesData.DGXCost,
        "Failed to get value from new token series"
      );
      assert.exists(newSeries, "Token created  has no value");
    });
  });
});
