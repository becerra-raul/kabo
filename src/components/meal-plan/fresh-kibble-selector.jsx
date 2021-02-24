export default function FreshOrKibble({
  setKibble,
  setFresh,
  showKibble,
  showCooked,
  extraClasses
}) {
  const handleKibble = (status) => {
    setKibble(status)
  }
  const handleCooked = (status) => {
    setFresh(status)
  }

  return (
    <div className={`rounded overflow-hidden flex h-7 lg:mb-7 border border-gray-200 ${extraClasses}`}>
      <div
        onClick={() => {
          handleKibble(true)
          handleCooked(true)
        }}
        className={`text-sm sm:text-base inline-flex cursor-pointer justify-center items-center ${showCooked && showKibble ? 'bg-primary text-white' : 'bg-white text-charcoal'} w-1/2`}
      >
        All Recipes
      </div>
      <div
        onClick={() => {
          handleKibble(false)
          handleCooked(true)
        }}
        className={`text-sm sm:text-base inline-flex cursor-pointer justify-center items-center ${showCooked && !showKibble ? 'bg-primary text-white' : 'bg-white text-charcoal'} w-1/2`}
      >
        Fresh Food Only
      </div>
      <div
        onClick={() => {
          handleKibble(true)
          handleCooked(false)
        }}
        className={`text-sm sm:text-base inline-flex cursor-pointer justify-center items-center ${showKibble && !showCooked ? 'bg-primary text-white' : 'bg-white text-charcoal'} w-1/2`}
      >
        Kibble Only
      </div>
    </div>
  )
}
