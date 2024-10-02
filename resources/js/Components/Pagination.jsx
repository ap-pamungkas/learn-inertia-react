import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
  return (
    <nav className="text-center mt-4">
      {links.map((link) => (
        <Link 
        preserveScroll
        
          key={link.label} 
          href={link.url || ""} 
          className={
            `inline-block py-2 px-3 rounded-md text-gray-400 text-xs ${ link.active ? 'bg-gray-950' : ''} ${link.url === null ? 'cursor-not-allowed' : '' })`
          }
          dangerouslySetInnerHTML={{ __html: link.label }}
        ></Link>
      ))}
    </nav>
  );
}