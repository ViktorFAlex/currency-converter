import { ConverterFieldsBlur } from '../types/interfaces';

const handleBlur: ConverterFieldsBlur = (formik, field) => formik.setFieldTouched(field);

export default handleBlur;
