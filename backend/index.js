const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.post('/sandbox/create', async (req, res) => {
    try {
      // Extract provider_id from the request body
      const { provider_id } = req.body;
      const products = ["company", "directory", "individual", "employment"]
      
      // Validate the products array
      if (products.includes("payment") || products.includes("pay_statement")) {
        return res.status(400).json({ error: 'Invalid products array' });
      }
  
      // Make sure required parameters are provided
      if (!provider_id || !products || products.length === 0) {
        return res.status(400).json({ error: 'Missing or invalid request parameters' });
      }
  
      // Prepare data for the request to the external API
      const requestData = {
        provider_id,
        products
    };  
      // Make the request to the external API
      const response = await axios.post('https://sandbox.tryfinch.com/api/sandbox/create', requestData, {
        headers: {
          'Content-Type': 'application/json',
            'Finch-API-Version': '2020-09-17'
        }
      });
  
      // Extract response parameters from the external API response
      const { access_token, company_id } = response.data;
      process.env.ACCESS_TOKEN = access_token;
      res.sendStatus(200)
    } catch (error) {
      // Handle errors
      res.status(error.response.status).json(error.response.data);
    }
  });

  app.get('/employer/company', async (req, res) => {
    try {
      // Extract request parameters from the request body
      const access_token = process.env.ACCESS_TOKEN;
      // Make sure required parameters are provided
      if (!access_token) {
        return res.status(400).json({ error: 'Missing or invalid request parameters' });
      }

      const response = await axios.get('https://sandbox.tryfinch.com/api/employer/company', {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
            'Finch-API-Version': '2020-09-17'
        }
      });

      res.json(response.data);
    }
    catch (error) {
      // Handle errors
      res.status(error.response.status).json(error.response.data);
    }
});

app.get('/employer/directory', async (req, res) => {
    try {
      // Extract request parameters from the request body
      const access_token = process.env.ACCESS_TOKEN;
      // Make sure required parameters are provided
      if (!access_token) {
        return res.status(400).json({ error: 'Missing or invalid request parameters' });
      }

      const response = await axios.get('https://sandbox.tryfinch.com/api/employer/directory ', {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
            'Finch-API-Version': '2020-09-17'
        }
      });

      res.json(response.data);
    }
    catch (error) {
      // Handle errors
      res.status(error.response.status).json(error.response.data);
    }
});


app.post('/employer/individual', async (req, res) => {
    try {
      // Extract request parameters from the request body
      const access_token = process.env.ACCESS_TOKEN;
      // Make sure required parameters are provided
      if (!access_token) {
        return res.status(400).json({ error: 'Missing or invalid request parameters' });
      }

      const response = await axios.post('https://sandbox.tryfinch.com/api/employer/individual', req.body, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
            'Finch-API-Version': '2020-09-17'
        }
      });

      res.json(response.data.responses[0].body);
    }
    catch (error) {
      // Handle errors
      res.status(error.response.status).json(error.response.data);
    }
});

app.post('/employer/employment', async (req, res) => {
    try {
      // Extract request parameters from the request body
      const access_token = process.env.ACCESS_TOKEN;
      // Make sure required parameters are provided
      if (!access_token) {
        return res.status(400).json({ error: 'Missing or invalid request parameters' });
      }

      const response = await axios.post('https://sandbox.tryfinch.com/api/employer/employment', req.body, {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
            'Finch-API-Version': '2020-09-17'
        }
      });

      res.json(response.data.responses[0].body);
    }
    catch (error) {
      // Handle errors
      res.status(error.response.status).json(error.response.data);
    }
});


app.listen(8000, () => {console.log("Server is running on port 8000")});