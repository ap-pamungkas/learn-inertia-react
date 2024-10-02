import Pagination from "@/Components/Pagination";

import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import {
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants.JSX";

import {Link , router} from "@inertiajs/react";
export default function TaskTable({tasks, queryParams}){

    const searchFieldChanged = (name, value) => {
        if (value) {
          queryParams[name] = value;
        } else {
          delete queryParams[name];
        }
    
        router.get(route("task.index"), queryParams, { preserveState: true });
      };
    
    const sortChanged = (name) => {
        if (name === queryParams.sort_field)
          queryParams.sort_direction =
            queryParams.sort_direction === "asc" ? "desc" : "asc";
        else {
          queryParams.sort_field = name;
          queryParams.sort_direction = "asc";
        }
        router.get(route("task.index"), queryParams, { preserveState: true });
      };
    return (
        <>
        
        <div className="text-xs  text-gray-700 uppercase bg-gray-50 ">
                <tr className="text-nowrap">
                  <th className=" px-3 py-3"></th>
                  <th className="px-3   py-3"></th>
                  <th className="px-3   py-3">
                    <TextInput
                      defaultValue={queryParams.name}
                      className="w-full"
                      placeholder="task name"
                      onChange={(e) =>
                        searchFieldChanged("name", e.target.value)
                      }
                    />
                  </th>
                  <th className="px-4   py-3">
                    <SelectInput
                      defaultValue={queryParams.status}
                      className="w-[10rem] relative py-3 px-4"
                      placeholder="Select Status"
                      onChange={(e) =>
                        searchFieldChanged("status", e.target.value)
                      }
                    >
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </SelectInput>
                  </th>
                  <th className="px-3   py-3"> </th>
                  <th className="px-3   py-3"> </th>
                  <th className="px-3   py-3"></th>
                  <th className="px-3   py-3 text-right"></th>
                </tr>
              </div>
         <div className="overflow-auto">
             <table className="overflow-scroll w-full  table-auto text-sm text-gray-500 border-collapse border border-slate-400 dark:text-gray-400 rtl:text-right ltr:text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr className="text-nowrap ">
                    <TableHeading
                      name="id"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      ID
                    </TableHeading>
                    <th className="px-3 border border-slate-300  py-3">
                      Image
                    </th>
                    <TableHeading
                      name="name"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Name
                    </TableHeading>
                    <TableHeading
                      name="status"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Status
                    </TableHeading>
                    <TableHeading
                      name="created_at"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Create Date
                    </TableHeading>
                    <th className="px-3 border border-slate-300  py-3">
                      Create By
                    </th>
                    <TableHeading
                      name="due_date"
                      sort_field={queryParams.sort_field}
                      sort_direction={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    >
                      Due Date
                    </TableHeading>

                    <th className="px-3 border border-slate-300   py-3 text-right">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.data.map((task, key) => (
                    <tr key={key} className="bg-white border-b ">
                      <td className="px-3  border border-slate-300  py-2">
                        {task.id}
                      </td>
                      <td className="px-3  border border-slate-300  py-2">
                        <center>
                          <img
                            src={task.image_path}
                            className="w-[30%] h-auto"
                          />
                        </center>
                      </td>
                      <td className=" border border-slate-300  text-nowrap px-3 py-2">
                        {task.name}
                      </td>

                      <td className="border border-slate-300  text-nowrap px-3 py-2">
                        <center>
                          <span
                            className={`px-2 py-1 rounded dark:text-white ${
                              TASK_STATUS_CLASS_MAP[task.status]
                            }`}
                          >
                            {TASK_STATUS_TEXT_MAP[task.status]}
                          </span>
                        </center>
                      </td>

                      <td className="border border-slate-300  px-3 py-2">
                        {task.created_at}
                      </td>
                      <td className="border border-slate-300  px-3 py-2">
                        {task.created_by.name}
                      </td>
                      <td className="border border-slate-300  text-nowrappx-3 py-2">
                        {task.due_date}
                      </td>

                      <td className="border border-slate-300  p-2 ">
                        <center>
                          <Link
                            href={route("task.edit", task.id)}
                            className="text-yellow-500 hover:text-yellow-700  mr-1 border border-yellow-500 hover:border-yellow-700 px-2 py-1 rounded-md"
                          >
                            Edit
                          </Link>
                          <Link
                            href={route("task.destroy", task.id)}
                            className="text-red-500 hover:text-red-700 border border-red-500 hover:border-red-700 px-2 py-1 rounded-md"
                          >
                            Delete
                          </Link>
                        </center>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
             </div>

              {tasks.meta && <Pagination links={tasks.meta.links} />}
        </>
    )
}