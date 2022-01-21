pragma solidity ^0.5.0;

contract DStorage {

  // State variable
  string public name = 'DStorage';

  uint public fileCount = 0;

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
  event FileUploaded(
    uint fileId,
    string fileHash,
    uint fileSize,
    string fileType,
    string fileName, 
    string fileDescription,
    uint uploadTime,
    address payable uploader
  );


  constructor() public {

  }

  // Upload File function
  // We pass the all the attributes
  // Why dont we pass fileID, uploadTime, uploader ❓
  function uploadFile(string memory _fileHash, uint _fileSize, string memory _fileType, string memory _fileName, string memory _fileDescription) public {

    // Add requirements for file uploads to ensure app doesn't break
    // Make sure the file hash exists
      // Convert fileHash from string to bytes, read length
    require(bytes(_fileHash).length > 0);
    // Make sure file type exists
    require(bytes(_fileType).length > 0);
    // Make sure file description exists
    require(bytes(_fileDescription).length > 0);
    // Make sure file fileName exists
    require(bytes(_fileName).length > 0);
    // Make sure uploader address exists
      // "Msg sender address is NOT equal to a zero address"
    require(msg.sender!=address(0));
    // Make sure file size is more than 0
    require(_fileSize>0);


    // Increment file id
      // fileCount = fileCount +1;
    fileCount ++;

    // Add File to the contract
    // How we would hardcode uploadFile() to mapping
      //files[1] = File(1, 'abc123', 1024, 'Foobar', 'Foo bar baz', 23423432, 0x0);
    // Use 'now' for 'uploadTime' to generate a timestamp 
    // Use 'msg.sender' (global var representing the user address) for 'uploader'
    // Use Counter catch(cache?) instead of hardcoded number for fileId
      // This way we use the fileCount as an Id management system
      // If we left the Id hardcoded with 1 we would just create a new file with fileId 1 everytime
      // With the counter, everytime we call this function the fileId will increment up
      // Declare uint fileCount with default value of 0 in state
      // Declare fileCount ++ above, because the first time we run through this function we want the fileCount to be 1 (from default 0)
    files[fileCount] = File(fileCount, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, now, 0x0);

    // Trigger the event above to tell out clientside anytime a file is uploaded
    emit FileUploaded(fileCount, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, now, msg.sender);

  }

}