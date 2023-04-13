//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";


contract Lock is EIP712, ERC1155, Ownable {

    mapping(uint256 => string) public _uris;
    uint256 public testAmount = 1;
    mapping (uint256 => uint256) public mintedNfts;
    address public ownerr = 0x1B8163f3f7Ae29AF06c50dF4AE5E0Fe9375f8496;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    string private constant SIGNING_DOMAIN = "Voucher-Domain";
    string private constant SIGNATURE_VERSION = "1";

    struct LazyNFTVoucher {
        uint256 tokenId;
        uint256 price;
        string uri;
        bytes signature;
    }

    constructor() ERC1155("") EIP712(SIGNING_DOMAIN, SIGNATURE_VERSION) {}

    function uri(uint256 tokenId) override public view returns (string memory) {
        return(_uris[tokenId]);
    }

    function setTokenUri(uint256 tokenId, string memory urii) public {
        _uris[tokenId] = urii;
    }

    function mint(LazyNFTVoucher calldata voucher)
        public
        
    {   
        address signer = recover(voucher);
        require(signer == ownerr, "now owner");
        require(mintedNfts[voucher.tokenId] < 3, "sold out");
        mintedNfts[voucher.tokenId]++;
        _mint(msg.sender, voucher.tokenId, testAmount, "");
        setTokenUri(voucher.tokenId, voucher.uri);
    }

    function recover(LazyNFTVoucher calldata voucher) public view returns (address) {
        bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
            keccak256("LazyNFTVoucher(uint256 tokenId,uint256 price,string uri)"),
            voucher.tokenId,
            voucher.price,
            keccak256(bytes(voucher.uri))
        )));
        address signer = ECDSA.recover(digest, voucher.signature);
        return signer;
    }
}