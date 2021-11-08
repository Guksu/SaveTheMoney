const express = require("express");
const app = express();
const cors = require("cors");
const accountRouter = require("./routers/accountRouter");
const adduserRouter = require("./routers/adduerRouter");
const loginRouter = require("./routers/loginRouter");
const showRouter = require("./routers/showRouter");
const removeRouter = require("./routers/removeRouter");
const homeRouter = require("./routers/homeRouter");

app.use(cors());
app.use(express.json());

app.use("/adduser", adduserRouter);
app.use("/account", accountRouter);
app.use("/login", loginRouter);
app.use("/show", showRouter);
app.use("/remove", removeRouter);
app.use("/home", homeRouter);

app.listen(4000, () => {
  console.log("Server Start at Port 4000!🚀🚀");
});
