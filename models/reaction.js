const { Schema, model, Types, Mongoose } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => {
        return new Types.ObjectId();
      },
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date().getDate(),
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;