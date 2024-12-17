export class Data{
    constructor(data) {
        this.shardName = data?.shardName;
        this.description = data?.description;
        this.createdDate = data?.createdDate;
        this.userId = data?.userId;
    }
}