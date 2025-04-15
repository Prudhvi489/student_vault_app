import axiosClient from "../axios/axiosClient"

export const CreateStudentService = (props) =>{
    return axiosClient.post('/create-student', props);
}

export const UpdateStudentService = (props) => {
    return axiosClient.patch('/update-student', props);
}

export const getStudentsService = (props) => {
    return axiosClient.post('/get-sudents', props);
}

export const getStudentByIdservice = (props) =>{
    return axiosClient.get(`/get-student/${props}`);
}

export const DeleteStudentService = (props) => {
    return axiosClient.delete(`/student/${props}`);
}

export const UpdateStudentMarks = (props) =>{
    return axiosClient.post('/update-marks', props);
}