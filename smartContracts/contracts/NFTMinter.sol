// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract NFTMinter is ERC721URIStorage, Ownable {

    constructor() ERC721("MintNFT-721", "MNFT-721") {
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Mint NFTs
    function mint(address to, string memory uri) public returns(uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        _setTokenURI(newItemId, uri);

        return newItemId;
    }

    function burn(uint256 tokenId) public {
        require(_msgSender() == ownerOf(tokenId), "ERC721: Sender is not the owner");
        _burn(tokenId);
    }

}