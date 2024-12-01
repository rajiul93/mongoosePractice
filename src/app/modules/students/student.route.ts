import express from 'express';
import { StudentController } from './student.controller';

const route = express.Router();

route.get('/create-student', StudentController.getAllStudents);
route.get('/create-student/:email', StudentController.getSingleStudents);
route.post('/create-student', StudentController.createStudent);

export const StudentRoutes = route;
