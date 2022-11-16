import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { schemas } from './schema';
import { User } from './Model/User';
import { Car } from './Model/Car';

// aqui definos quais schemas o adapter deve usar
const adapter = new SQLiteAdapter({
    schema: schemas,
})

// aqui fazemos a conexão, informando o adapter e os Models criados
const database = new Database({
    adapter,
    modelClasses: [
        User,
        Car
    ],
    
});


export { database };