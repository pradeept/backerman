import type { Command } from "commander"

export const configureBackupCommand = (program: Command)=>{
    program
    //  .option()
}


// backerman backup --provider <pgsql|mysql|sqlite> --user <username> --password <password> --url <db_url> --db <dbname>
// connecting to the db...
// connected!
// what do you want to backup ?
//  - schema only
//  - data only
//  - schema and data