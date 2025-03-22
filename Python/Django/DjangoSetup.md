#### Using venv (Built-in):

1.  **Create a Virtual Environment:**

    - Open your terminal.
    - Run:

      `python3 -m venv myenv`

      This creates a folder called `myenv` containing your virtual environment.

2.  **Activate the Environment:**

- **On Windows:**

  `myenv\Scripts\activate`

- **On macOS/Linux:**

  `source myenv/bin/activate`

- Once activated, you'll notice your prompt changes to show the active environment.

3. - **Install Packages:**

   - With your environment active, install packages using pip:

     `pip install numpy pandas`

     - **Deactivate the Environment:**

   - Run:

     `deactivate`

---

# Django Project Setup:

1. `pip install django`

### 2\. Create a New Django Project

Use Django's built-in command-line utility to create a new project. Replace `myproject` with your desired project name.

`django-admin startproject myproject`

This creates a directory called `myproject` with the basic project structure.

---

### 3\. Navigate into Your Project Directory

Change into your project's directory:

`cd myproject`

---

# Django App Setup:

1. Create a Django App

Within your project, you can create one or more apps. Apps are components of your project that encapsulate specific functionality. For example, if you're building a blog, you might create an app named `blog`.

`python manage.py startapp blog`

This command generates a new directory called `blog` with files for models, views, tests, and more.

---

2. Configure Your App

After creating the app, add it to the `INSTALLED_APPS` list in your project's settings. Open `myproject/settings.py` and add `'blog',` to the list. It might look like this:

`INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'blog',  # Added our app here
]`

---

3. Run Migrations

Django uses migrations to manage database changes. Run the initial migrations to set up your database schema:

`python manage.py migrate`

---

4. Start the Development Server

You can now run Django's built-in development server to see your project in action:

`python manage.py runserver`

Open your browser and navigate to http://127.0.0.1:8000/ to see the default Django welcome page.
