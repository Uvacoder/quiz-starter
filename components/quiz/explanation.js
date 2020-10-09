import Markdown from '@/components/quiz/markdown'

export default function Explanation({children}) {
  return (
    <div className="my-4 markdown-body bg-orange-100 p-8 rounded-md">
      <span className="block pb-3 font-bold" role="img" aria-label="bulb">
        💡 Explanation
      </span>
      <Markdown>{children}</Markdown>
    </div>
  )
}
