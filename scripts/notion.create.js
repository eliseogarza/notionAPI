import {Client} from '@notionhq/client';

/* search Notion for a specific object type

apiKey: string (Notion API key)
objectType: string (either "page" or "database")

returns: array of objects (results of the search)
*/
export async function searchNotion(apiKey, objectType){

    const notion = new Client({ auth: apiKey });
    const response = await notion.databases.search({
        "filter": {
            "property": "object",
            "value": objectType
        }
    });

    return response.results;
}


/* create a new Notion database 

apiKey: string (Notion API key)
title: string (title of the database)

returns: string (id of the new database)
*/
export async function createNotion(apiKey, title){
    const notion = new Client({ auth: apiKey });
    const page_response = await notion.pages.create({
        "parent": {
            "type": "workspace"
        },
        "properties": {
            title: [
                {
                type: "text",
                text: {
                    content: "Youtube Videos"
                },
                },
            ],
        }
    });
    const pageId = page_response.id;
    const response = await notion.databases.create({
        "parent": {
            "type":"page_id",
            "database_id": pageId
        },
        properties: {
            // These properties represent columns in the database (i.e. its schema)
            "Video Title": {
              type: "title",
              title: {}
            },
            URL: {
              type: "url",
              url: {}
            },
            "Date Added": {
              type: "date",
              date: {}
            },
          },
    });
    return response.id;
}


/* add a new Notion page to a database
This is where we will add the Youtube video, URL, and date added

apiKey: string (Notion API key)
url: string (URL of the Youtube video)
*/
export async function addNotion(apiKey, database_id, title, url, date_added){
    const notion = new Client({ auth: apiKey });
    const response = await notion.pages.create({
        "parent": {
            "type": "database_id",
            "database_id": database_id
        },
        properties: {
            "Video Title": {
                type: "title",
                title: [
                    {
                        type: "text",
                        text: {
                            content: title
                        }
                    }
                ]
            },
            URL: {
                type: "url",
                url: url
            },
            "Date Added": {
                type: "date",
                date: {
                    start: date_added
                }
            }
        }
    });
}
