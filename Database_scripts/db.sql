use attendence_mgmt_db;
drop table Users;
CREATE TABLE Users (
                       user_id INT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(100) NOT NULL,
                       email VARCHAR(100) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL, -- Store hashed passwords
                       role ENUM('Professor', 'Student') NOT NULL
);

CREATE TABLE Courses (
                         course_id VARCHAR(10) PRIMARY KEY,
                         course_name VARCHAR(100) NOT NULL,
                         professor_id INT,
                         FOREIGN KEY (professor_id) REFERENCES Users(user_id)
);
CREATE TABLE StudentCourses (
                                student_id INT,
                                course_id VARCHAR(10),
                                PRIMARY KEY (student_id, course_id),
                                FOREIGN KEY (student_id) REFERENCES Users(user_id),
                                FOREIGN KEY (course_id) REFERENCES Courses(course_id)
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