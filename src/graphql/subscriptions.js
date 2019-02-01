// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateGlossaryEntry = `subscription OnCreateGlossaryEntry(
  $id: ID
  $title: String
  $byline: String
  $content: String
) {
  onCreateGlossaryEntry(
    id: $id
    title: $title
    byline: $byline
    content: $content
  ) {
    id
    title
    byline
    content
    ctime
    mtime
  }
}
`;
export const onUpdateGlossaryEntry = `subscription OnUpdateGlossaryEntry(
  $id: ID
  $title: String
  $byline: String
  $content: String
) {
  onUpdateGlossaryEntry(
    id: $id
    title: $title
    byline: $byline
    content: $content
  ) {
    id
    title
    byline
    content
    ctime
    mtime
  }
}
`;
export const onDeleteGlossaryEntry = `subscription OnDeleteGlossaryEntry(
  $id: ID
  $title: String
  $byline: String
  $content: String
) {
  onDeleteGlossaryEntry(
    id: $id
    title: $title
    byline: $byline
    content: $content
  ) {
    id
    title
    byline
    content
    ctime
    mtime
  }
}
`;
