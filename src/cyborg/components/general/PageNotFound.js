export default function PageNotFound({
  children,
  onOutsideClick,
  additionalClasses,
}) {
  //alignment should be either 'items-center' or undefined, this will be better with ts
  return (
    <div className="fixed bg-cb-gray-700 text-white backdrop-blur-lg bg-opacity-5 h-full w-full left-0 top-0 z-50 grid justify-center items-center">
      <div>
        <h1>Error 404</h1>
        <h3>This Page does not exist.</h3>
      </div>
    </div>
  )
}
