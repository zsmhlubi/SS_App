
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';



SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sss-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `checklist`
--

CREATE TABLE `checklist` (
  `checkListID` int(11) NOT NULL,
  `topic` varchar(300 ) NOT NULL,
  `courseID` int(11) NOT NULL,
  `visibility` varchar(5) NOT NULL,
  `deadline` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `checklistitems`
--

CREATE TABLE `checklistitems` (
  `checkListItemID` int(11) NOT NULL,
  `checkListID` int(11) NOT NULL,
  `checkListItem` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `commentID` int(11) NOT NULL,
  `checkListID` int(11) NOT NULL,
  `comment` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `completedchecklist`
--

CREATE TABLE `completedchecklist` (
  `completionID` int(11) NOT NULL,
  `checkListID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  `courseID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `courseID` int(11) NOT NULL,
  `courseName` varchar(200) NOT NULL,
  `schoolID` int(11) DEFAULT NULL,
  `numEnrolledStudents` int(11) NOT NULL,
  `lecturer` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE `enrollment` (
  `enrollmentID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  `courseID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `facultyID` int(11) NOT NULL,
  `facultyName` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `outcomes`
--

CREATE TABLE `outcomes` (
  `outcomeID` int(11) NOT NULL,
  `outcome` varchar(100) NOT NULL,
  `checkListItemID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `schoolID` int(11) NOT NULL,
  `facultyID` int(11) NOT NULL,
  `schoolName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `studentID` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `studentNumber` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `checklist`
--
ALTER TABLE `checklist`
  ADD PRIMARY KEY (`checkListID`),
  ADD KEY `courseID` (`courseID`);

--
-- Indexes for table `checklistitems`
--
ALTER TABLE `checklistitems`
  ADD PRIMARY KEY (`checkListItemID`),
  ADD KEY `checkListID` (`checkListID`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`commentID`),
  ADD KEY `checkListID` (`checkListID`);

--
-- Indexes for table `completedchecklist`
--
ALTER TABLE `completedchecklist`
  ADD PRIMARY KEY (`completionID`),
  ADD KEY `checkListID` (`checkListID`),
  ADD KEY `studentID` (`studentID`),
  ADD KEY `courseID` (`courseID`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`courseID`),
  ADD KEY `schoolID` (`schoolID`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`enrollmentID`),
  ADD KEY `courseID` (`courseID`),
  ADD KEY `studentID` (`studentID`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`facultyID`);

--
-- Indexes for table `outcomes`
--
ALTER TABLE `outcomes`
  ADD PRIMARY KEY (`outcomeID`),
  ADD KEY `studentID` (`studentID`),
  ADD KEY `checkListItemID` (`checkListItemID`);

--
-- Indexes for table `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`schoolID`),
  ADD KEY `facultyID` (`facultyID`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`studentID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `checklist`
--
ALTER TABLE `checklist`
  MODIFY `checkListID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `checklistitems`
--
ALTER TABLE `checklistitems`
  MODIFY `checkListItemID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `commentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `completedchecklist`
--
ALTER TABLE `completedchecklist`
  MODIFY `completionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `courseID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `enrollment`
--
ALTER TABLE `enrollment`
  MODIFY `enrollmentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `facultyID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `outcomes`
--
ALTER TABLE `outcomes`
  MODIFY `outcomeID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school`
--
ALTER TABLE `school`
  MODIFY `schoolID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `studentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `checklist`
--
ALTER TABLE `checklist`
  ADD CONSTRAINT `checklist_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`);

--
-- Constraints for table `checklistitems`
--
ALTER TABLE `checklistitems`
  ADD CONSTRAINT `checklistitems_ibfk_1` FOREIGN KEY (`checkListID`) REFERENCES `checklist` (`checkListID`) ON DELETE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`checkListID`) REFERENCES `checklist` (`checkListID`)  ON DELETE CASCADE;

--
-- Constraints for table `completedchecklist`
--
ALTER TABLE `completedchecklist`
  ADD CONSTRAINT `completedchecklist_ibfk_1` FOREIGN KEY (`checkListID`) REFERENCES `checklist` (`checkListID`)  ON DELETE CASCADE,
  ADD CONSTRAINT `completedchecklist_ibfk_2` FOREIGN KEY (`studentID`) REFERENCES `students` (`studentID`)  ON DELETE CASCADE,
  ADD CONSTRAINT `completedchecklist_ibfk_3` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`) ON DELETE CASCADE;

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`schoolID`) REFERENCES `school` (`schoolID`) ON DELETE CASCADE;

--
-- Constraints for table `enrollement`
--
ALTER TABLE `enrollment`
  ADD CONSTRAINT `enrollment_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `course` (`courseID`) ON DELETE CASCADE,
  ADD CONSTRAINT `enrollment_ibfk_2` FOREIGN KEY (`studentID`) REFERENCES `students` (`studentID`) ON DELETE CASCADE;

--
-- Constraints for table `outcomes`
--
ALTER TABLE `outcomes`
  ADD CONSTRAINT `outcomes_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `students` (`studentID`) ON DELETE CASCADE,
  ADD CONSTRAINT `outcomes_ibfk_2` FOREIGN KEY (`checkListItemID`) REFERENCES `checklistitems` (`checkListItemID`) ON DELETE CASCADE;

--
-- Constraints for table `school`
--
ALTER TABLE `school`
  ADD CONSTRAINT `school_ibfk_1` FOREIGN KEY (`facultyID`) REFERENCES `faculty` (`facultyID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Dummy student ,faculty, school and  course

INSERT INTO students(firstName,lastName,studentNumber) VALUES("Reala","Reddy","1234567");

-- Faculty
INSERT INTO faculty(facultyName) VALUES("SCIENCE");

-- School 
INSERT INTO school(facultyID, schoolName) VALUES(1,"MATHEMATICS");

-- Course 

INSERT INTO course(schoolID,courseName, numEnrolledStudents,lecturer) VALUES(1,"Calculus",1,"Reala");

-- Enroll Student into course

INSERT INTO enrollment(studentID, courseID) VALUES(1,1);

INSERT INTO checklist(topic,courseID,visibility) VALUES("Integration",1,"yes");

INSERT INTO checklistitems(checkListID,checkListItem) VALUES(1,"Hello");
INSERT INTO checklistitems(checkListID,checkListItem) VALUES(1,"World");
flush privileges;

-- mysql -uroot -p password student_survey_db



DELIMITER //
CREATE PROCEDURE checkListCompleted(IN in_courseName VARCHAR(200),IN in_studentNumber VARCHAR(20), IN in_checkListTopic VARCHAR(300))
BEGIN
  -- Primary keys of the student and the course in the database
  DECLARE v_courseID INT(11) ;DECLARE v_studentID INT(11);DECLARE v_checklistID INT(11);
  SELECT courseID INTO v_courseID FROM course where courseName COLLATE utf8mb4_general_ci =in_courseName COLLATE utf8mb4_general_ci;
  SELECT studentID INTO v_studentID FROM students where studentNumber COLLATE utf8mb4_general_ci =in_studentNumber COLLATE utf8mb4_general_ci;
  SELECT checkListID INTO v_checklistID FROM checklist where topic COLLATE utf8mb4_general_ci =in_checkListTopic COLLATE utf8mb4_general_ci AND courseID COLLATE utf8mb4_general_ci=v_courseID COLLATE utf8mb4_general_ci;

  INSERT INTO completedchecklist(checkListID,studentID,courseID) VALUES(v_checklistID,v_studentID,v_courseID);
END//
DELIMITER ;

-- Procedure to delete a checklist
DELIMITER //
CREATE PROCEDURE deleteCheckList(IN in_courseName VARCHAR(200), IN in_topic VARCHAR(200))
BEGIN
  -- Checklist ID used to delete items corresponding to checklist in courseName with topic in_topic
  DECLARE v_courseID INT(11);DECLARE v_checklistID INT(11);

  SELECT courseID INTO v_courseID FROM course WHERE courseName COLLATE utf8mb4_general_ci=in_courseName COLLATE utf8mb4_general_ci;
  SELECT checkListID INTO v_checklistID FROM checklist WHERE topic COLLATE utf8mb4_general_ci=in_topic COLLATE utf8mb4_general_ci AND courseID COLLATE utf8mb4_general_ci =v_courseID COLLATE utf8mb4_general_ci;
  
  --  Delete Completions for a checklist
  DELETE FROM completedchecklist where courseID=v_courseID and checkListID COLLATE utf8mb4_general_ci=v_checklistID COLLATE utf8mb4_general_ci;

  -- Delete all Items of a checklist
  DELETE FROM checklistitems WHERE checkListID COLLATE utf8mb4_general_ci=v_checklistID COLLATE utf8mb4_general_ci;

  -- Delete checklist
  DELETE from checklist WHERE checkListID COLLATE utf8mb4_general_ci=v_checklistID COLLATE utf8mb4_general_ci AND courseID COLLATE utf8mb4_general_ci =v_courseID COLLATE utf8mb4_general_ci;

END//
DELIMITER ;

