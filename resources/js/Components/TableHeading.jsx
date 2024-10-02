import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
export default function TableHeading({
  sort_field = null,
  name,
  sortTable = true,
  sort_direction = null,
  children,
  sortChanged = () => {},
}) {
  return (
    <th
      onClick={(e) => sortChanged(name)}
      className=" border border-slate-300  px-3 py-3 "
    >
      <div className="flex justify-between cursor-pointer items-center">
        {children}
        {sortTable && (
          <div className="ml-1">
            <ChevronUpIcon
              className={`w-4 ${
                sort_field === name && sort_direction === "asc"
                  ? "text-slate-500"
                  : "text-slate-400"
              }`}
            />
            <ChevronDownIcon
              className={`w-4 -mt-2 ${
                sort_field === name && sort_direction === "desc"
                  ? "text-slate-500"
                  : "text-slate-400"
              }`}
            />
          </div>
        )}
      </div>
    </th>
  );
}
