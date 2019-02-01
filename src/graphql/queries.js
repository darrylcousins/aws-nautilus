// eslint-disable
// this is an auto generated file. This will be overwritten

export const getGlossaryEntry = `query GetGlossaryEntry($id: ID!, $title: String!) {
  getGlossaryEntry(id: $id, title: $title) {
    id
    title
    byline
    content
    ctime
    mtime
  }
}
`;
export const listGlossaryEntries = `query ListGlossaryEntries(
  $filter: TableGlossaryEntryFilterInput
  $limit: Int
  $nextToken: String
) {
  listGlossaryEntries(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      byline
      content
      ctime
      mtime
    }
    nextToken
  }
}
`;
