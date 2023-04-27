import express from "express";
import { Configuration, OpenAIApi } from "openai";

const app = express();


const messages = [
  {role: "user", content: "Say this is a test!"},
]

//Health Check
app.get('/', (req, res) => {
  res.status(200).send('Live');
}) 

//Chat Completion
app.post('/smart/go', async (req, res) => {
  var message ="";


  // config open ai
  const configuration = new Configuration({
    organization: "org-df7OMj3TagBeqN9JXhzo5Y6E",
    apiKey: "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",
});

  try{
    const openai = new OpenAIApi(configuration);
    //const response = await openai.listEngines();
   const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature:1,
      max_tokens:10,
    });
    //console.log(response.data.choices.message.content)
    message = JSON.stringify(response.data.choices[0].message.content) 
  }
  catch (error){
    console.error(error);
  }
 

  //intent.push(req.body)
  res.status(200).json(message)
})

//Fine-Tune
app.post('/smart/fine-tune/me', async (req, res) => {
  var message ="";


  // config open ai
  const configuration = new Configuration({
    organization: "org-df7OMj3TagBeqN9JXhzo5Y6E",
    apiKey: "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",
});

  try{
    const openai = new OpenAIApi(configuration);
    //const response = await openai.listEngines();
    const response = await openai.createFineTune({
    training_file: "",
    model: 'davinci:ft-personal-2023-03-31-01-09-15'
  });
  message = "Deu Certo"
  console.log(response)
  }
  catch (error){
    console.error(error.response.data.error);
  }
 

  //intent.push(req.body)
  res.status(200).json(message)
})

//Train
app.post('/smart/train/me', async (req, res) => {
  var message ="";

  // config open ai
  const configuration = new Configuration({
    organization: "org-df7OMj3TagBeqN9JXhzo5Y6E",
    apiKey: "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",
});

  try{
  const openai = new OpenAIApi(configuration);
  //const response = await openai.listEngines();

  const response = await openai.createFile({
    purpose :"fine-tune",
    file:""
  })

  message = "Deu Certo"
  console.log(response)
  }
  catch (error){
    console.error(error.response.data.error);
  }
 

  //intent.push(req.body)
  res.status(200).json(message)
})

//Train Data

export default app