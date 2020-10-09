export default function Continue({onClick, isDisabled}) {
  return (
    <button
      className="mt-4 px-3 py-2 rounded-md bg-gray-900 text-white"
      type="button"
      onClick={onClick}
      disabled={isDisabled}
    >
      Continue
    </button>
  )
}
