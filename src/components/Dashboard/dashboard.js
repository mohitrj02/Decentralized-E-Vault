import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Grid, Card, CardContent, Typography, Button, TextField, IconButton, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AppBar, Toolbar,
  CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import {
  Upload as UploadIcon, Share as ShareIcon, Search as SearchIcon, AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import Logout from '../Logout/logout'; // Ensure this path is correct
import useFileData from './dashcomponents/useFileData'; // Import the custom hook
import Upload from './Upload/upload'; // Import the Upload component
import { useWallet } from '../Wallet/Wallet'; // Adjust path if necessary

const useStyles = makeStyles({
  root: {
    padding: '20px',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  },
  card: {
    minWidth: 275,
    margin: '10px',
    backgroundColor: '#ffffff',
    color: '#333333',
    borderRadius: 12,
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  cardHeader: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '15px',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    fontWeight: 600,
  },
  cardContent: {
    padding: '20px',
  },
  button: {
    backgroundColor: '#0056b3',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#003d7a',
    },
    marginTop: '10px',
  },
  table: {
    minWidth: 650,
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
    color: '#333333',
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#ffffff',
    },
  },
  tableCell: {
    color: '#333333',
  },
  header: {
    marginBottom: 20,
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: 15,
  },
  headerButton: {
    marginRight: 10,
    backgroundColor: '#0056b3',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#003d7a',
    },
  },
  searchField: {
    marginRight: 10,
    backgroundColor: '#ffffff',
  },
  userIcon: {
    marginRight: 10,
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { account, connectMetaMask } = useWallet();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const { allFiles, loadingFiles } = useFileData();

  useEffect(() => {
    axios.get('http://localhost:5000/api/protected/dashboard', { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setIsAuthenticated(false);
        navigate('/log-in');
      });
  }, [navigate]);

  if (!isAuthenticated) {
    return <CircularProgress />;
  }

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const filteredFiles = allFiles.filter(file => file.fileName.toLowerCase().includes(searchQuery.toLowerCase()));

  // Placeholder data for recently shared and recently uploaded files
  const recentlyShared = [
    { fileName: 'File1.pdf', sharedWith: 'User1', sharedOn: '2024-07-30' },
    { fileName: 'File2.docx', sharedWith: 'User2', sharedOn: '2024-07-29' },
  ];

  const recentlyUploaded = [
    { fileName: 'File3.pdf', uploadedOn: '2024-07-31', size: '15MB' },
    { fileName: 'File4.mp4', uploadedOn: '2024-07-30', size: '200MB' },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button
              variant="contained"
              className={classes.headerButton}
              startIcon={<UploadIcon />}
              onClick={handleOpenDialog}
            >
              Upload
            </Button>
            <Button
              variant="contained"
              className={classes.headerButton}
              startIcon={<ShareIcon />}
            >
              Share
            </Button>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
              className={classes.searchField}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton aria-label="user profile" className={classes.userIcon}>
              <AccountCircleIcon />
            </IconButton>
            <Logout />
            <Button
              variant="contained"
              className={classes.headerButton}
              onClick={connectMetaMask}
            >
              {account ? `Connected: ${account.slice(0, 6)}...` : 'Connect MetaMask'}
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3}>
        {/* File Explorer Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.cardHeader} variant="h6" gutterBottom>
                File Explorer
              </Typography>
              <Typography>Manage your files</Typography>
              <Button variant="contained" className={classes.button}>
                Manage Files
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Storage Size Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.cardHeader} variant="h6" gutterBottom>
                Storage Size
              </Typography>
              <Typography>120 GB</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Number of Uploaded Files Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.cardHeader} variant="h6" gutterBottom>
                Uploaded Files
              </Typography>
              <Typography>{allFiles.length} files</Typography>
              <Typography>Last Activity: 2024-07-31</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recently Shared Files Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.cardHeader} variant="h6" gutterBottom>
                Recently Shared
              </Typography>
              {recentlyShared.map((item, index) => (
                <Typography key={index}>
                  {item.fileName} - Shared with {item.sharedWith} on {item.sharedOn}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Recently Uploaded Files Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.cardHeader} variant="h6" gutterBottom>
                Recently Uploaded
              </Typography>
              {recentlyUploaded.map((item, index) => (
                <Typography key={index}>
                  {item.fileName} - Uploaded on {item.uploadedOn} ({item.size})
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* File Table */}
        <Grid item xs={12}>
          <Paper>
            <TableContainer>
              <Table className={classes.table}>
                <TableHead className={classes.tableHeader}>
                  <TableRow>
                    <TableCell>File Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Hash (CID)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadingFiles ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredFiles.map((file, index) => (
                      <TableRow key={index} className={classes.tableRow}>
                        <TableCell className={classes.tableCell}>{file.fileName}</TableCell>
                        <TableCell className={classes.tableCell}>{file.fileType}</TableCell>
                        <TableCell className={classes.tableCell}>{file.fileHash}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Upload Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <Upload onUploadSuccess={handleCloseDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
