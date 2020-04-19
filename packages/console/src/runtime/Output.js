export default class Output {

    constructor({stderr, stdout}) {
        this.stderr = stderr;
        this.stdout = stdout;
        this.current = '';
        this.rows = [[]];
    }

    write(line = '') {
        this.current += line;
    }

    writeLine(line = '') {
        this.write(line);
        this.tab();
        this.rows.push([]);
    }

    tab() {
        this.rows[this.rows.length - 1].push(this.current);
        this.current = '';
    }

    flush() {
        const columnLengths = [];

        for (const row of this.rows) {
            for (let index = 0; index < row.length; index++) {
                const cell = row[index];
                if (columnLengths[index] === undefined) {
                    columnLengths[index] = [];
                }
                columnLengths[index].push(cell.length);
            }
        }
        const tabs = columnLengths.map((lengths) => Math.max(...lengths) + 3);

        for (let y = 0; y < this.rows.length - 1; y++) {
            const cols = this.rows[y];
            for (let x = 0; x < cols.length; x++) {
                const col = cols[x];
                this.stdout.write(col);
                const spaceCount = tabs[x] - col.length;
                this.stdout.write(' '.repeat(spaceCount));
            }
            this.stdout.write('\n');
        }
        this.rows = [[]];
        this.current = '';
    }
}
