import { config } from 'dotenv'
import { Client } from '@notionhq/client'

config()

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const TERMS_DATA_SOURCE_ID = '27c197ab-f07b-8077-8044-000b13443d6e'

try {
  const response = await notion.dataSources.query({
    data_source_id: TERMS_DATA_SOURCE_ID,
  })

  console.log('Total terms:', response.results.length)
  console.log('has_more:', response.has_more)

  for (const page of response.results.slice(0, 5)) {
    console.log('\n--- Term ---')
    console.log('ID:', page.id)
    console.log('Property names:', Object.keys(page.properties).join(', '))
    console.log('Properties:', JSON.stringify(page.properties, null, 2))
  }
} catch (error) {
  console.error('Error:', error)
}
