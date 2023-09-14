require('dotenv').config()
const { Client } = require('@notionhq/client')

// Init client
const notion = new Client({
  auth: process.env.LOGIN_ID,
})

const database_id = process.env.DB_ID

async function getVideos() {
  const payload = {
    path: `databases/${database_id}/query`,
    method: 'POST',
  }
  console.log("results")
  const { results } = await notion.request(payload)
  
  const videos = results.map((page) => {
    return {
      id: page.id,
      title: page.properties.Title.title[0].text.content,
      date: page.properties.Present.checkbox
      
    }
  })
  
  return videos
}
exports.getVideos = getVideos
