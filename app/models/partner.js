const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partnerSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contacts: {
        type: Array,
        required: true,
      },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    company: {
        type: String,
        required: false,
      },
  },
  { timestamps: false }
);


partnerSchema.pre("find", function (next) {
    this.populate("clientId", "name"); 
    this.populate("workspaceId", "name"); 
    next();
  });
module.exports = mongoose.model("Partner", partnerSchema);
