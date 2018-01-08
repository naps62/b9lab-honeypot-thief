const HoneyPot = artifacts.require("./HoneyPot.sol");
const Thief = artifacts.require("./Thief.sol");
const BigNumber = require('bignumber.js');
const P = require('bluebird');
web3.eth.getMinedTx = require('./helpers/get_mined_tx');

const getBalance = P.promisify(web3.eth.getBalance);

contract("Thief", accounts => {
  const owner = accounts[0];
  const hacker = accounts[1];
  const value = new BigNumber(web3.toWei(0.1, "ether"));
  let thief = null;
  let honeypot = null;

  before(async () => {
  });

  beforeEach(async () => {
    honeypot = await HoneyPot.new({ from: owner, value: web3.toWei(5, "ether") });

    thief = await Thief.new(
      honeypot.address,
      51,
      { from: hacker, value: value }
    );
  });

  it("can steal 10 times his balance", async () => {
    const initial = await getBalance(thief.address);

    await web3.eth.getMinedTx(
      await thief.get.sendTransaction({ from: hacker, data: "@naps62" })
    );

    const final = await getBalance(thief.address);
    const leftovers = await getBalance(honeypot.address);

    assert(final.equals(new BigNumber(value).times(51)));
    console.log(web3.fromWei(leftovers).toNumber())
    assert(leftovers.equals(0));
  });

  it("allows the owner to withdraw everything", async () => {
    await web3.eth.getMinedTx(
      await thief.get.sendTransaction({ from: hacker, data: "@naps62" })
    );

    const initial = await getBalance(hacker);

    await web3.eth.getMinedTx(
      await thief.goodbye.sendTransaction({ from: hacker })
    );

    const final = await getBalance(hacker);

    assert(final.greaterThan(initial));
  })
});
