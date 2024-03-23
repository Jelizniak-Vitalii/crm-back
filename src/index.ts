import { server } from './server';
import { setupDatabase } from './models';
import { log, LogLevel } from './utils/logger';

async function startServer() {
  try {
    await setupDatabase();

    server.listen(process.env.PORT, () => {
      log(`Сервер запущен на http://localhost:${process.env.PORT}`);
    });

    server.on('error', (error) => {
      log(`Ошибка при запуске сервера: ${error.message}`, LogLevel.ERROR);
    });
  } catch (error: any) {
    log(error.message, LogLevel.ERROR);
  }
}

startServer();
