const contractAddress = "0xEab41D45A97DBe6e3f8BD6c9Df14F4CD2774f9C5"; // Replace with deployed contract address
const abi = [[
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_skinId",
                "type": "uint256"
            }
        ],
        "name": "burnSkin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_metadata",
                "type": "string"
            }
        ],
        "name": "mintSkin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "SkinBurned",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "metadata",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "SkinMinted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "SkinTransferred",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_skinId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            }
        ],
        "name": "transferSkin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_skinId",
                "type": "uint256"
            }
        ],
        "name": "getSkin",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "metadata",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "internalType": "struct GamingSkinsNFT.Skin",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]];

let web3;
let contract;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        contract = new web3.eth.Contract(abi, contractAddress);
        console.log("Wallet connected");
    } else {
        alert("Please install MetaMask!");
    }
}

async function mintSkin() {
    const accounts = await web3.eth.getAccounts();
    const name = document.getElementById("skinName").value;
    const metadata = document.getElementById("skinMetadata").value;

    await contract.methods.mintSkin(name, metadata).send({ from: accounts[0] });
    alert("Skin Minted Successfully!");
}

async function transferSkin() {
    const accounts = await web3.eth.getAccounts();
    const skinId = document.getElementById("skinId").value;
    const recipient = document.getElementById("recipient").value;

    await contract.methods.transferSkin(skinId, recipient).send({ from: accounts[0] });
    alert("Skin Transferred Successfully!");
}

async function burnSkin() {
    const accounts = await web3.eth.getAccounts();
    const skinId = document.getElementById("burnSkinId").value;

    await contract.methods.burnSkin(skinId).send({ from: accounts[0] });
    alert("Skin Burned Successfully!");
}

window.onload = connectWallet;
