import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"

import getAllPageIds from "src/libs/utils/notion/getAllPageIds"
import getPageProperties from "src/libs/utils/notion/getPageProperties"
import { TPosts } from "src/types"

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */

// TODO: react query를 사용해서 처음 불러온 뒤로는 해당데이터만 사용하도록 수정
export const getPosts = async () => {
  let ids: string | string[] = CONFIG.notionConfig.pageId;
  ids = ids.split('|')
  const api = new NotionAPI()

  let tempR;
  let collection;
  let schema: any = {};
  let block: any = {};
  const data = []
  for (let i = 0; i < ids.length; i++) {
    tempR = await api.getPage(ids[i]);
    collection = Object.values(tempR.collection)[0]?.value;
    block = tempR.block;
    console.log(ids[i] + '  :  ' + Object.values(block).length)
    schema = collection?.schema;

    ids[i] = idToUuid(ids[i]);
    const rawMetadata = block[ids[i]].value

    if (rawMetadata?.type === "collection_view_page" ||
        rawMetadata?.type === "collection_view") {
      const pageIds = getAllPageIds(tempR);

      for (let j = 0; j < pageIds.length; j++) {
        const id = pageIds[j];
        const properties = (await getPageProperties(id, block, schema)) || null
        // Add fullwidth, createdtime to properties
        properties.createdTime = new Date(
            block[id].value?.created_time
        ).toString()
        properties.fullWidth =
            (block[id].value?.format as any)?.page_full_width ?? false

        data.push(properties)
      }
    }
  }

  // Sort by date
  data.sort((a: any, b: any) => {
    const dateA: any = new Date(a?.date?.start_date || a.createdTime)
    const dateB: any = new Date(b?.date?.start_date || b.createdTime)
    return dateB - dateA
  })

  const posts = data as TPosts
  return posts
}
