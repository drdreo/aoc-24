type LogEntry = any[];

const LOG_SPACING = 10;

export class Logger {
    private logs: LogEntry[] = [];

    constructor(private name: string) {
    }

    log(...args: any[]) {
        this.logs.push(args);
    }

    print() {
        console.table(this.logs)
        // console.group(`Logger: ${this.name}`);
        // for (const logEntry of this.logs) {
        //     console.log(...logEntry);
        // }
        // console.groupEnd();
    }

    async saveToFile() {
        const ROOT_FOLDER = import.meta.url;
        const logFolder = `${ROOT_FOLDER}/logs`
        await Deno.mkdir(logFolder, {recursive: true});
        const logFilePath = `${logFolder}/${this.name}.log`;
        await Deno.writeTextFile(logFilePath, this.logs.join("\n"));
    }

    compare(logger: Logger) {
        const diff = this.logs.length - logger.logs.length;
        console.warn(
            `Unequal count of logs - ${diff} | ${this.name} - ${this.logs.length} | ${logger.name} - ${logger.logs.length}`,
        );
        console.log("\n\n");

        for (let i = 0; i < this.logs.length; i++) {
            const log1 = this.logs[i];
            const log2 = logger.logs[i];
            if (!log2) {
                console.log(`Idx out of bound for ${logger.name}[${i}]`);
                break;
            }
            if (log1.join("") !== log2.join("")) {
                const text1 = `${this.name.padEnd(LOG_SPACING)} \t ${log1.join("")}`;
                const text2 = `${logger.name.padEnd(LOG_SPACING)} \t ${log2.join("")}`;
                console.log(
                    `--- L${i}\n\r ${text1} \n\r ${text2}`,
                );
            }
        }
    }
}
