import memoize from 'lru-memoize';
import {createValidator, required, integer, maxLength} from 'utils/validation';

const surveyValidation = createValidator({
  title: [required, maxLength(20)],
  supplierCode: [required, integer],
  sector: [required, integer] // single rules don't have to be in an array
});
export default memoize(10)(surveyValidation);
