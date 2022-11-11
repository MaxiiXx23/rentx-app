import { appSchema } from "@nozbe/watermelondb/Schema";

import { userSchema } from "./userSchema";

// aqui eu uso o appSchema para centralizar todos os meus schemas
const schemas = appSchema({
    version: 1,
    tables:[
        userSchema
    ]
})

export { schemas };