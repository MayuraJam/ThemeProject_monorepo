import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  userid: yup.string().required('กรุณากรอก User ID'),
  password: yup.string().required('กรุณากรอกรหัสผ่าน'),
});

export const registerSchema = yup.object().shape({
  userid: yup.string().required('กรุณากรอก User ID'),
  password: yup.string()
    .required('กรุณากรอกรหัสผ่าน')
    .min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
  confirmPassword: yup.string()
    .required('กรุณายืนยันรหัสผ่าน')
    .oneOf([yup.ref('password')], 'รหัสผ่านไม่ตรงกัน'),
});
