import { server } from './server';

async function startServer() {
  try {
    server.listen(4000, () => {
      console.log(`Сервер запущен на http://localhost:${4000}`);
    });

    server.on('error', (error) => {
      console.log(`Ошибка при запуске сервера: ${error.message}`, 'error');
    });
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error);
  }
}

startServer();
