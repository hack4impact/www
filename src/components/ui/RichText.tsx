import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS, Document } from '@contentful/rich-text-types'

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
    [MARKS.CODE]: (text) => (
      <code className='bg-gray-100 px-1 rounded text-sm'>{text}</code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className='mb-4 text-lg md:text-xl'>{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_node, children) => (
      <h1 className='text-2xl md:text-3xl font-sans mt-10 mb-6'>{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className='text-xl md:text-2xl font-sans mt-8 mb-4'>{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <h3 className='text-lg md:text-xl font-sans mt-6 mb-3'>{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_node, children) => (
      <h4 className='text-base md:text-lg font-sans mt-4 mb-2'>{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (_node, children) => (
      <h5 className='text-sm md:text-base font-sans mt-4 mb-2'>{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (_node, children) => (
      <h6 className='text-sm font-sans mt-4 mb-2'>{children}</h6>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => (
      <ul className='list-disc pl-6 mb-4 space-y-1'>{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children) => (
      <ol className='list-decimal pl-6 mb-4 space-y-1'>{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node, children) => (
      <li className='text-lg md:text-xl'>{children}</li>
    ),
    [BLOCKS.QUOTE]: (_node, children) => (
      <blockquote className='border-l-4 border-gray-300 pl-4 italic my-4'>
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className='border-t border-gray-300 my-8' />,
    [BLOCKS.TABLE]: (_node, children) => (
      <div className='overflow-x-auto my-4'>
        <table className='min-w-full border-collapse border border-gray-300'>
          <tbody>{children}</tbody>
        </table>
      </div>
    ),
    [BLOCKS.TABLE_ROW]: (_node, children) => <tr>{children}</tr>,
    [BLOCKS.TABLE_CELL]: (_node, children) => (
      <td className='border border-gray-300 px-4 py-2 text-base'>{children}</td>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (_node, children) => (
      <th className='border border-gray-300 px-4 py-2 text-base font-sans bg-gray-50'>
        {children}
      </th>
    ),
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        className='underline text-blue-700 hover:text-blue-900'
        target='_blank'
        rel='noopener noreferrer'
      >
        {children}
      </a>
    ),
  },
}

export function RichText({ document }: { document: Document }) {
  return <>{documentToReactComponents(document, options)}</>
}
