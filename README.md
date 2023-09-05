# Big-data-platform-front-end
大数据平台前端开发
## 安装
vue2.6  
typescript   
node.js-14.17.3  
vue-cli
## 页面结构
```
├──                      # 总体页面目录
│   ├── 首页             #三个搜索和查询语法功能
│   ├── 日志管理             #日志的增删查改
│   ├── 证据链             
│   │   ├──证据链查看       # 只有证据链的搜索功能
│   │   ├── 证据链管理          # 证据链的增删查改
│   ├── 关联规则             
│   │   ├──关联规则查看       # 只有关联规则的搜索功能
│   │   ├── 关联规则管理          # 关联规则的增删查改
│   ├── 证据管理             
│   │   ├──证据查看       # 只有证据的搜索功能
│   │   ├── 证据管理          # 证据的增删查改         
```
## 登录身份
auditor：审计员为系统的低阶使用者，可以有若干名（0-N），auditor为默认的审计员，可以删除，也可以被变更权限。审计员对系统仅有查看和检索权限，不具备对实际业务数据的增删改等权限。审计员可以修改自身密码，头像，账户名等信息。  
operator：操作员为系统的高阶使用者，可以有若干名（0-N），operator为默认的操作员，可以删除，也可以被变更权限。操作员可以对实际业务进行任意处理，拥有对实际业务的全部权限。但不可对账户进行变更，比如不可增加各种用户，仅能修改自身的密码，头像，账户名等信息。  
admin:系统管理员为系统的维护者，可以有若干名（1-N），不涉及系统实际业务处理，类似网管。root_admin为默认的系统管理员账户，该账户不可被删除，不可被变更权限。系统管理员可以添加删除账户，可以给账户赋予操作权限等，但不可操作实际业务，比如不可删除对数据进行增删改查等。 
ps：目前mock模拟代码中任意密码都可以登录系统，前端已做密码校验。
## 接口设计
1、登录页  
系统开始先进入登录页面，选择是系统管理员还是用户  
GET /login  
参数：无。调用 /login 返回登录页。  
2、登录系统  
POST /login  
参数：username，password。登录成功返回cookie。  
3、初始化  
GET /init  
参数：cookie。  
前端拿到cookie，用cookie访问，访问成功返回各个页面，初始化系统。  
4、新增  
GET[POST] /new? table_id=1  
参数：cookie，table_id，json{要修改的内容}  
前端根据用户点击，生成table_id，并带上cookie访问详情。  
5、修改  
GET[POST] /modify? table_id=1& item_id=1  
参数：cookie，table_id，item_id，json{要修改的内容}  
前端根据用户点击，生成table_id，item_id，带上cookie访问详情。  
6、删除  
GET /delete? table_id=1& item_id=1  
参数：cookie，table_id，item_id  
前端根据用户点击，生成table_id，item_id，带上cookie删除。  
7、分页展示  
GET /show? table_id=1&page_id=1  
参数：cookie，table_id，page_id  
前端根据用户点击，生成table_id，page_id，带上cookie分页查询。  
8、检索  
POST /show? table_id=1& page_id=1  
参数：cookie，table_id，page_id，查询语句  
前端根据用户点击，生成table_id，page_id，带上cookie分页查询。  
9、查询语句展示  
GET /show_search? table_id=1  
参数：cookie，table_id  
前端根据用户点击，生成table_id，带上cookie查询。  
10、修改系统配置  
POST /modify? table_id=0& item_id=1  
参数：cookie，table_id，item_id，json{要修改的内容}  
前端根据用户点击，生成table_id，item_id，带上cookie访问详情。  
todo：目前未在前端加修改系统配置功能。  
## 数据库表
请参考文档：数据库表（功能完善版）  
## 运行
npm run serve  
运行命令“npm run serve”之后实际上是启动了两个命令：  

前端:npx vue-cli-service serve   

后端模拟：cd mock && npx ts-node-dev mock-server.ts  

可以在两个窗口分别运行命令进行调试。  



