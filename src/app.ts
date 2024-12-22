import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { globalError } from './app/middlewares/globalError';
import { notFoundRoute } from './app/middlewares/notFoundRout';
import { academicDepartmentRouters } from './app/modules/academicDepartment/academicDepartment.router';
import { academicFacultyRouters } from './app/modules/academicFaculty/academicFaculty.router';
import { AcademicRoutes } from './app/modules/academicSemester/academicSemester.routes';
import { AdminRoutes } from './app/modules/admin/admin.route';
import { courseRouters } from './app/modules/course/course.routers';
import { FacultyRoutes } from './app/modules/faculty/faculty.route';
import { semesterRegistrationRouters } from './app/modules/semesterRegistration/semesterRegistration.route';
import { StudentRoutes } from './app/modules/students/student.route';
import { UserRoutes } from './app/modules/users/users.route';
const app: Application = express();
// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/academic-semester', AcademicRoutes);
app.use('/api/v1/academic-faculty', academicFacultyRouters);
app.use('/api/v1/academic-department', academicDepartmentRouters);
app.use('/api/v1/faculty', FacultyRoutes);
app.use('/api/v1/course', courseRouters);
app.use('/api/v1/semester-registration', semesterRegistrationRouters);



app.use('/api/v1/admin', AdminRoutes);

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.all('*', notFoundRoute);

app.use(globalError);

export default app;
