// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract SimpleStorage {
    uint private _data;
    
    function setData(uint data) external {
        _data = data;
    }
    
    function getData() external view returns(uint) {
        return _data;
    }
}