import ReactMarkdown from 'react-markdown'

export default function Markdown({children, className}) {
  return (
    <ReactMarkdown
      source={children}
      escapeHtml={false}
      className={`markdown-body ${className}`}
    />
  )
}
