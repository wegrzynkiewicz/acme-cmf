import {dirname} from 'path';

export class SegmentDirCondition {

    constructor(path) {
        this.segments = path.toString().split('/').filter(Boolean);
        this.length = this.segments.length;
    }

    match({request}) {
        const {length, segments} = this;
        const dir = dirname(request.path);
        const requestSegments = dir.split('/').filter(Boolean);

        if (requestSegments.length !== length) {
            return false;
        }

        for (let i = 0; i < length ; i++) {
            const segment = segments[i];
            const requestSegment = requestSegments[i];
            if (segment === requestSegment) {
                // nothing
            } else if (segment.startsWith('{') === true && segment.endsWith('}') === true){
                // nothing
            } else {
                return false;
            }
        }

        return true;
    }
}
