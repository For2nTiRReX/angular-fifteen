export class Tile {
    constructor(
        public id: number,
        public label: string,
        public positionTop: number,
        public positionLeft: number,
        public isEmpty: boolean
    ) {}
}