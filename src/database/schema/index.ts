import { appSchema } from "@nozbe/watermelondb/Schema";

import { userSchema } from "./userSchema";
import { carSchema } from "./carSchema";

// aqui eu uso o appSchema para centralizar todos os meus schemas
const schemas = appSchema({
    // para atualizar o banco com novas tables, devemos mudar a versão do banco
    version: 3,
    tables:[
        userSchema,
        carSchema
    ]
})

export { schemas };