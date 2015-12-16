import memoize from 'lru-memoize';
import {createValidator, required, integer, maxLength} from 'utils/validation';

const surveyValidation = createValidator({
  title: [required, maxLength(20)],
  supplierCode: [required, integer]
});
export default memoize(10)(surveyValidation);
