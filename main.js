const { ethers } = require("ethers");

const ABI = [
  "function getKnowledgeCollection(uint256 id) external view returns (tuple((address publisher, bytes32 merkleRoot, uint256 timestamp)[] merkleRoots, uint256[] burned, uint256 minted, uint88 byteSize, uint40 startEpoch, uint40 endEpoch, uint96 tokenAmount, bool isImmutable))",
];

const RPC_URL = "https://astrosat.origintrail.network";

const CONTRACT_ADDRESS = "0x8f678eB0E57ee8A109B295710E23076fA3a443fe";

async function main() {
  try {
    const id = process.argv[2];
    if (!id) {
      console.error(
        "Please provide a Knowledge Collection ID, e.g. `node getKnowledgeCollection.js 1`"
      );
      process.exit(1);
    }

    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    const knowledgeCollectionStorage = new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      provider
    );

    const knowledgeCollection =
      await knowledgeCollectionStorage.getKnowledgeCollection(id);

    console.log(`Knowledge Collection data for ID ${id}:`);
    console.log("-----------------------------------------------------");
    // console.log("Merkle Roots:");
    // knowledgeCollection.merkleRoots.forEach((mr, idx) => {
    //   console.log(`  #${idx + 1}`);
    //   console.log(`    Publisher: ${mr.publisher}`);
    //   console.log(`    MerkleRoot: ${mr.merkleRoot}`);
    //   console.log(`    Timestamp: ${mr.timestamp}`);
    // });

    console.log("\nBurned token IDs:", knowledgeCollection.burned);
    console.log("Minted:", knowledgeCollection.minted.toString());
    console.log("Byte Size:", knowledgeCollection.byteSize.toString());
    console.log("Start Epoch:", knowledgeCollection.startEpoch);
    console.log("End Epoch:", knowledgeCollection.endEpoch);
    console.log(
      "Token Amount:",
      ethers.utils.formatEther(knowledgeCollection.tokenAmount)
    );
    // console.log("Is Immutable:", knowledgeCollection.isImmutable);
  } catch (error) {
    console.error("Error calling getKnowledgeCollection:", error);
    process.exit(1);
  }
}

// 10. Execute the script
main();
