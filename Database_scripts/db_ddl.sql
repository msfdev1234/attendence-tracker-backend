
use school_attendence;

CREATE TABLE users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(255) NOT NULL,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       role ENUM('Professor', 'Student') NOT NULL
);

CREATE TABLE courses (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         code VARCHAR(10) UNIQUE NOT NULL,
                         professor_id INT, -- Foreign key to users table
                         FOREIGN KEY (professor_id) REFERENCES users(id)
);

CREATE TABLE student_courses (
                                 student_id INT,   -- Foreign key to users table
                                 course_id INT,    -- Foreign key to courses table
                                 PRIMARY KEY (student_id, course_id),
                                 FOREIGN KEY (student_id) REFERENCES users(id),
                                 FOREIGN KEY (course_id) REFERENCES courses(id)
);


CREATE TABLE attendance (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            student_id INT,
                            course_id INT,
                            date DATE NOT NULL,
                            status ENUM('Present', 'Absent') NOT NULL,
                            latitude DECIMAL(10, 8),
                            longitude DECIMAL(10, 8),
                            FOREIGN KEY (student_id) REFERENCES users(id),
                            FOREIGN KEY (course_id) REFERENCES courses(id)
);

