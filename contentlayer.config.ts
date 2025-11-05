import { defineDocumentType, makeSource } from 'contentlayer/source-files'

// This configuration tells Contentlayer how to process MDX files in the
// `app/legal` directory.  Each MDX page becomes a `LegalDoc` document.

export const LegalDoc = defineDocumentType(() => ({
  name: 'LegalDoc',
  filePathPattern: `legal/**/page.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: false }
  }
}))

export default makeSource({
  contentDirPath: 'app',
  documentTypes: [LegalDoc]
})