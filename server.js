const express = require('express');
const bodyParser = require('body-parser')

const cors = require('cors');
const app = express();
const port = 3005;


app.use(bodyParser.json());
app.use(cors());



const OpenAI  = require('openai')
const { Configuration, OpenAIApi }   = OpenAI

const configuration = new Configuration({
    organization: "org-wuIGUPjxNzG76JH0FndlxOSb",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

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
    // res.json({message:"helloooooo"})
});

app.listen(port, () => console.log(`app listening on port ${port}!`))