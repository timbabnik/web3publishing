// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Award is ERC1155 {


    mapping(uint256 => address[]) public newWhitelist;
    mapping(uint256 => mapping(address => bool)) public whitelistTest;
    mapping(uint256 => uint256) public totalSupplyOf;
    mapping(uint256 => string) private uris;
    mapping(uint256 => Post) public posts;

    address[] public neki = [0x617F2E2fD72FD9D5503197092aC168c91465E7f2, 0x17F6AD8Ef982297579C203069C1DbfFE4348c372, 0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678];
    mapping(address => uint256) public wallet;
    uint256 public price = 0.001 ether;

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
        bytes signature;
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

    struct Post {
        address owner;
        uint minted;
        bool oneofone;
        bool royalties;
        bool quote;
        uint oneofoneMinted;
        uint royaltiesMinted;
        uint quoteMinted;
        string uriFirst;
        string uriSecond;
        string uriThird;
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
        bool _first,
        string memory _uriFirst,
        bool _ten,
        uint256 _percentage,
        bool _hundred,
        string memory _uriSecond
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_first, _uriFirst, _ten, _percentage, _hundred, _uriSecond));
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

    function verify(
        address _owner,
        bool _first,
        string memory _uriFirst,
        bool _ten,
        uint256 _percentage,
        bool _hundred,
        string memory _uriSecond,
        bytes memory _signature

    ) public pure returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(_first, _uriFirst, _ten, _percentage, _hundred, _uriSecond));
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

        return recoverSigner(ethSignedMessageHash, _signature) == _owner;
    }

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
            wallet[voucher.owner] += price;
        }
        
        totalSupplyOf[voucher.voucherId]++;
    }


    function mintTwo (
        address _owner,
        uint _postId,
        string memory _uri,
        uint _nftId,
        uint _boolId,
        bool _oneofone,
        bool _royalties,
        bool _quote
    ) public payable {
        //require(verify(_owner, _first, _uriFirst, _ten, _percentage, _hundred, _uriSecond, _signature));
        //require(msg.value >= price, "Wrong price");
        Post storage newPost = posts[_postId];
        if (newPost.minted > 0) {
            require(keccak256(abi.encodePacked(uri(_nftId))) == keccak256(abi.encodePacked(_uri)), "Wrong uri");
            require(newPost.owner == _owner, "Wrong owner");
            if (_boolId == 1) {
                require(newPost.oneofone && newPost.oneofoneMinted == 0, "wrong one");
            }
            if (_boolId == 2) {
                require(newPost.royalties && newPost.royaltiesMinted < 10, "wrong two");
            }
            if (_boolId == 3) {
                require(newPost.quote && newPost.quoteMinted < 10, "wrong three");
            }
        } 

        require(newPost.minted < 100);

         _mint(msg.sender, _nftId, 1, "");
         setTokenUri(_nftId, _uri);

         if (_boolId == 1) {
             newPost.oneofoneMinted++;
             newPost.oneofone = true;
         }

          if (_boolId == 2) {
             newPost.royaltiesMinted++;
             newWhitelist[_postId].push(msg.sender);
             newPost.royalties = true;
         }

          if (_boolId == 3) {
             newPost.royaltiesMinted++;
             newPost.quote = true;
         }

        if (newPost.minted == 0) {
            newPost.owner = _owner;
            newPost.oneofone = _oneofone;
            newPost.royalties = _royalties;
            newPost.quote = _quote;
        }

        wallet[newPost.owner] += price;
        newPost.minted++;
    }


    function oneOfOneMint(
        address _owner,
        uint _postId,
        string memory _uri,
        string memory _uriTwo,
        string memory _uriThree,
        uint _nftId,
        bool _oneofone,
        bool _royalties,
        bool _quote
    ) public payable {
        Post storage newPost = posts[_postId];
        require(newPost.oneofoneMinted == 0, "wrong one");


         _mint(msg.sender, _nftId, 1, "");
         setTokenUri(_nftId, _uri);

         newPost.oneofoneMinted++;


        if (newPost.minted == 0) {
            newPost.owner = _owner;
            newPost.oneofone = _oneofone;
            newPost.royalties = _royalties;
            newPost.quote = _quote;
            newPost.uriFirst = _uri;
            newPost.uriSecond = _uriTwo;
            newPost.uriThird = _uriThree;
        }

        wallet[newPost.owner] += price;
        newPost.minted++;
    }


    function royaltiesMint(
        address _owner,
        uint _postId,
        string memory _uri,
        string memory _uriTwo,
        string memory _uriThree,
        uint _nftId,
        bool _oneofone,
        bool _royalties,
        bool _quote
    ) public payable {
        Post storage newPost = posts[_postId];
        if (newPost.minted > 0) {
            require(keccak256(abi.encodePacked(newPost.uriFirst)) == keccak256(abi.encodePacked(_uriTwo)), "Wrong uri");
            require(newPost.owner == _owner, "Wrong owner");
            require(newPost.royalties && newPost.royaltiesMinted < 10, "wrong two");
        } 

         _mint(msg.sender, _nftId, 1, "");
         setTokenUri(_nftId, _uri);

         newPost.royaltiesMinted++;


        if (newPost.minted == 0) {
            newPost.owner = _owner;
            newPost.oneofone = _oneofone;
            newPost.royalties = _royalties;
            newPost.quote = _quote;
            newPost.uriFirst = _uri;
            newPost.uriSecond = _uriTwo;
            newPost.uriThird = _uriThree;
        }

        wallet[newPost.owner] += price;
        newPost.minted++;
    }


    function quoteMint(
        address _owner,
        uint _postId,
        string memory _uri,
        string memory _uriTwo,
        string memory _uriThree,
        uint _nftId,
        bool _oneofone,
        bool _royalties,
        bool _quote
    ) public payable {
        Post storage newPost = posts[_postId];
        if (newPost.minted > 0) {
            require(keccak256(abi.encodePacked(newPost.uriFirst)) == keccak256(abi.encodePacked(_uriThree)), "Wrong uri");
            require(newPost.owner == _owner, "Wrong owner");
            require(newPost.quote && newPost.quoteMinted < 10, "wrong three");
        } 


         _mint(msg.sender, _nftId, 1, "");
         setTokenUri(_nftId, _uri);

         newPost.quoteMinted++;


        if (newPost.minted == 0) {
            newPost.owner = _owner;
            newPost.oneofone = _oneofone;
            newPost.royalties = _royalties;
            newPost.quote = _quote;
            newPost.uriFirst = _uri;
            newPost.uriSecond = _uriTwo;
            newPost.uriThird = _uriThree;
        }

        wallet[newPost.owner] += price;
        newPost.minted++;
    }


      function basic(
         address _owner,
        uint _postId,
        string memory _uri,
        string memory _uriTwo,
        string memory _uriThree,
        uint _nftId,
        bool _oneofone,
        bool _royalties,
        bool _quote
    ) public payable {
        Post storage newPost = posts[_postId];
        if (newPost.minted > 0) {
            require(keccak256(abi.encodePacked(newPost.uriSecond)) == keccak256(abi.encodePacked(_uriTwo)), "Wrong uri");
            require(keccak256(abi.encodePacked(uri(_nftId))) == keccak256(abi.encodePacked(_uriTwo)), "Wrong uri");
            require(newPost.owner == _owner, "Wrong owner");
            require(newPost.minted < 100, "wrong three");
        } 

         _mint(msg.sender, _nftId, 1, "");
         setTokenUri(_nftId, _uriTwo);

         if (newPost.minted == 0) {
            newPost.owner = _owner;
            newPost.oneofone = _oneofone;
            newPost.royalties = _royalties;
            newPost.quote = _quote;
            newPost.uriFirst = _uri;
            newPost.uriSecond = _uriTwo;
            newPost.uriThird = _uriThree;
        }

        wallet[newPost.owner] += price;
        newPost.minted++;
    }
    

    function withdraw(
        address _owner,
        uint _id,
        bool _first,
        string memory _uriFirst,
        bool _ten,
        uint256 _percentage,
        bool _hundred,
        string memory _uriSecond,
        bytes memory _signature
    ) public {
        require(verify(_owner, _first, _uriFirst, _ten, _percentage, _hundred, _uriSecond, _signature));
        require(msg.sender == _owner, "You are not the owner!");
        
        for (uint i = 0; i < newWhitelist[_id].length; i++) {

            (bool success, ) = payable(newWhitelist[_id][i]).call{value: wallet[_owner] * _percentage / 100}("");
            require(success);
        }

        (bool su, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(su);

        wallet[_owner] = 0;
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