import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className="bg-[#764abc] text-white p-4 shadow-md">
      <section className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Redux Essentials Example</h1>

        <div className="flex space-x-4">
          <Link
            to="/"
            className="bg-[#481499] hover:bg-[#926bcf] text-white px-4 py-2 rounded-md font-semibold transition-colors"
          >
            Posts
          </Link>
        </div>
      </section>
    </nav>
  )
}
