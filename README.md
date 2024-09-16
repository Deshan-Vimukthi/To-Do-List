# 📝 Todo List Web Application

This is a **Todo List** web application built using **React.js**, **HTML**, and **CSS**. The app features user authentication, allowing individual users to create accounts and manage their todo lists. Each user's todos are saved and retrieved from the browser's local storage, ensuring that todos are private and specific to the authenticated user.

## ✨ Features

- 🔐 **User Authentication**: Users can register and log in to the application with their email and password.
- 👤 **User-Specific Todo Lists**: Todos are saved and retrieved separately for each user using local storage based on the authenticated user's email.
- ➕ **Add, Edit, and Delete Todos**: Users can add new todos, edit existing ones, and mark them as complete or delete them.
- 🗃️ **Persistent Storage**: Todos are stored in the browser's local storage, ensuring that users can retrieve their todos even after closing the browser (as long as they are logged in).
- 📱 **Responsive Design**: The application is fully responsive and works across all devices.

## 🛠️ Technologies Used

- **React.js**: JavaScript library for building the user interface.
- **Formik**: For form handling and validation in the authentication system.
- **Yup**: For form validation schema.
- **HTML5**: Markup language for the app's structure.
- **CSS3**: For styling the application.
- **Local Storage**: For saving and retrieving todos based on the logged-in user's email.

## 🚀 How It Works

1. **Authentication**: Users can either register for a new account or log in using their existing credentials. 
2. **Todo Management**: Once logged in, users can:
    - ➕ Add new todos with a title, description, date, start time, and end time.
    - 📝 Edit existing todos.
    - ✔️ Mark todos as complete.
    - ❌ Delete todos.
3. **Local Storage**: Todos are saved in the browser's local storage under a key unique to the authenticated user's email (`todos_<userEmail>`). Each time the user logs in, the app loads the todos saved for that specific user.

## 💻 Installation and Setup

To run this project locally, follow these steps:

### Prerequisites
- **Node.js** installed on your machine.
- **npm** (Node Package Manager) comes with Node.js.

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/todo-list-app.git
   cd todo-list-app

2. **Install dependencies:**:
    npm install
3. **Run the application:**:
    npm start
4. #### Open http://localhost:3000 in your browser to view the application.

## Folder Structure

```
/src
  /components
    /AddToDoForm
        - AddToDo.js       # Form to Add new To-Do item
        - style.css        # Style Sheet of New To-Do item adding Form
    /InputField
        - InputField.js    # Custom input fields for use
        - style.css        #StyleSheet of custom input field
    - AuthForm.js          # Login and Register form
    - AuthFormStyle.css    # Stylesheet of Loging and reister forms
    - Todo.js              # Individual to do tasks
    - TodoList.js          # List of To-Do task
    - style.css            # Stylesheet of Components
  /contexts
    - AuthContext.js       # Authentication context for managing user state
  /pages
    - Todos.js             # Main page displaying todos
    - Login.js             # Login page
    - Register.js          # Register page
    - Style                # Style sheet of Pages
  /Icon
    - index.js             # Awesome 5 Font Icons used on applicatin
  index.js                 # Main entry point
  App.js                   # Application root component and Routers
  App.css                  # Application root stylesheet
```


## Usage
### Register:
    1. Navigate to the Register page to create a new account.
    2. Provide your name, email, and password to sign up.

### Login:
    - Use your registered email and password to log in to the application.

### Manage Todos:
    After logging in, you can add, edit, delete, and mark todos as complete.
    Your todos are automatically saved in your browser's local storage under your account.

## 🤝 Contributing
Contributions are welcome! Feel free to open a pull request or issue if you have suggestions or improvements.

## 📄 License
This project is licensed under the MIT License.


