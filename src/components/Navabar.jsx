import Link from "next/link"

const Navabar = () => {
  return (
<nav className="bg-white top-0 fixed z-30 w-full border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div className="w-full flex items-center justify-center" id="navbar-default">
      <ul className="font-medium flex p-0 bg-white">
        <li className="mx-10">
          <Link href="/addData" className="block py-2 px-3 hover:text-blue-500 rounded md:bg-transparent md:p-0">Add Data</Link>
        </li>
        <li>
          <Link href="/getData" className="block py-2 px-3 hover:text-blue-500 rounded md:bg-transparent md:p-0">Get Data</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navabar