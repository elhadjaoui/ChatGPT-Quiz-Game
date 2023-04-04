const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');
const app = express();
const PORT =  process.env.PORT || 3005;


app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.resolve(__dirname, '../client/build')));

const OpenAI  = require('openai')
const { Configuration, OpenAIApi }   = OpenAI

const configuration = new Configuration({
    organization: "org-wuIGUPjxNzG76JH0FndlxOSb",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.post('/', async (req, res) => {
    console.log(req.body);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.prompt,
        max_tokens: 800,
        temperature: 1,
      });

      
      if (response.data.choices)
      {
        res.json({result : response.data.choices[0].text});
      }
 
});

app.listen(PORT, () => console.log(`app listening on PORT ${PORT}!`))