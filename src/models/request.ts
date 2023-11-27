import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    requestor: {
        type: Object,
        required: false
    },
    assignedTo: {
        type: Object,
        required: false
    },    
    reqStatus: {
        type: String,
        required: true
    },
    comments: {
        type: Object,
        required: false
    },
    createdAt : {
        type: Date,
        required: true,        
        default : Date.now()
    },
    updatedAt: {
        type: Date,
        required: false
    },
    
});

const RequestModel = mongoose.model<mongoose.Document>('request', RequestSchema);

export { RequestModel };
export default RequestModel;
