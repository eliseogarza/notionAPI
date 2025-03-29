import { searchNotion } from "./notion.create.js";
import { createNotion } from "./notion.create.js";
import { addNotion } from "./notion.create.js";

export async function search(apiKey, objectType) {
    let results = await searchNotion(apiKey, objectType);
    let array = [];

    for (i=0; results.length; i++) {
        array.push([results[i].id, results[i].properties.Name.title[0].plain_text]);
    }
    return array;
}
