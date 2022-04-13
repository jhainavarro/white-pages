# White Pages

View and manage your employee directory!

---

## Tech Stack / Libraries

- [TypeScript](https://www.typescriptlang.org/)
- [React (create-react-app)](https://create-react-app.dev/)
- [Mantine](https://mantine.dev/)
- [React Router](https://reactrouter.com/)
- [React Query](https://react-query.tanstack.com/)
- [React Table](https://react-table.tanstack.com/)

---

## Sample Screens

|                        |                                                                         |
| ---------------------- | ----------------------------------------------------------------------- |
| Homepage               | ![wp-view-home](https://i.ibb.co/0rGxNF6/view-home.png)                 |
| View employees         | ![wp-view-emps](https://i.ibb.co/5R55n2W/view-employees.png)            |
| Add employee record    | ![wp-add-emps](https://i.ibb.co/8gtdKxY/add-employee.png)               |
| Save employee record   | ![wp-save-emps](https://i.ibb.co/GCNRTsg/edit-employee.png)             |
| Delete employee record | ![wp-delete-emps](https://i.ibb.co/tQgSzkZ/confirm-delete-employee.png) |
| View jobs              | ![wp-view-jobs](https://i.ibb.co/CnKjFFx/view-jobs.png)                 |
| Add job                | ![wp-delete-jobs](https://i.ibb.co/x8hDdmj/add-job.png)                 |
| Save job               | ![wp-save-jobs](https://i.ibb.co/HnWgBct/edit-job.png)                  |
| Delete job             | ![wp-delete-jobs](https://i.ibb.co/ykJ6jXW/confirm-delete-job.png)      |

---

## Features

- View featured employees in a slideshow on the homepage
  - Hovering over a slide will highlight the employee row in the table below
- Add, edit, and delete employees on the Employees page
  - Generate random avatars (from [Dicebear](https://avatars.dicebear.com/) API)
  - Input details such as employee name, hire date, and assigned jobs
  - Option to feature the employee on the homepage
- Add, edit, and delete jobs on the Jobs page
  - Input details such as job name, and job color (for the badge)
  - Check against duplicate job names
  - Only jobs without assigned employees may be deleted

## To Do

- [ ] Scroll employee table row into view on highlight
- [ ] Search and sort tables
- [ ] Multi-delete jobs and employees
- [ ] Move API logic to a separate backend
- [ ] Authentication
- [ ] Linting
- [ ] Component tests
- [ ] Deployment pipeline
- [ ] ...

---

## Development

### Install packages

```console
$ npm install
```

### Windows local development

Please make sure to run `git config --local core.autocrlf false` to prevent `LF will be replaced by CRLF in` errors when doing commits

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run start:build`

Builds the app for production to the `build` folder. \
And serves it locally to [http://localhost:3000](http://localhost:3000).

Does not watch for changes.

Helpful for double checking how the app would behave when built.
