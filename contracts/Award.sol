// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Award is ERC1155 {


    mapping(uint256 => address[]) public newWhitelist;
    mapping(uint256 => mapping(address => bool)) public whitelistTest;
    mapping(uint256 => uint256) public totalSupplyOf;
    mapping(uint256 => string) private uris;

    address[] public neki = [0x617F2E2fD72FD9D5503197092aC168c91465E7f2, 0x17F6AD8Ef982297579C203069C1DbfFE4348c372, 0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678];
    mapping(uint256 => uint256) public wallet;
    uint256 public price = 10 ether;

    constructor() ERC1155("") {}

    struct Voucher {
        address owner;
        uint voucherId;
        bool first;
        string uriFirst;
        uint firstId;
        bool ten;
        uint256 percentage;
        bool hundred;
        string uriSecond;
        uint secondId;
        //bytes signature;
    }

    struct VoucherTest {
        uint id;
        bool firstBool;
        uint firstId;
        bool secondBool;
        uint percentage;
        bool thirdBool;
        uint secondId;
    }

    function getWhitelist(uint256 _token) view public returns(address[] memory) {
        return newWhitelist[_token];
    }
    

    function uri(uint256 tokenId) override public view returns (string memory) {
        return(uris[tokenId]);
    }
    
    function setTokenUri(uint256 tokenId, string memory _uri) private {
        uris[tokenId] = _uri;
    }

    function getMessageHash(
        Voucher calldata voucher
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(voucher.first, voucher.uriFirst, voucher.ten, voucher.percentage, voucher.hundred, voucher.uriSecond));
    }

     function getEthSignedMessageHash(
        bytes32 _messageHash
    ) public pure returns (bytes32) {
        /*
        Signature is produced by signing a keccak256 hash with the following format:
        "\x19Ethereum Signed Message\n" + len(msg) + msg
        */
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash)
            );
    }

    /*function verify(
        Voucher calldata voucher
    ) public pure returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(voucher.first, voucher.uriFirst, voucher.ten, voucher.percentage, voucher.hundred, voucher.uriSecond));
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

        return recoverSigner(ethSignedMessageHash, voucher.signature) == voucher.owner;
    }*/

    function recoverSigner(
        bytes32 _ethSignedMessageHash,
        bytes memory _signature
    ) public pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(
        bytes memory sig
    ) public pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "invalid signature length");

        assembly {
            /*
            First 32 bytes stores the length of the signature

            add(sig, 32) = pointer of sig + 32
            effectively, skips first 32 bytes of signature

            mload(p) loads next 32 bytes starting at the memory address p into memory
            */

            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        // implicitly return (r, s, v)
    }


    /*function mint(VoucherTest calldata voucher) payable public {
        //require(verify(voucher));

        if (totalSupplyOf[voucher.id] == 0 && voucher.firstBool) {
            _mint(msg.sender, voucher.firstId, 1, "");
            setTokenUri(voucher.firstId, _tokenURI);
        }
        if (totalSupplyOf[voucher.id] < 3 && voucher.secondBool) {
            require(isWhitelisted(voucher.id), "Already minted");
            newWhitelist[voucher.id].push(msg.sender);
        }
         if (totalSupplyOf[voucher.id] < 100 && voucher.thirdBool) {
            _mint(msg.sender, voucher.secondId, 1, "");
            setTokenUri(voucher.secondId, _tokenURI);
        }

        wallet[voucher.id] += price;
        totalSupplyOf[voucher.id]++;
    }

    function withdraw(VoucherTest calldata voucher) public {
        //require(verify(voucher));
        
        for (uint i = 0; i < newWhitelist[voucher.id].length; i++) {

            (bool success, ) = payable(newWhitelist[voucher.id][i]).call{value: wallet[voucher.id] * voucher.percentage / 100}("");
            require(success);
        }

        (bool su, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(su);

        wallet[voucher.id] = 0;
    } */

    function mint(Voucher calldata voucher) public payable {
        //require(verify(voucher));
        require(msg.value >= price, "Wrong price");
        
        if (totalSupplyOf[voucher.voucherId] == 0 && voucher.first) {
            _mint(msg.sender, voucher.firstId, 1, "");
            setTokenUri(voucher.firstId, voucher.uriFirst);
        }
        if (totalSupplyOf[voucher.voucherId] < 3 && voucher.ten) {
            require(isWhitelisted(voucher.voucherId), "Already minted");
            newWhitelist[voucher.voucherId].push(msg.sender);
        }
         if (totalSupplyOf[voucher.voucherId] < 100 && voucher.hundred) {
            _mint(msg.sender, voucher.secondId, 1, "");
            setTokenUri(voucher.secondId, voucher.uriSecond);
        }

        if (totalSupplyOf[voucher.voucherId] >= 3) {
            wallet[voucher.voucherId] += price;
        }
        
        totalSupplyOf[voucher.voucherId]++;
    }
    

    function withdraw(Voucher calldata voucher) public {
        //require(verify(voucher));
        //require(msg.sender == voucher.owner, "You are not the owner!");
        
        for (uint i = 0; i < newWhitelist[voucher.voucherId].length; i++) {

            (bool success, ) = payable(newWhitelist[voucher.voucherId][i]).call{value: wallet[voucher.voucherId] * voucher.percentage / 100}("");
            require(success);
        }

        (bool su, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(su);

        wallet[voucher.voucherId] = 0;
    }  


    /*function mintTwo() payable public {
        _mint(msg.sender, 1, 1, "");
        wallet[1] += 0.5 ether;
    }


    function withdrawTwo() public {
        for (uint i = 0; i < neki.length; i++) {
            (bool success, ) = payable(neki[i]).call{value: wallet[1] * 5 / 100}("");
            require(success);
        }

        (bool su, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(su);
        wallet[1] = 0;
    }
*/

    function isWhitelisted(uint id) view public returns(bool) {
        for (uint i = 0; i < newWhitelist[id].length; i++) {
            if (newWhitelist[id][i] == msg.sender) {
                return false;
            }
        }
        return true;
    }

    

}