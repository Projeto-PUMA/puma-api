const Event = use('Event')
const Mail = use('Mail')
const Env = use('Env')
const User = use('App/Models/User');

Event.on('auth::register', ({ name, email, token }) => {
  const url = `${Env.get('FRONT_URL')}/confirmation?token=${token}`
  Mail.send('emails.welcome', { name, url }, (message) => {
    message.subject('Projeto PUMA - Bem vindo!');
    message.to(email);
  });
});

Event.on('auth::forgotPassword', ({ email, token }) => {
  const url = `${Env.get('FRONT_URL')}/forgot-password?token=${token}`
  Mail.send('emails.forgot-password', { email, url }, (message) => {
    message.subject('Projeto PUMA - Recuperação de senha');
    message.to(email);
  });
});

Event.on('auth::resetPassword', ({ email }) => {
  Mail.send('emails.reset-password', { email }, (message) => {
    message.subject('Projeto PUMA - Alteração de senha ');
    message.to(email);
  });
});

Event.on('project::created::owner', async ({ project }) => {
  const user = await project.owner();
  Mail.send('emails.project-created', { project, user }, (message) => {
    message.subject('Projeto PUMA - Projeto criado ');
    message.to(user.email);
  });
});

Event.on('project::created::log', async ({ project }) => {
  const users = await User.query().with('roles', (builder) => {
    builder.whereIn('slug', ['admin', 'coordenador']);
  }).fetch();
  const usersJson = users.toJSON();
  usersJson.forEach(user => {
    Mail.send('emails.project-created', { project, user }, (message) => {
      message.subject('Projeto PUMA - Projeto criado');
      message.to(user.email);
    });
  });
});

Event.on('project::updatedStatus::owner', async (project) => {
  const user = await project.owner().fetch();
  Mail.send('emails.project-created', { project, user }, (message) => {
    message.subject('Projeto PUMA - Alteração de status do projeto');
    message.to(user.email);
  });
});

Event.on('project::updatedStatus::log', async (project) => {
  const users = await User.query().with('roles', (builder) => {
    builder.whereIn('slug', ['admin', 'coordenador']);
  }).fetch();
  const usersJson = users.toJSON();
  usersJson.forEach(user => {
    Mail.send('emails.project-created', { project, user }, (message) => {
      message.subject('Projeto PUMA - Alteração de status do projeto');
      message.to(user.email);
    });
  });
});