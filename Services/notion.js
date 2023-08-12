require('dotenv').config()
const { Client } = require('@notionhq/client')

// Init client
const notion = new Client({
  auth: 'secret_QmXiYpRxYTbiSSbc8boHg940k7zRfDeVPku6ACQ2KDJ',
})

const database_id = '9a710b84bf874ae0ab1fa2c64e062c9c'

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