import React, { useEffect, useState } from "react";

//New API coming https://gist.github.com/rekmarks/d318677c8fc89e5f7a2f526e00a0768a

interface MetaMaskPageProps {

}

const MetaMaskPage = (props: MetaMaskPageProps) => {

    const [metamaskAccount, setMetamaskAccount] = useState()

    async function loadMetaMask() {
        if (typeof window['ethereum'] !== 'undefined') {
            console.log('window:', window['ethereum'].isMetaMask)

            try {
                const ethereum = window['ethereum']
                const accounts = await ethereum.enable()

                if (accounts.length > 0) {
                    setMetamaskAccount(accounts[0])
                }

                console.log('accounts:', accounts)
                // You now have an array of accounts!
                // Currently only ever one:
                // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']

            } catch (error) {

                // Handle error. Likely the user rejected the login
                console.error(error)
            }

        }

    }



    useEffect(() => {
        loadMetaMask()
    }, [])

    function more() {
        if (typeof window['ethereum'] !== 'undefined') {

        }
    }

    function returnNetwork() {

        if (typeof window['ethereum'] !== 'undefined') {
            switch (window['ethereum'].networkVersion) {
                case '1':
                    return "Ethereum Main Network";
                case '2':
                    return "Morden Test Network"
                case '3':
                    return "Ropsten Test Network"
                case '4':
                    return "Rinkeby Test Network"
                case '42':
                    return "Kovan Test Network"

                default:
                    break;
            }
        }
        else {
            return "Metamask not loaded"
        }


    }


    return (
        <div>
            {metamaskAccount &&
                <div>
                    <div>Logged in as {metamaskAccount}</div>
                    <div>Currently using {returnNetwork()} </div>
                    <div>More about this connection: ${}</div>
                </div>
            }
        </div>
    );
}
export default MetaMaskPage;