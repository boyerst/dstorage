import DStorage from '../abis/DStorage.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';



//Declare IPFS
const ipfsClient = require('ipfs-http-client')
// Connect it to free infura client at specific host
// This gives us an ipfs object inside of our app that we can interact with (ie upload, add, etc.)
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values



class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }


  async loadBlockchainData() {
    //Declare Web3
    const web3 = window.web3
    console.log(web3)

    //Load account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })
    //Network ID
      // Fetch Ganache networkId like so...
    const networkId = await web3.eth.net.getId()
    // Fetch networks object from artifact
    const networkData = DStorage.networks[networkId]
    if(networkData) {
      // Assign contract
        // Require 2 peices of information from artifact
          // 1. ABI: reference the ABI from the DStorage object in DStorage.json artifact file
          // 2. address: reference this from the networkData that derives from the networkId (above)
            // networkId derives from the networks object in the artifact
      const dstorage = new web3.eth.Contract(DStorage.abi, networkData.address)
      // Set 
      this.setState({ dstorage })
      // Get files amount
        // The number of files that are inside of the app

      const filesCount = await dstorage.methods.fileCount().call()
      // Set state with number of files that are inside of app
      this.setState({ filesCount })
      // Load files&sort by the newest
      // Loop through filesCount in a backwards manner, subtracting 1 each time
      for (var i = filesCount; i >= 1; i--) {
        const file = await dstorage.methods.files(i).call()
        this.setState({
          files: [...this.state.files, file]
        })
      }
    } else {
      window.alert('DStorage contract not deployed to detected network.')
    }
  }


  // Get file from user
  captureFile = event => {
    // Prevent the default behaviour of the form so it doesn't refresh after submittal❓
    event.preventDefault()
    // Get the files from the form field
    const file = event.target.files[0]
    // Use the native file reader from the JS window object
    const reader = new window.FileReader()
    // Convert the file to a buffer
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name
      })
      console.log('buffer', this.state.buffer)
    }
  }


  //Upload File
  uploadFile = description => {

    //Add file to the IPFS

      //Check If error
        //Return error

      //Set state to loading

      //Assign value for the file without extension

      //Call smart contract uploadFile function 

  }

  //Set states
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      dstorage: null,
      files: [],
      // Conditions for actions for loading/not loading
      loading: false,
      type: null,
      name: null
    }

    //Bind functions
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              files={this.state.files}
              captureFile={this.captureFile}
              uploadFile={this.uploadFile}
            />
        }
      </div>
    );
  }
}

export default App;