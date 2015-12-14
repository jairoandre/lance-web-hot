export default function login(req) {
  if (!req.body.name || !req.body.password) {
    return Promise.reject('Nome do usuário/password nulo');
  }
  const user = {
    name: req.body.name
  };
  req.session.user = user;
  return Promise.resolve(user);
}
