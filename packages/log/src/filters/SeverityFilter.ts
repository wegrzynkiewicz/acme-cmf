import type {Log} from '../Log';
import type {FilterInterface} from './FilterInterface';

export class SeverityFilter implements FilterInterface {

    public minSeverity: number;

    public constructor(
        {minSeverity}: {
            minSeverity: number,
        },
    ) {
        this.minSeverity = minSeverity;
    }

    public filtrate({severity}: Log): boolean {
        if (severity > this.minSeverity) {
            return false;
        }
        return true;
    }
}
