import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
  });

  onsubmit = (e) => {
    e.preventDefault();
    post(route("project.store"));
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Create New Project
          </h2>
        </div>
      }
    >
      <Head title="Project" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <form
              action=""
              onSubmit={onsubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
              method="post"
            >
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_image_path"
                  value="Project Image"
                />
                <TextInput
                  id="project_image_path"
                  type="file"
                  name="image"
                  value={data.image}
                  className="mt-1 block w-full  border border-slate-500"
                  isFocused={true}
                  onChange={(e) => setData("image", e.target.value)}
                />

                <InputError message={errors.image} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="project_name" value="Project Name" />
                <TextInput
                  id="project_name"
                  type="text"
                  name="project_name"
                  value={data.name}
                  className="mt-1 block w-full  border border-slate-500"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="project_description" value="Description" />
                <TextAreaInput
                  id="project_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full  border border-slate-500"
                  isFocused={true}
                  onChange={(e) => setData("description", e.target.value)}
                ></TextAreaInput>

                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="project_due_date" value="Project Deadline" />
                <TextInput
                  id="project_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full  border border-slate-500"
                  isFocused={true}
                  onChange={(e) => setData("due_date", e.target.value)}
                  
                />

                <InputError message={errors.due_date} className="mt-2" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
