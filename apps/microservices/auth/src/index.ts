import app from '@/app.ts';
import { ENVCONFIG } from '@/config.ts';

const PORT = ENVCONFIG.PORT;

app.get('/', (c) => c.text('Tauro Auth Running!'));

export default {
  port: PORT,
  fetch: app.fetch,
};
