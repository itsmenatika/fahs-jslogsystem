import { inspect, info, warn, success, error } from 'fahs';
import { allGroup_collection, cmdTableToCommandCompounts, multiLineConstructor, onlyToRedirect, quickCmdWithAliases, quickSetup, smartArgs } from 'jslogsystem';
// success, warn, error, share the same text, just different colors

const commandTable = quickCmdWithAliases("fahs", {
    usageinfo: "fahs <subcommand> [<data>]",
    desc: "Uses fahs library to format data",
    longdesc: multiLineConstructor(
        "Uses fahs library to format data",
        "",
        "It's recommended to have global console object bound to jslogsystem api, but it should be displayed even without that.",
        "It's however will not be saved to log files without binding. ",
        "consider adding this to the config of the session:",
        "addToGlobalAs: ['console'] and useAddToGlobalAs: true",
        "",
        "subcommands:",
        "* fahs inspect <...data> -> it will inspect the data",
        "* fahs info <msg> [<labelOrOptions>] -> it behaves like console.info",
        "* fahs warn <msg> [<labelOrOptions>] -> it behaves like console.warn",
        "* fahs error <msg> [<labelOrOptions>] -> it behaves like console.error",
        "* fahs success <msg> [<labelOrOptions>] -> it behaves like console.info but with success"
    ),
    minver: 1.31,
    callback(preargs: any[]){
        const args = smartArgs(preargs);

        const subcmd = args.args[0];

        if(!subcmd) return "INCORRECT SYNTAX";

        switch(subcmd){
            case "inspect": {
                const toSend: any[] = args.args.slice(1);
                const toRet: any[] = [];

                for(const one of toSend){
                    toRet.push(inspect(one))
                }
                
                return onlyToRedirect(toRet);
            }

            case "info": {
                const msg = args.args[1];
                const labelOrOptions = args.args[2];

                return onlyToRedirect(info(msg, labelOrOptions));
            }

            case "warn": {
                const msg = args.args[1];
                const labelOrOptions = args.args[2];

                return onlyToRedirect(warn(msg, labelOrOptions));
            }
            case "success": {
                const msg = args.args[1];
                const labelOrOptions = args.args[2];

                return onlyToRedirect(success(msg, labelOrOptions));
            }
            case "error": {
                const msg = args.args[1];
                const labelOrOptions = args.args[2];

                return onlyToRedirect(error(msg, labelOrOptions));
            }
            default:
                return "INCORRECT SYNTAX";
        }
    }
});

const commandCompounds = cmdTableToCommandCompounts(commandTable);

export {
    commandTable, commandTable as FAHS_LOGSYSTEM_COMMANDTABLE, 
    commandCompounds, commandCompounds as FAHS_LOGSYSTEM_COMMANDCOMPOUNDS
}