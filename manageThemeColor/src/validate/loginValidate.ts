import * as yup from 'yup';
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const loginSchema = yup.object().shape({
  email: yup.string().trim()
  .email("กรุณากรอก email ให้ถูกต้อง")
  .matches(emailRegex, "กรุณากรอก email ให้ถูกต้อง")
  .required('กรุณากรอก email'),
  password: yup.string().trim().required('กรุณากรอกรหัสผ่าน'),
});

export const registerSchema = yup.object().shape({
  email: yup.string().trim()
  .email("กรุณากรอก email ให้ถูกต้อง")
  .matches(emailRegex, "กรุณากรอก email ให้ถูกต้อง")
  .required('กรุณากรอก email'),
  password: yup.string()
    .required('กรุณากรอกรหัสผ่าน')
    .min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร')
    .matches(/\d/, 'ต้องมีตัวเลขอย่างน้อย 1 ตัว')
    .matches(/[A-Z]/, 'ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว')
    .matches(/[a-z]/, 'ต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัว'),
  confirmPassword: yup.string()
    .required('กรุณายืนยันรหัสผ่าน')
    .oneOf([yup.ref('password')], 'รหัสผ่านไม่ตรงกัน'),
});
