module.exports = (MongoConnection) => {

  const models = {
    User: MongoConnection.model("User", require("./user")),
    Car: MongoConnection.model("Car", require("./car")),
  };

  return { ...models };
};