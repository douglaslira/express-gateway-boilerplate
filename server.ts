import { PORT } from './config/contants';
import app from './src/app';

app.listen(PORT, () => console.log(`Listening on port a ${PORT}`));