import fs from "fs"
import express from "express";
import { Configuration, OpenAIApi } from "openai";

const app = express();
app.use(express.json());


const messages = [
  {role: "user", content: "What is Lens Protocol"},
]

//Health Check[0]
app.get('/', (req, res) => {
  res.status(200).send('Live');
}) 

//Train [1]
app.post('/smart/train/me', async (req, res) => {
  var message ="";
  var id = "";

  // config open ai
  const configuration = new Configuration({
    organization: "",
    apiKey: "",
  });

try{
	const openai = new OpenAIApi(configuration);
	//const response = await openai.listEngines();

	const response = await openai.createFile(
		fs.createReadStream('/Users/nayara/Documents/Testes/PoC/api-chat-cgp-go/data_prepared.jsonl'),
		'fine-tune');

		message = "Deu Certo";
		id = response.data.id;

	await openai.createFineTune({
		training_file: id,
		model: 'davinci'
	});
	
	console.log(id)
	}
  catch (error){
    console.error(error.response.data.error);
  }
  //intent.push(req.body)
  res.status(200).json(message)
})

//Chat Completion [2]
app.post('/smart/go', async (req, res) => {
  var message ="";
  console.log(req.body)

  // config open ai
  const configuration = new Configuration({
    organization: "",
    apiKey: "",
});

  try{
    const openai = new OpenAIApi(configuration);
    //const response = await openai.listEngines(); Chat davinci:ft-personal-2023-03-31-01-09-15
   const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: req.body.message,
      temperature:1,
      max_tokens:10,
    });
    //console.log(response.data.choices.message.content)
    message = JSON.stringify(response.data.choices[0].text) 
  }
  catch (error){
    console.error(error);
  }
 

  //intent.push(req.body)
  res.status(200).json(message)
})

//Fine-Tune[3] - optional
app.post('/smart/fine-tune/me', async (req, res) => {
  var message ="";


  // config open ai
  const configuration = new Configuration({
    organization: "",
    apiKey: "",
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

export default app