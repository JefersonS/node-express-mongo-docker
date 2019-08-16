import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

const NamesSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [3, 'Name is too short!'],
      maxlength: [30, 'Name is too long!'],
      required: [true, 'Name is a required field!']
    },
    birthdate: { type: Date },
    position: {
      type: String,
      enum: ['Junior', 'Middle', 'Senior'],
      required: true
    },
    created: { type: Date },
    updated: { type: Date, default: Date.now() },
    deleted: { type: Boolean, default: false }
  }
);

NamesSchema.index({ name: 1 });

export default mongoose.model('Names', NamesSchema);