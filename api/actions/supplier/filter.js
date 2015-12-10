const initialSuppliers = [
  {id: 1, title: 'Clínica UTIM', supplierCode: 7},
  {id: 2, color: 'Perinatal', supplierCode: 23},
  {id: 3, color: 'Oncologia', supplierCode: 223}
];

export function filterSuppliers(req) {
  let suppliers = req.session.suppliers;
  if (!suppliers) {
    suppliers = initialSuppliers;
    req.session.suppliers = suppliers;
  }
  return suppliers;
}

export default function filter(req) {
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {
      if (Math.random() < 0.33) {
        reject('Requisição falhou!');
      } else {
        resolve(filterSuppliers(req));
      }
    }, 1000); // simulate async load
  });
}
