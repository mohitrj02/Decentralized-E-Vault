import { useEffect, useState } from 'react';
import { useWallet } from '../../Wallet/Wallet'; // Ensure this path is correct

const useFileData = () => {
  const { contract, account } = useWallet(); // Use wallet context
  const [allFiles, setAllFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      if (contract && account) {
        try {
          setLoadingFiles(true);
          const fetchedFiles = await contract.getAllFilesByUser(account);
          setAllFiles(fetchedFiles);
        } catch (error) {
          console.error('Error fetching files:', error);
        } finally {
          setLoadingFiles(false);
        }
      }
    };

    fetchFiles();
  }, [contract, account]);

  return { allFiles, loadingFiles };
};

export default useFileData;
