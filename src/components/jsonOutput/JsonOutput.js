// src/components/JsonOutput/JsonOutput.js
import React from 'react';
import { Grid, Button, Paper } from '@mui/material';
import './JsonOutput.css';

const JsonOutput = ({ jsonArray, editJson, deleteJson, importJsonFile, exportJsonFile }) => {
  return (
    <Paper className="json-output-container">
      <h2>JSON Output</h2>
      {/* Import and Export buttons at the top */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <input
            accept="application/json"
            style={{ display: 'none' }}
            id="contained-button-file"
            type="file"
            onChange={importJsonFile}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Importer JSON
            </Button>
          </label>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={exportJsonFile}>
            Eksporter JSON
          </Button>
        </Grid>
      </Grid>
      {/* JSON data display */}
      {jsonArray.length > 0 ? (
        jsonArray.map((json, index) => (
          <div key={index} className="json-container">
            <pre style={{ padding: 10 }}>
              <strong>JSON {index + 1}</strong>: {JSON.stringify(json, null, 2)}
            </pre>
            <Grid container spacing={1} justifyContent="center">
              <Grid item>
                <Button variant="outlined" onClick={() => editJson(index)}>
                  Rediger
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={() => deleteJson(index)}>
                  Slet
                </Button>
              </Grid>
            </Grid>
          </div>
        ))
      ) : (
        <p>Ingen data tilføjet endnu.</p>
      )}
    </Paper>
  );
};

export default JsonOutput;
