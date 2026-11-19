# TaskManager

TaskManager is a Laravel application for managing tasks, built with a modern
React and Inertia.js frontend. It includes a dashboard, authentication,
profile settings, and account security features.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Clapper%20Board.png" alt="Clapper Board" width="25" height="25" /> Project Showcase Video <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Movie%20Camera.png" alt="Movie Camera" width="25" height="25" />

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Film%20Frames.png" alt="Film Frames" width="25" height="25" /> [Watch on LinkedIn]()  
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Film%20Frames.png" alt="Film Frames" width="25" height="25" /> [Watch on YouTube]()

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Light%20Bulb.png" alt="Light Bulb" width="25" height="25" /> Features

- **Task Management Foundation**: A Laravel application structured for
  building task workflows and a user dashboard.
- **Modern Web Interface**: React and Inertia.js provide a responsive
  single-page application experience without a separate API.
- **Authentication**: Registration, login, logout, email verification, and
  password reset flows powered by Laravel Fortify.
- **Account Settings**: Profile editing, password changes, and appearance
  preferences for authenticated users.
- **Security**: Two-factor authentication, passkeys, password confirmation,
  and rate-limited authentication actions.
- **Developer Experience**: TypeScript, Tailwind CSS, reusable UI components,
  automated tests, linting, and static analysis.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Gear.png" alt="Gear" width="25" height="25" /> Tech Stack

<table align="center" style="width:100%; border-collapse: collapse; text-align: center;">
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Window.png" alt="Window" width="25" height="25" /> Frontend</td>
    <td align="center"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/X-Ray.png" alt="X-Ray" width="25" height="25" /> Backend</td>
    <td align="center">    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Locked%20with%20Key.png" alt="Locked with Key" width="25" height="25" />Authentication</td>
    <td align="center"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Bar%20Chart.png" alt="Bar Chart" width="25" height="25" /> Quality</td>
  </tr>
  <tr>
    <td align="center"><img src="https://skillicons.dev/icons?i=react" align="center"><br/>+<br/><img src="https://skillicons.dev/icons?i=tailwind" align="center"></td>
    <td align="center"><img src="https://skillicons.dev/icons?i=php" align="center"><br/>+<br/><img src="https://skillicons.dev/icons?i=laravel" align="center"></td>
    <td align="center"><img src="https://skillicons.dev/icons?i=laravel" align="center"><br/>Fortify + Passkeys</td>
    <td align="center"><img src="https://skillicons.dev/icons?i=php,typescript" align="center"><br/>PHPUnit + Larastan</td>
  </tr>
</table>

- **Backend**: PHP 8.3+ and Laravel 13
- **Frontend**: React 19, TypeScript, Inertia.js, and Vite Plus
- **Styling**: Tailwind CSS 4 and Radix UI
- **Authentication**: Laravel Fortify with two-factor authentication and
  passkeys
- **Database**: SQLite by default, with Laravel migrations
- **Testing**: PHPUnit, Laravel Pint, and Larastan

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/File%20Folder.png" alt="File Folder" width="25" height="25" /> Project Structure

```text
TaskManager/
├── app/
│   ├── Actions/Fortify/       # Authentication actions
│   ├── Http/                  # Controllers, middleware, and requests
│   ├── Models/                # Eloquent models
│   └── Providers/             # Application and Fortify configuration
├── database/
│   ├── factories/             # Model factories
│   ├── migrations/            # Database schema
│   └── seeders/               # Database seeders
├── resources/
│   ├── css/                   # Application styles
│   ├── js/                    # React components, layouts, and pages
│   └── views/                 # Blade views
├── routes/                    # Web, settings, and console routes
├── tests/                     # Feature and unit tests
├── composer.json              # PHP dependencies and scripts
└── package.json               # JavaScript dependencies and scripts
```

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd TaskManager
   ```

2. **Install Dependencies and Configure the Application**:

   ```bash
   composer run setup
   ```

   This installs PHP and JavaScript dependencies, creates `.env`, generates
   the application key, runs migrations, and builds the frontend assets.

3. **Run the Development Environment**:

   ```bash
   composer run dev
   ```

   Access the application at `http://localhost:8000`.

### Manual setup with XAMPP (MySQL)

```bash
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate
npm install
npm run build
```

On macOS or Linux, use `cp .env.example .env` instead of the Windows `copy`
command.

#### Configure XAMPP and phpMyAdmin

1. Install XAMPP and open the **XAMPP Control Panel**.
2. Start **Apache** and **MySQL**. The app only needs MySQL; Apache is not
   required when using `php artisan serve`.
3. Open `http://localhost/phpmyadmin`.
4. Select **New**, create a database named `task_manager`, and choose
   `utf8mb4_general_ci` (or any UTF-8 collation).
5. In the project root, open `.env` and use these values:

   ```dotenv
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=task_manager
   DB_USERNAME=root
   DB_PASSWORD=
   ```

   The default XAMPP MySQL installation commonly has an empty `root`
   password. If you configured a password, put it in `DB_PASSWORD`.
6. From the project folder run:

   ```bash
   php artisan config:clear
   php artisan migrate
   npm run build
   php artisan serve
   ```

   Then visit `http://localhost:8000`, register a user, and create tasks from
   the dashboard. The migrations create the `users`, `tasks`, sessions, cache,
   and queue tables in `task_manager`; do not create those tables manually in
   phpMyAdmin.

If MySQL uses a different port, replace `3306` in `.env` with the port shown
next to MySQL in XAMPP. If Laravel reports that `pdo_mysql` is missing, enable
the `extension=pdo_mysql` line in the PHP `php.ini` used by the terminal, then
restart the terminal and run `php artisan migrate` again.

## Development Commands

```bash
# Start the Laravel development environment
composer run dev

# Start only the frontend development server
npm run dev

# Build frontend assets
npm run build

# Run the complete test and quality suite
composer run test

# Run frontend checks and type checking
npm run check
npm run types:check
```

## Authentication and Account Settings

Laravel Fortify provides the authentication flows and rate limiting. The
application includes:

- Registration, login, logout, and email verification
- Password reset and password confirmation
- Two-factor authentication
- Passkey enrollment and management
- Profile, password, and appearance settings

Protected routes include `/dashboard`, `/settings/profile`,
`/settings/security`, and `/settings/appearance`.

## Future Improvements

- Add task creation, assignment, status, and due-date workflows.
- Add task filtering, search, labels, and team collaboration.
- Add notifications and activity history.
- Expand dashboard reporting and productivity insights.
- Add deployment documentation for production environments.

## License

This project is open-sourced under the [MIT license](https://opensource.org/licenses/MIT).
