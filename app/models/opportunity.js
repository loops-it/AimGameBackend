const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const opportunitySchema = Schema({
  referenceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  workspaceId: {
    type: Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client", // Reference to the Client schema
    required: true,
  },
  funnelStatusId: {
    type: Schema.Types.ObjectId,
    ref: "FunnelStatus",
    default: "6565da8982ae860f776de5df",
  },
  leadId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User schema
  },
  team: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  partners: [
    {
      type: Schema.Types.ObjectId,
      ref: "Partner",
    },
  ],
  opportunityMappingRoles: [
    {
      impact: {
        type: String,
        required: true,
      },
      rate: {
        type: Number,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      clientPerson: {
        type: Schema.Types.ObjectId,
        ref: "ClientOrganization",
      },
    },
  ],
});

opportunitySchema.virtual("opportunity-task", {
  ref: "Task",
  localField: "_id",
  foreignField: "opportunityId",
});

opportunitySchema.pre("save", async function (next) {
  try {
    if (!this.referenceNumber) {
      // If referenceNumber doesn't exist, generate and assign a new one
      const latestOpportunity = await this.constructor.findOne(
        {},
        {},
        { sort: { referenceNumber: -1 } }
      );
      const nextReferenceNumber = latestOpportunity
        ? latestOpportunity.referenceNumber + 1
        : 1;
      this.referenceNumber = nextReferenceNumber;
    }
    next();
  } catch (error) {
    next(error);
  }
});
opportunitySchema.pre("find", function (next) {
  this.populate({
    path: "funnelStatusId",
    select: "status stage rate"
  });
  this.populate("leadId", "name");
  this.populate("clientId", "name");
  next();
});
module.exports = mongoose.model("Opportunity", opportunitySchema);
