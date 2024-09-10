const express = require('express');
const path = require('path');
const methodOverride=require("method-override");
const flash=require("express-flash");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const moment=require("moment");


const bodyParser=require("body-parser");
const app = express();

//ghi sau app
app.use(methodOverride("_method"));


require("dotenv").config();
//body- parser
app.use(bodyParser.urlencoded({extended: false}));

//express - flash
app.use(cookieParser("keyboard cat"));
app.use(session(
   {cookie:{maxAge:60000}
}));
app.use(flash());

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

const database=require("./config/database");

const systemConfig=require("./config/system");
//require == import 
const route=require("./routes/client/index.route");
const routeAdmin=require("./routes/admin/index.route");


//app locals val để khai báo biến toàn cục để các file pug sử dụgn biến này
// biến là sau dấu .locals và chỉ dùng trong file pug
app.locals.prefixAdmin=systemConfig.prefixAdmin;
app.locals.moment=moment;

database.connect();

const port=process.env.PORT;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// trong file pug nên chỉ cần / còn nếu k trong pug thì ./
//để thêm __dirname/ trước các express.static để deploy app.
app.use(express.static(`${__dirname}/public`));
app.use('/admin/uploads', express.static(`${__dirname}/admin/uploads`));
//Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})