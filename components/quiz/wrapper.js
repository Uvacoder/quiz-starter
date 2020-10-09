export default function Wrapper({children}) {
  return (
    <div className="grid grid-cols-5 w-full max-w-screen-lg">{children}</div>
  )
}
