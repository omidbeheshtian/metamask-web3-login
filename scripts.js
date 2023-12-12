window.userWalletAddress = null
const loginButton = document.getElementById('loginButton');
const userWallet = document.getElementById('userWallet');
const INSTALL_METAMASK_MESSAGE = 'MetaMask is not installed';
const LOGIN_BUTTON_TEXT = 'Click to Login';
const LOGOUT_BUTTON_TEXT = 'Sign out of MetaMask';


function toggleButton() {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
        console.log('MetaMask not found.');
        loginButton.innerText = INSTALL_METAMASK_MESSAGE;
        loginButton.classList.remove('bg-purple-500', 'text-white');
        loginButton.classList.add('bg-gray-500', 'text-gray-100', 'cursor-not-allowed');
        return false;
    }

    console.log('MetaMask found.');
    loginButton.innerText = LOGIN_BUTTON_TEXT;
    loginButton.addEventListener('click', loginWithMetaMask);
}

async function loginWithMetaMask() {
    try {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        if (!accounts) {
            return;
        }

        window.userWalletAddress = accounts[0];
        userWallet.innerText = window.userWalletAddress;
        loginButton.innerText = LOGOUT_BUTTON_TEXT;

        loginButton.removeEventListener('click', loginWithMetaMask);
        setTimeout(() => {
            loginButton.addEventListener('click', signOutOfMetaMask);
        }, 200);
    } catch (error) {
        console.error(error.message);
        // Display a user-friendly error message in the UI.
    }
}

function signOutOfMetaMask() {
    window.userWalletAddress = null;
    userWallet.innerText = '';
    loginButton.innerText = LOGIN_BUTTON_TEXT;

    loginButton.removeEventListener('click', signOutOfMetaMask);
    setTimeout(() => {
        loginButton.addEventListener('click', loginWithMetaMask);
    }, 200);
}

window.addEventListener('DOMContentLoaded', async() => {
    const provider = await detectEthereumProvider();
    if (provider) {
        window.ethereum = provider;
        toggleButton();
    } else {
        console.log('MetaMask not found Omid Beheshtian!');
        loginButton.innerText = INSTALL_METAMASK_MESSAGE;
        loginButton.classList.remove('bg-purple-500', 'text-white');
        loginButton.classList.add('bg-gray-500', 'text-gray-100', 'cursor-not-allowed');
    }
});