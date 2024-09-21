import notifications from 'src/utils/notifications';

type ActionT = () => void;

export default () => {
  const notify = notifications();

  return {
    password: (error: Error, action: ActionT) => {
      if (error.message.includes('Password should be at least 6 characters.')) {
        console.log('entro aqui', error.message);
        notify.error('minimo 6 caracteres en la contraseña.');
        action && action();
      }
    },
    email: (error: Error, action: ActionT) => {
      if (error.message.includes('Unable to validate email address: invalid format')) {
        console.log('entro aqui', error.message);
        notify.error('El email no es valido.');
        action && action();
      }
    },
    credentials: (error: Error, action: ActionT) => {
      if (error.message.includes('Invalid login credentials')) {
        console.log('entro aqui', error.message);
        notify.error('Usuario o contraseña incorrecta.');
        action && action();
      }
    },
    userExists: (error: Error, action: ActionT) => {
      if (error.message.includes('User already registered')) {
        console.log('entro aqui', error.message);
        notify.error('El email ya esta en usado, intenta con otro.');
        action && action();
      }
    }
  }
}