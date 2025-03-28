use attendence_mgmt_db;
drop table Users;
CREATE TABLE Users (
                       user_id INT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(100) NOT NULL,
                       email VARCHAR(100) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL, -- Store hashed passwords
                       role ENUM('Professor', 'Student') NOT NULL
);

drop table courses,StudentCourses;
CREATE TABLE courses (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         code VARCHAR(10) UNIQUE NOT NULL,
                         professor_id INT, -- Foreign key to users table
                         FOREIGN KEY (professor_id) REFERENCES users(user_id)
);

CREATE TABLE Attendance (
                            attendance_id INT AUTO_INCREMENT PRIMARY KEY,
                            student_id INT,
                            course_id VARCHAR(10),
                            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                            latitude DECIMAL(9, 6),
                            longitude DECIMAL(9, 6),
                            accuracy DECIMAL(5, 2),
                            FOREIGN KEY (student_id) REFERENCES Users(user_id),
                            FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Geofence (
                          geofence_id INT AUTO_INCREMENT PRIMARY KEY,
                          course_id VARCHAR(10),
                          latitude DECIMAL(9, 6) NOT NULL,
                          longitude DECIMAL(9, 6) NOT NULL,
                          radius DECIMAL(5, 2) DEFAULT 15.00, -- Radius in meters
                          FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

;

select * from Users;