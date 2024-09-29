import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <nav className="text-sm pb-5 font-medium" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <a href="#" className="text-gray-500 hover:text-gray-700">
            Home
          </a>
          <svg
            className="mx-2 h-4 w-4 fill-current text-gray-500"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.555 8.89a1 1 0 0 0 0 1.415L9.95 14l-4.394 4.395a1 1 0 0 0 0 1.414 1 1 0 0 0 1.415 0l5.657-5.657a1 1 0 0 0 0-1.414L6.97 5.475a1 1 0 0 0-1.415 0 1 1 0 0 0 0 1.415L9.95 14l-4.395-4.395a1 1 0 0 0-1.415 0z"></path>
          </svg>
        </li>
        <li className="flex items-center">
          <a href="#" className="text-gray-500 hover:text-gray-700">
           {pageName}
          </a>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
