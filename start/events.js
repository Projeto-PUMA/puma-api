const Event = use('Event')
const Mail = use('Mail')
const Env = use('Env')

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