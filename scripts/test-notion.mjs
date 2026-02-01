import { config } from 'dotenv'
import { Client } from '@notionhq/client'

config()

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const PROJECTS_DATA_SOURCE_ID = '27b197ab-f07b-80cf-8d0e-000b8507cb8f'

try {
  const response = await notion.dataSources.query({
    data_source_id: PROJECTS_DATA_SOURCE_ID,
  })

  const first = response.results[0]
  if (first) {
    console.log('=== Property names ===')
    console.log(Object.keys(first.properties).join('\n'))
    console.log('\n=== Full properties for first project ===')
    console.log(JSON.stringify(first.properties, null, 2))
  } else {
    console.log('No results returned')
  }
  console.log('\n=== Total results:', response.results.length, '===')
  console.log('has_more:', response.has_more)
} catch (error) {
  console.error('Error:', error)
}
