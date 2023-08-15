const {getVideos} = require("./Services/notion")
const express= require('express')
const {newRoute, routes} = require("express-quickrouter")
const {authenticate} = require("./Services/Routes/middleware")
const rts = require('./Services/Routes/routes');
const path = require("path");
const app = express();
require('dotenv').config();
app.use(express.static(path.resolve('./public')))
async function f()
{const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "",
  });
  const openai = new OpenAIApi(configuration);
  await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: "Hi",
    temperature: 0,
    max_tokens: 7
  })
  .then((response) => {
    console.log(response.data.choices[0].text);
    console.log({ bot: response.data.choices[0].text });
  })
  .catch((err) => {
    console.log(err)
  })
};
f();
for (let i = 0; i < rts.r.length; i++) {
    app.use(rts.r[i], routes)
}
app.listen(8000)
