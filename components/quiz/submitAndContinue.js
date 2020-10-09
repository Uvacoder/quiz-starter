export default function SubmitAndContinue({
  state,
  handleContinue,
  isDisabled,
  isSubmitting,
}) {
  if (state.matches('answered')) {
    handleContinue()
  }
  return (
    <button
      className="mt-4 px-3 py-2 rounded-md bg-gray-900 text-white"
      type="submit"
      disabled={isDisabled}
    >
      {isSubmitting ? 'Submitting...' : 'Submit and Continue'}
    </button>
  )
}
