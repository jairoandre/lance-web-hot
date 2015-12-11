const initialSuppliers = [
  {id: 1, title: 'Clínica UTIM load', supplierCode: 7},
  {id: 2, title: 'Perinatal', supplierCode: 23},
  {id: 3, title: 'Oncologia', supplierCode: 223}
];

export function loadSuppliers(req) {
  let suppliers = req.session.suppliers;
  if (!suppliers) {
    suppliers = initialSuppliers;
    req.session.suppliers = suppliers;
  }
  return suppliers;
}

export default function load(req) {
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {
      if (Math.random() < 0.33) {
        reject('Requisição falhou!' + req.title);
      } else {
        resolve(loadSuppliers(req));
      }
    }, 1000); // simulate async load
  });
}
