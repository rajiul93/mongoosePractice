import { catchAsync } from '../../utils/catchAsync';
import { OfferedCourseService } from './offerCourse.services';

const createOfferCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseService.createOfferCourseDB(req.body);
  res.status(200).send({
    success: true,
    message: 'Offer course create successfully',
    data: result,
  });
});
const getAllOfferCourse = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await OfferedCourseService.getAllOfferCourseDB(query);
  res.status(200).send({
    success: true,
    message: 'Student get successfully',
    data: result,
  });
});
const getSingleOfferCourse = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await OfferedCourseService.getSingleOfferCourseDB(id);
  res.status(200).send({
    success: true,
    message: 'Student get successfully',
    data: result,
  });
});
const updateOfferCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseService.updateOfferCourseDB(id, req.body);
  res.status(200).send({
    success: true,
    message: 'Student get successfully',
    data: result,
  });
});

export const offeredCourseController = {
  createOfferCourse,
  getAllOfferCourse,
  getSingleOfferCourse,
  updateOfferCourse,
};
