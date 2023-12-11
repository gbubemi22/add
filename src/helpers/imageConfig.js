import {
  StorageSharedKeyCredential,
  BlobServiceClient,
} from "@azure/storage-blob";
import config from "../config/configSetup.js";

const accountName = config.AZURE_ACCT_NAME;
const accountKey = config.AZURE_ACCT_KEY;

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  new StorageSharedKeyCredential(accountName, accountKey)
);

const containerName = config.AZURE_CONTAINER_NAME;
export const containerClient =
  blobServiceClient.getContainerClient(containerName);
