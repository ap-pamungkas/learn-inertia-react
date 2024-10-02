import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.JSX";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";


import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, projects, queryParams = null }) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("project.index"), queryParams, { preserveState: true });
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field)
      queryParams.sort_direction =
        queryParams.sort_direction === "asc" ? "desc" : "asc";
    else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("project.index"), queryParams, { preserveState: true });
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Project
          </h2>
          <Link
            href={route("project.create")}
            className="bg-emerald-500 py-1 px-3 rounded shadow text-white transition-all hover:bg-emerald-600"
          >
            Add New
          </Link>
        </div>
      }
    >
      <Head title="Project" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="text-xs  text-gray-700 uppercase bg-gray-50 ">
                <tr className="text-nowrap">
                  <th className=" px-3 py-3"></th>
                  <th className="px-3   py-3"></th>
                  <th className="px-3   py-3">
                    <TextInput
                      defaultValue={queryParams.name}
                      className="w-full"
                      placeholder="Project name"
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
                  {projects.data.map((project, key) => (
                    <tr key={key} className="bg-white border-b ">
                      <td className="px-3  border border-slate-300  py-2">
                        {project.id}
                      </td>
                      <td className="px-3  border border-slate-300  py-2">
                        <center>
                          <img
                            src={project.image_path}
                            className="w-[30%] h-auto"
                          />
                        </center>
                      </td>
                      <td className=" border border-slate-300  text-gray-600 hover:underline text-nowrap px-3 py-2">
                        <Link href={route("project.show", project.id)}>
                          {project.name}
                        </Link>
                      </td>

                      <td className="border border-slate-300  text-nowrap px-3 py-2">
                        <center>
                          <span
                            className={`px-2 py-1 rounded dark:text-white ${
                              PROJECT_STATUS_CLASS_MAP[project.status]
                            }`}
                          >
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                          </span>
                        </center>
                      </td>

                      <td className="border border-slate-300  px-3 py-2">
                        {project.created_at}
                      </td>
                      <td className="border border-slate-300  px-3 py-2">
                        {project.created_by.name}
                      </td>
                      <td className="border border-slate-300  text-nowrappx-3 py-2">
                        {project.due_date}
                      </td>

                      <td className="border border-slate-300  p-2 ">
                        <center>
                          <Link
                            href={route("project.edit", project.id)}
                            className="text-yellow-500 hover:text-yellow-700  mr-1 border border-yellow-500 hover:border-yellow-700 px-2 py-1 rounded-md"
                          >
                            Edit
                          </Link>
                          <Link
                            href={route("project.destroy", project.id)}
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

              {projects.meta && <Pagination links={projects.meta.links} />}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
