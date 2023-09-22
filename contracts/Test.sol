// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Test is ERC1155 {


    mapping(uint256 => address[]) public newWhitelist;
    mapping(uint256 => mapping(address => bool)) public whitelistTest;
    mapping(uint256 => uint256) public totalSupplyOf;
    mapping(uint256 => string) private uris;
    mapping(uint256 => Post) public posts;
    mapping(uint256 => bool) public idAvailabiltiy;

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
        uint basicMinted;
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

        if (newPost.minted > 0) {
            require(keccak256(abi.encodePacked(newPost.uriFirst)) == keccak256(abi.encodePacked(_uri)), "Wrong uri");
            require(newPost.owner == _owner, "Wrong owner");
            require(newPost.minted < 100, "wrong three");
        } 

        if (newPost.oneofoneMinted == 0 ) {
            require(!idAvailabiltiy[_nftId], "upsala");
        }



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
        idAvailabiltiy[_nftId] = true;
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
            require(keccak256(abi.encodePacked(newPost.uriSecond)) == keccak256(abi.encodePacked(_uriTwo)), "Wrong uri");
            require(!idAvailabiltiy[_postId], "not available");
            require(newPost.owner == _owner, "Wrong owner");
            require(newPost.royalties && newPost.royaltiesMinted < 10, "wrong two");
        } 

        if (newPost.royaltiesMinted == 0 ) {
            require(!idAvailabiltiy[_nftId], "upsala");
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
        idAvailabiltiy[_nftId] = true;
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
            require(keccak256(abi.encodePacked(newPost.uriThird)) == keccak256(abi.encodePacked(_uriThree)), "Wrong uri");
            require(newPost.owner == _owner, "Wrong owner");
            require(newPost.quote && newPost.quoteMinted < 10, "wrong three");
        } 

        if (newPost.quoteMinted == 0 ) {
            require(!idAvailabiltiy[_nftId], "upsala");
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
        idAvailabiltiy[_nftId] = true;
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
            require(newPost.owner == _owner, "Wrong owner");
            require(newPost.minted < 100, "wrong three");
        } 

        if (newPost.basicMinted == 0 ) {
            require(!idAvailabiltiy[_nftId], "upsala");
        }

         _mint(msg.sender, _nftId, 1, "");
         setTokenUri(_nftId, _uriTwo);

         newPost.basicMinted++;

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
        idAvailabiltiy[_nftId] = true;
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
        require(msg.sender == _owner, "You are not the owner!");
        
        for (uint i = 0; i < newWhitelist[_id].length; i++) {

            (bool success, ) = payable(newWhitelist[_id][i]).call{value: wallet[_owner] * _percentage / 100}("");
            require(success);
        }

        (bool su, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(su);

        wallet[_owner] = 0;
    } 


    function isWhitelisted(uint id) view public returns(bool) {
        for (uint i = 0; i < newWhitelist[id].length; i++) {
            if (newWhitelist[id][i] == msg.sender) {
                return false;
            }
        }
        return true;
    }

    

}