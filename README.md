# Full-School-Management-System
This system is made with Angular, Nodejs, Express Js and MySQL.

# Frontend
This project was generated with Angular CLI version 11.0.7.

# Development server
Run ng serve for a dev server. Navigate to http://localhost:4200/

# Code scaffolding
Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.

# Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory. Use the --prod flag for a production build.

# Running unit tests
Run ng test to execute the unit tests via Karma.

# Running end-to-end tests
Run ng e2e to execute the end-to-end tests via Protractor.

# Further help
To get more help on the Angular CLI use ng help or go check out the Angular CLI Overview and Command Reference page.


# MODULE 1:  Admin Management
Admin have all the access to each and every feature of system. Admin can be one or more than one person having different logins but of same domain. Admin makes the profiles and logins of users. Admin can edit or delete anything. Admin has the right to admit new students and expel or approve graduate old students. Admin can edit his/her own profile. Admin also maintains the system by check and balance of every feature. Admin has the duty to accept or reject student’s withdrawal application, transferring students and admitting transferred students.

#  Module 2:  User Control
This will deal with user accounts. Users have their specific domain logins so that they can get access to the web portal and android app. Users have the access to other features too with respect to their login account criteria. Along with that every user can report an error if he/she is facing any error in their portal or they can get help from help desk as well. Users can also customize their respective portals little bit if admin gives them access.

In this system, users are of following types:

 

Teachers:
After logging in, teachers can edit marks/result of students and can conduct their assessments/exams online.

Students:
They can view their marks/result and give assessments/exams online.

Parents:
They can view the progress report of their child.

Finance Department Employees:
They have multiple employees who will deal in student’s fee and other related tasks.

Guest Parents:
They will get temporary guest login to fill admission form and to know admission status later on.

#       Module 3: Finance Department
Finance department has their own login of its domain. When admin accepts new student application form, it will next come to the finance department for generating fee challan. Finance department will enter fee paid date to activate student on the web portal. Similarly, it works for already enrolled students. All the minor things related to challan forms are handled by them, from making bi-monthly challan to regular challan, from searching and printing student’s challan by student id to enter its received date, from approving withdraw students to transferring their fee. Finance department also calculates and gives kinship/siblings discount in challan form for students whose one or more than one sibling is studying in same school.

#       Module 4: Admission
This module is for guest parents who want to admit their child in school. They will make their temporary guest login to fill admission form and to know admission status later on. If their child’s admission form gets accepted by Admin then they will get fee challan form via Finance department on their temporary login. After submitting the fee their child’s admission will get confirmed. But if their child didn’t get admission in school then they will get notified by seeing admission status on their guest login. In both cases, this guest login will automatically get deleted from the system after few days of whole admission procedure.

#       Module 5: Subject Mapping
This module deal with scheme of studies and support material of students. When students login to their respective portals, they will automatically get access to subject mapping. Due to this feature students can easily view their scheme of studies according to their class standard. Given in the scheme of studies, students need books too. For that we are adding a feature of online book shopping mall. By the help of this online book shopping mall, students can easily get their books on their door step by ordering them online. This feature of Subject Mapping is only editable by admin as admin will keep scheme of studies updated every year. Other users can only see these schemes of studies whenever they need to. The online book shopping mall feature will serve students and parents 24/7.

#       Module 6: Attendance
Attendance has two main functions; to mark and to approve. To mark and upload attendance is the duty of teacher and to approve it is the duty of Admin. If admin approves, only then it will count and start showing on portal. This attendance feature will show all the details of lectures, their start and end time and student presence or absence in it. Day to day attendance is editable if anyone wants to change it later in a year, but this authority is only given to teachers and admin. Students and their parents can only see attendance records when they get uploaded after admin’s approval.

#       Module 7: Student Affairs

Help Desk or Search:
By using this feature, user can trace anything, user can report error if they are facing some in their respective portal. User can get answers to their queries related to school. If anyone needs appointment to meet higher authorities of school, they can do so by taking help from help desk.

Result:
It can be seen by students and their parents by the end of every term when teachers upload it. Once result of a term is out it cannot be editable anymore.

Records:
This feature is to keep the track of record of each student. This records feature can provide the list of all the enrolled students, their academic record, their fee records and the whole statistics.
