<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!--<title>School Management System</title>-->
</head>
<body>
  <h1 align="center">ClassConnect</h1>
  <p>This project is a web-based application aimed at catering specifically to small scale education environments. It offers a dynamic and personalized learning environment, enhancing class management for educators and learners alike.</p>

  <h2>Functionalities</h2>
  <ul>
    <li><strong>User Roles:</strong> The system supports three user roles: Admin, Teacher, and Student, each with specific functionalities and access levels.</li>
    <li><strong>Secure Admin Dashboard:</strong> Admins have controlled access to administrative features, enabling them to manage users, classes, subjects, and system settings securely.</li>
    <li><strong>Attendance Tracking:</strong> Teachers can efficiently track attendance for both offline and online classes through a user-friendly interface. Attendance data is seamlessly recorded and monitored.</li>
    <li><strong>Age-Specific Virtual Classrooms:</strong> Virtual rooms designated for specific age groups facilitate targeted class organization, ensuring a tailored learning experience.</li>
    <li><strong>Effortless Zoom Meeting Creation:</strong> The platform integrates with Zoom to automate meeting link generation. Zoom meeting links are distributed automatically to designated rooms, simplifying virtual class management.</li>
  </ul>

  <h2>Tech Stack</h2>
  <ul>
    <li><strong>Frontend:</strong> React.js, Material UI, Redux</li>
    <li><strong>Backend:</strong> Node.js, Express.js</li>
    <li><strong>Database:</strong> MongoDB</li>
  </ul>

  <h2>How to Run the Project</h2>
  <h3>Installation</h3>
  <ol>
    <li>Clone the GitHub repository:</li>
    <pre><code>git clone https://github.com/tejasbahurupi/Class-Connect.git</code></pre>
    <li>Navigate to the project directory:</li>
    <pre><code>cd school-management-system</code></pre>
    <li>Install backend dependencies and start the server:</li>
    <pre><code>cd backend</code></pre>
    <pre><code>npm install</code></pre>
    <pre><code>npm start</code></pre>
    <li>Open a new terminal tab/window, navigate to the project directory again, and install frontend dependencies:</li>
    <pre><code>cd frontend</code></pre>
    <pre><code>npm install</code></pre>
    <li>Start the frontend server:</li>
    <pre><code>npm start</code></pre>
    <li>Access the application in your browser at <code>localhost:3000</code>.</li>
  </ol>

  <h2>Additional Notes</h2>
  <ul>
    <li>The project includes a homepage with login options for admin, teacher, and student, providing secure access to different functionalities based on user roles.</li>
    <li>Pages within the website facilitate adding students, teachers, and subjects, marking attendance, viewing attendance and grade statistics, and handling complaints.</li>
    <li>The frontend provides visualizations such as pie charts to display attendance and grades, enhancing the personalized education experience.</li>
  </ul>

</body>
</html>
