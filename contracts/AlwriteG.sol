// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


error EmptySpace();



contract AlwriteG is ERC1155, Ownable {


  
    mapping(uint256 => string) private uris;
    mapping(uint256 => bool) public idAvailability;
    mapping(uint256 => Post) public posts;
    mapping(address => WalletBalance) public walletInfo;
    mapping(address => uint256) public bonus;
    mapping(address => address[]) public newWhitelist;
    mapping(address => mapping(address => uint256)) public timeline;

    uint256 public price = 0 ether;
    uint256 public LENGTH = 10 days;
    uint256 public LENGTH_DEPLOYMENT = 30 days;
    uint256 public FreeTimeline = 30 seconds;
    uint256 public postsAllowed = 5;
    uint256 public starttime;
    uint256 public postsNumber;
    uint256 public walletSmartContract;

    bool public permissionless;

    

    
    constructor() ERC1155("") {
        starttime = block.timestamp;
    }


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
        permissionless = true;
    }


    function uri(uint256 tokenId) override public view returns (string memory) {
        return(uris[tokenId]);
    }
    
    function setTokenUri(uint256 tokenId, string memory _uri) private {
        uris[tokenId] = _uri;
    }

    function getAuthors(address _token) view public returns(address[] memory) {
        return newWhitelist[_token];
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
        require(newPost.oneofoneMinted == 0, "Sold out");
        require(msg.value >= price, "Not enough eth!");

         if (keccak256(abi.encodePacked("")) == keccak256(abi.encodePacked(_uri))) {
            revert EmptySpace();
        }

        if (newPost.minted == 0) {
            if (!permissionless) {
                require(postsNumber < postsAllowed);
            }
            postsNumber++;
        }

        if (newPost.minted > 0) {
            require(keccak256(abi.encodePacked(newPost.uriFirst)) == keccak256(abi.encodePacked(_uri)), "Wrong uri");
            require(newPost.owner == _owner, "Wrong owner");
        } 

        if (newPost.oneofoneMinted == 0 ) {
            require(!idAvailability[_nftId], "Id is not available");
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

        walletInfo[newPost.owner].walletOwner += msg.value * 85 / 100;
        walletInfo[newPost.owner].walletCoauthor += msg.value * 10 / 100;
        walletSmartContract += msg.value * 5 / 100;


        newPost.minted++;
        idAvailability[_nftId] = true;
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
        require(msg.value >= price, "Not enough eth!");

        if (keccak256(abi.encodePacked("")) == keccak256(abi.encodePacked(_uriThree))) {
            revert EmptySpace();
        }

        if (newPost.minted == 0) {
            if (!permissionless) {
                require(postsNumber < postsAllowed);
            }
            postsNumber++;
        }
       
        if (newPost.minted > 0) {
            require(keccak256(abi.encodePacked(newPost.uriThird)) == keccak256(abi.encodePacked(_uriThree)), "Wrong uri");
            require(newPost.owner == _owner, "Wrong owner");
            require(newPost.quoteMinted < 100, "Sold out");
        } 

        if (newPost.quoteMinted == 0 ) {
            require(!idAvailability[_nftId], "Id is not available");
        }

        if (newPost.quoteMinted > 0) {
            require(keccak256(abi.encodePacked(uri(_nftId))) == keccak256(abi.encodePacked(_uriThree)), "Wrong uri");
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

        walletInfo[newPost.owner].walletOwner += msg.value * 85 / 100;
        walletInfo[newPost.owner].walletCoauthor += msg.value * 10 / 100;
        walletSmartContract += msg.value * 5 / 100;

    
        newPost.minted++;
        idAvailability[_nftId] = true;
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
        require(msg.value >= price, "Not enough eth!");

        if (keccak256(abi.encodePacked("")) == keccak256(abi.encodePacked(_uriTwo))) {
            revert EmptySpace();
        }

        if (newPost.minted == 0) {
            if (!permissionless) {
                require(postsNumber < postsAllowed);
            }
            postsNumber++;
        }

        if (newPost.minted > 0) {
            require(keccak256(abi.encodePacked(newPost.uriSecond)) == keccak256(abi.encodePacked(_uriTwo)), "Wrong uri");
            require(newPost.owner == _owner, "Wrong owner");
            require(newPost.basicMinted < 100, "Sold out");
        } 

        if (newPost.basicMinted == 0 ) {
            require(!idAvailability[_nftId], "Id is not available");
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

        walletInfo[newPost.owner].walletOwner += msg.value * 85 / 100;
        walletInfo[newPost.owner].walletCoauthor += msg.value * 10 / 100;
        walletSmartContract += msg.value * 5 / 100;


        newPost.minted++;
        idAvailability[_nftId] = true;
    }

    





    function withdrawOwner() public onlyOwner {
        (bool su, ) = payable(msg.sender).call{value: walletSmartContract}("");
        require(su);

        walletSmartContract = 0;
    }




    function addCoOwner(address _coauthor) external {
        require(newWhitelist[msg.sender].length < 5, "five is the most you can have");
        newWhitelist[msg.sender].push(_coauthor);
        timeline[msg.sender][_coauthor] = block.timestamp;
    }



    function deleteCoauthor(address _coauthor) external {
        require(_coauthor != address(0), "Invalid coauthor address");
        address[] storage whitelist = newWhitelist[msg.sender];

        if (timeline[msg.sender][_coauthor] + FreeTimeline < block.timestamp) {
            uint calc = walletInfo[msg.sender].walletCoauthor / whitelist.length;
            (bool su, ) = payable(_coauthor).call{value: calc}("");
            require(su);

            walletInfo[msg.sender].walletCoauthor -= calc;
        }

        for (uint256 i = 0; i < whitelist.length; i++) {
            if (whitelist[i] == _coauthor) {
                // Found the coauthor, delete it by shifting the array
                whitelist[i] = whitelist[whitelist.length - 1];
                whitelist.pop();
                return;
            }
        }

        
    }


    function withdraw() public {

        if (newWhitelist[msg.sender].length > 0) {
            for (uint256 i = 0; i < newWhitelist[msg.sender].length; i++) {
                (bool success, ) = payable(newWhitelist[msg.sender][i]).call{value: walletInfo[msg.sender].walletCoauthor / newWhitelist[msg.sender].length + bonus[msg.sender] / newWhitelist[msg.sender].length}("");
                require(success);
                timeline[msg.sender][newWhitelist[msg.sender][i]] = block.timestamp;
            }
            bonus[msg.sender] = 0;
            
        } else {
            bonus[msg.sender] += walletInfo[msg.sender].walletCoauthor;
        }


        (bool su, ) = payable(msg.sender).call{value: walletInfo[msg.sender].walletOwner}("");
        require(su);

        walletInfo[msg.sender].walletOwner = 0;
        walletInfo[msg.sender].walletCoauthor = 0;
    } 

    
    

}