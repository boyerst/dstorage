pragma solidity ^0.5.0;

contract DStorage {

  // State variable
  string public name = 'DStorage';

  // Number of files
  // Mapping(fileId => Struct) 
  mapping(uint => File) public files;

  // Struct
  // Declare a struct type 'File' to use in our mapping
    // Define data type, define attributes
  struct File { 
    uint fileId;
    uint fileHash;
    uint fileSize;
    string fileType;
    string fileName;
    string fileDescription;
    uint uploadTime;
    address payable uploader;
  }

  // Event

  constructor() public {
  }

  // Upload File function
  // We pass the all the attributes



    // How we would hardcode add a file to mapping
    //files[1] = File(1, 'abc123', 1024, 'Foobar', 'Foo bar baz', 23423432, 0x0);



    // Make sure the file hash exists

    // Make sure file type exists

    // Make sure file description exists

    // Make sure file fileName exists

    // Make sure uploader address exists

    // Make sure file size is more than 0


    // Increment file id

    // Add File to the contract

    // Trigger an event

  }



}