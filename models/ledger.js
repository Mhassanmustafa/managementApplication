var mongoose = require("mongoose");

const ledgerSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers"
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders"
    },
    credit: {
      type: Number
    },
    debit: Number,
    balance: Number,
    description: {
      type: String,
      maxlength: 60
    }
  },
  { timestamps: true }
);

//insert new ledger object in data base
ledgerSchema.methods.insertNewLedger = async function(
  id,
  orderId,
  credit,
  debit,
  balance,
  description
) {
  //if (!ledger) throw new Error("Ledger object is requires");
  let object = {
    customerId: id,
    orderId: orderId,
    credit: credit,
    debit: debit,
    balance: balance,
    description: description
  };
  return await this.model("ledger").create(object);
};

//get all ledger data
ledgerSchema.methods.getData = async function() {
  return await this.model("ledger").aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customerId",
        foreignField: "_id",
        as: "name"
      }
    }
  ]);
};

//get the latest ledger against customer id
ledgerSchema.methods.getCustLedger = async function(customerId) {
  if (!customerId) throw new Error("customer id required");
  let result = await this.model("ledger")
    .findOne({ customerId: customerId })
    .sort({ createdAt: -1 });
  if (!result) throw new Error("there is no ledger against this customer id");

  return result;
};

//get the latest ledger aginst order id
ledgerSchema.methods.getCustLedgerO = async function(orderId) {
  if (!orderId) throw new Error("customer id required");
  let result = await this.model("ledger")
    .findOne({ orderId: orderId })
    .sort({ createdAt: -1 });
  if (!result) throw new Error("there is no ledger against this customer id");

  return result;
};

//delete ledger by order Id
ledgerSchema.methods.deleteOrder = async function(orderId) {
  if (!orderId) throw new Error("customer id required");
  let result = await this.model("ledger").findOne({ orderId: orderId });

  if (!result) throw new Error("there is no customer with this order id");

  return await this.model("ledger").deleteOne({ orderId: orderId });
};

//get sum of daily credits and date
ledgerSchema.methods.getDailyCredit = async function() {
  return await this.model("ledger").aggregate([
    {
      $group: {
        _id: { $dayOfYear: "$createdAt" },
        totalAmount: { $sum: "$credit" },
        count: { $sum: 1 },
        entry: {
          $push: {
            date: "$createdAt"
          }
        }
      }
    }
  ]);
};

//get the monthly sales data sum
ledgerSchema.methods.getMonthlyCredit = async function() {
  return await this.model("ledger").aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalAmount: { $sum: "$credit" },
        count: { $sum: 1 },
        entry: {
          $push: {
            date: "$createdAt"
          }
        }
      }
    }
  ]);
};

//get yearly sales from the data base
ledgerSchema.methods.getYearlyCredit = async function() {
  return await this.model("ledger").aggregate([
    {
      $group: {
        _id: { $year: "$createdAt" },
        totalAmount: { $sum: "$credit" },
        count: { $sum: 1 },
        entry: {
          $push: {
            date: "$createdAt"
          }
        }
      }
    }
  ]);
};

ledgerSchema.methods.getDailyCre = async function(date) {
  return await this.model("ledger").aggregate([
    {
      $group: {
        _id: {
          $add: [
            { $dayOfMonth: "$createdAt" },
            { $month: "$createdAt" },
            { $year: "$createdAt" }
          ]
        },
        totalAmount: { $sum: "$credit" },
        count: { $sum: 1 },
        entry: {
          $push: {
            date: "$createdAt"
          }
        }
      }
    }
  ]);
};

ledgerSchema.methods.getMonthlyCre = async function() {
  return await this.model("ledger").aggregate([
    {
      $group: {
        _id: {
          $add: [{ $month: "$createdAt" }, { $year: "$createdAt" }]
        },
        totalAmount: { $sum: "$credit" },
        count: { $sum: 1 },
        entry: {
          $push: {
            date: "$createdAt"
          }
        }
      }
    }
  ]);
};

let Ledger = mongoose.model("ledger", ledgerSchema);
exports.ledger = Ledger;
