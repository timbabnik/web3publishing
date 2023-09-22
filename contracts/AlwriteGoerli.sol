// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


error EmptySpace();
// error Pause();


contract AlwriteGoerli is ERC1155, Ownable {


    mapping(uint256 => string) private uris;
    mapping(uint256 => bool) public idAvailabiltiy;
    mapping(address => uint256) public bonus;
    mapping(uint256 => Post) public posts;
    mapping(uint256 => WalletBalance) public walletInfo;

    // uint public starttime;
    uint256 public price = 0.001 ether;
    uint256 public LENGTH = 10 days;
    uint256 public postsNumber;
    uint256 public postsAllowed = 5;

    bool public permisionless;

    
    


    constructor() ERC1155("") {}


    struct Post {
        address owner;
        address coowner;
        bool isCoOwner;
        uint minted;
        uint oneofoneMinted;
        uint quoteMinted;
        uint basicMinted;
        uint startingtime;
        string uriFirst;
        string uriSecond;
        string uriThird;
    }


    struct WalletBalance {
        uint walletOwner;
        uint walletCoauthor;
    }



    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
    } 


    function setPostNumberAllowed(uint256 _postNumber) external onlyOwner {
        postsAllowed = _postNumber;
    }

    function setPermisionless() external onlyOwner {
        permisionless = true;
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
        uint _nftId
    ) public payable {
        Post storage newPost = posts[_postId];
        require(newPost.oneofoneMinted == 0, "wrong one");

         if (keccak256(abi.encodePacked("")) == keccak256(abi.encodePacked(_uri))) {
            revert EmptySpace();
        }

        if (newPost.minted == 0) {
            if (!permisionless) {
                require(postsNumber < postsAllowed);
            }
            postsNumber++;
        }

        if (newPost.minted > 0) {
            require(keccak256(abi.encodePacked(newPost.uriFirst)) == keccak256(abi.encodePacked(_uri)), "Wrong uri");
            require(newPost.owner == _owner, "Wrong owner");
        } 

        if (newPost.oneofoneMinted == 0 ) {
            require(!idAvailabiltiy[_nftId], "upsala");
        }



         _mint(msg.sender, _nftId, 1, "");
         setTokenUri(_nftId, _uri);

         newPost.oneofoneMinted++;


        if (newPost.minted == 0) {
            newPost.owner = _owner;
            newPost.uriFirst = _uri;
            newPost.uriSecond = _uriTwo;
            newPost.uriThird = _uriThree;
            newPost.startingtime = block.timestamp;
        }

        walletInfo[_postId].walletOwner += msg.value * 90 / 100;
        walletInfo[_postId].walletCoauthor += msg.value * 10 / 100;


        newPost.minted++;
        idAvailabiltiy[_nftId] = true;
    }




    function quoteMint(
        address _owner,
        uint _postId,
        string memory _uri,
        string memory _uriTwo,
        string memory _uriThree,
        uint _nftId
    ) public payable {
        Post storage newPost = posts[_postId];

        if (keccak256(abi.encodePacked("")) == keccak256(abi.encodePacked(_uriThree))) {
            revert EmptySpace();
        }

        if (newPost.minted == 0) {
            if (!permisionless) {
                require(postsNumber < postsAllowed);
            }
            postsNumber++;
        }
       
        if (newPost.minted > 0) {
            require(keccak256(abi.encodePacked(newPost.uriThird)) == keccak256(abi.encodePacked(_uriThree)), "Wrong uri");
            require(newPost.owner == _owner, "Wrong owner");
            require(newPost.quoteMinted < 100, "wrong three");
        } 

        if (newPost.quoteMinted == 0 ) {
            require(!idAvailabiltiy[_nftId], "upsala");
        }

        if (newPost.quoteMinted > 0) {
            require(keccak256(abi.encodePacked(uri(_nftId))) == keccak256(abi.encodePacked(_uriThree)), "fdsafas");
        }



         _mint(msg.sender, _nftId, 1, "");
         setTokenUri(_nftId, _uriThree);

         newPost.quoteMinted++;


        if (newPost.minted == 0) {
            newPost.owner = _owner;
            newPost.uriFirst = _uri;
            newPost.uriSecond = _uriTwo;
            newPost.uriThird = _uriThree;
            newPost.startingtime = block.timestamp;
        }

        walletInfo[_postId].walletOwner += msg.value * 90 / 100;
        walletInfo[_postId].walletCoauthor += msg.value * 10 / 100;

    
        newPost.minted++;
        idAvailabiltiy[_nftId] = true;
    }


      function basic(
         address _owner,
        uint _postId,
        string memory _uri,
        string memory _uriTwo,
        string memory _uriThree,
        uint _nftId
    ) public payable {
        Post storage newPost = posts[_postId];

        if (keccak256(abi.encodePacked("")) == keccak256(abi.encodePacked(_uriTwo))) {
            revert EmptySpace();
        }

        if (newPost.minted == 0) {
            if (!permisionless) {
                require(postsNumber < postsAllowed);
            }
            postsNumber++;
        }

        // require(msg.value >= price, "not enough eth");

        if (newPost.minted > 0) {
            require(keccak256(abi.encodePacked(newPost.uriSecond)) == keccak256(abi.encodePacked(_uriTwo)), "Wrong uri");
            require(newPost.owner == _owner, "Wrong owner");
            require(newPost.basicMinted < 100, "wrong three");
        } 

        if (newPost.basicMinted == 0 ) {
            require(!idAvailabiltiy[_nftId], "upsala");
        }

        if (newPost.basicMinted > 0) {
            require(keccak256(abi.encodePacked(uri(_nftId))) == keccak256(abi.encodePacked(_uriTwo)));
        }

         _mint(msg.sender, _nftId, 1, "");
         setTokenUri(_nftId, _uriTwo);

         newPost.basicMinted++;

         if (newPost.minted == 0) {
            newPost.owner = _owner;
            newPost.uriFirst = _uri;
            newPost.uriSecond = _uriTwo;
            newPost.uriThird = _uriThree;
            newPost.startingtime = block.timestamp;
        }

        walletInfo[_postId].walletOwner += msg.value * 90 / 100;
        walletInfo[_postId].walletCoauthor += msg.value * 10 / 100;


        newPost.minted++;
        idAvailabiltiy[_nftId] = true;
    }

    

    function withdraw(
        uint _id
    ) public {
        Post storage newPost = posts[_id];
        require(msg.sender == newPost.owner, "You are not the owner!");
        require(newPost.startingtime + LENGTH < block.timestamp, "too soon");

        

        if (newPost.isCoOwner) {
            (bool success, ) = payable(posts[_id].coowner).call{value: walletInfo[_id].walletCoauthor + bonus[newPost.owner]}("");
            require(success);
            bonus[newPost.owner] = 0;
        } else {
            bonus[newPost.owner] += walletInfo[_id].walletCoauthor;
        }

        (bool su, ) = payable(msg.sender).call{value: walletInfo[_id].walletOwner}("");
        require(su);

        walletInfo[_id].walletOwner = 0;
        walletInfo[_id].walletCoauthor = 0;
    } 



  


    function addCoOwner(uint _postId, address _coowner) public {
        Post storage newPost = posts[_postId];
        require(newPost.owner == msg.sender, "you are not the owner");
        require(!newPost.isCoOwner, "you are not the owner");
        newPost.coowner = _coowner;
        newPost.isCoOwner = true;
    }

    
    

}