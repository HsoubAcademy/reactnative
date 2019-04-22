import 'dotenv/config';
import models, {sequelize} from './models';
import app from './app';

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Express Running');
    });
});

