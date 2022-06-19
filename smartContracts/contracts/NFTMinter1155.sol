// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMinter1155 is ERC1155, Ownable  {

    string public name;
    string public symbol;

    constructor(string memory _name, string memory _symbol) ERC1155("") {
        name = _name;
        symbol = _symbol;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => string) public tokenURI;

    function mint(
        address to,
        string memory _uri,
        uint256 amount
    ) public returns(uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId, amount, "");
        setURI(newItemId, _uri);

        return newItemId;
    }

    function batchMint(
        address to,
        string[] memory _uri,
        uint256[] memory amount
    ) public returns(uint256[] memory)
    {
        uint[] memory ids = new uint[](amount.length);
        for(uint i = 0 ; i< amount.length ; i++ ){
            _tokenIds.increment();
            ids[i] = _tokenIds.current();
        }
        _mintBatch(to, ids, amount, "");
        for(uint i = 0 ; i< amount.length ; i++ ){
            setURI(ids[i], _uri[i]);
        }
        return ids;
    }

    function setURI(uint256 _id, string memory _uri) internal {
        tokenURI[_id] = _uri;
    }

    function uri(uint256 _id) public view override returns (string memory) {
        return tokenURI[_id];
    }

    function burn(uint256 tokenId, uint256 amount) public {
        uint256 balance = balanceOf(_msgSender(), tokenId);
        require(balance > 0, "ERC1155: Caller is not the owner");
        super._burn(_msgSender(), tokenId, amount);
    }

}