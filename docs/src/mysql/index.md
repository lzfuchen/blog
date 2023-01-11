
## sql 分类

`DDL`: Data Definition language，数据定义语言，用来定义数据库对象（数据库，表，字段）
`DML`: Data Manipulation language，数据操作语言，用来对数据库表中的数据进行增删改  
`DQL`: Data Query language，数据查询语言，用来查询数据库中表的记录  
`DCL`: Data Control language，数据控制语言，用来创建数据库用户、控制数据库的访问权限

## DDL

数据库操作
```sql
-- 查询所有数据库
SHOW DATABASES;
-- 查询当前数据库
SELECT DATABASE(); 
-- 创建
CREATE DATABASE [IF NOT EXISTS] 数据库名 [DEFAULT CHARSET 字符集] [COLLATE 排序规则];
-- 删除
DROP DATABASE [IF EXISTS] 数据库名;
-- 使用
USE 数据库名;
```

表操作-创建
```sql
-- 查询当前数据库所有表
SHOW TABLES;
-- 查询表结构
DESC 表名;
-- 查询指定表的建表语句
SHOW CREATE TABLE 表名;
-- 创建
CREATE TABLE 表名(
  字段1 字段1类型 [COMMENT 字段1注释],
  ......
  字段n 字段n类型 [COMMENT 字段n注释]
)[COMMENT 表注释]
```
[数据类型](https://www.runoob.com/mysql/mysql-data-types.html)

`MySql`中的数据类型有很多，主要分为三类：数值类型、字符串类型、日期时间类型。

表操作-修改

```sql
-- 添加字段
ALTER TABLE 表名 ADD 字段名 类型 [COMMENT 注释] [约束];

-- 修改数据类型
ALTER TABLE 表名 MODIFY 字段名 新数据类型;

-- 修改字段名和字段类型
ALTER TABLE 表名 CHANGE 旧字段名 新字段名 类型 [COMMENT 注释] [约束];

-- 删除字段
ALTER TABLE 表名 DROP 字段名;

-- 修改表名
ALTER TABLE 表名 RENAME TO 新表名;

-- 删除表
DROP TABLE [IF EXISTS] 表名;

-- 删除指定表，并重新创建该表
TRUNCATE TABLE 表名;
```
## DML

插入数据时，指定的字段顺序需要与值的顺序是--对应的  
字符串和日期型数据应该包含在引号中  
插入的数据大小，应该在字段的规定范围内  

```sql
--- INSERT 添加数据
-- 给指定字段添加数据
INSERT INTO 表名 (字段名1, 字段名2, ...) VALUES (值1, 值2, ...);
-- 给全部字段添加数据
INSERT INTO 表名 VALUES (值1, 值2, ...);
-- 批量添加数据
INSERT INTO 表名 (字段名1, 字段名2, ...) VALUES (值1, 值2, ...),(值1, 值2, ...),(值1, 值2, ...);
INSERT INTO 表名 VALUES (值1, 值2, ...),(值1, 值2, ...),(值1, 值2, ...);

-- UPDATE 修改数据
UPDATE 表名 SET 字段名1=值1,字段名2=值2, ...[WHERE 条件];

-- DELETE 删除数据
DELETE FROM 表名 [WHERE 条件];
```

## DQL

```sql
SELECT
      字段列表
FROM
      表名列表
WHERE 
      条件列表
GROUP BY
      分组字段列表
HAVING
      分组后条件列表
ORDER BY
      排序字段列表
LIMIT
      分页参数
```

```sql
-- 基本查询
-- 查询多个字段
SELECT 字段1,字段2,...FROM 表名;
SELECT * FROM 表名;
-- 设置别名
SELECT 字段 [AS 别名]...FROM 表名;
-- 去除重复记录
SELECT DISTINCT 字段列表 FROM 表名;
-- 条件查询
SELECT 字段列表 FROM 表名 WHERE 条件列表;
```
where 条件
|比较运算符| 功能 |
|---|---|
| > | 大于 |
| >= | 大于等于 |
| < | 小于 |
| <= | 小于等于 |
| = | 等于 | 
| <> 或 != | 不等于|
| BETWEEN ... AND ...| 在某个范围之内（含最小、最大值）|
| IN(...) | 在in之后的列表中的值，多选一 | 
| LIKE 占位符 | 模糊匹配（_配置单个字符，%匹配任意个字符) | 
| IS NULL | 是NULL| 

| 逻辑运算符 | 功能 |
|---|---|
| AND 或 && | 并且（多个条件同时成立) |
| OR 或 \|\| | 或者（多个条件任意一个成立） |
| NOT 或者 ! | 非，不是 |

聚合函数
将一列数据作为一个整体，进行纵向计算。
| 函数 | 功能 |
|---|---|
| count | 统计数量 | 
| max | 最大值 | 
| min | 最小值 | 
| avg | 平均值 |
| sum | 求和 |

分组查询

```sql
SELECT 字段列表 FROM 表名 [WHERE 条件] GROUP BY 分组字段名 [HAVING 分组后过滤条件];
```

where 与 having 区别

* 执行时机不同：where是分组之前进行过滤，不满足where条件，不参与分组；而having是分组之后对结果进行过滤。  
* 判断条件不同：where不能对聚合函数进行判断，而having可以。  
* 执行顺序： where > 聚合函数 > having
* 分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段无任何意义

排序查询

* ASC： 升序（默认值）
* DESC: 降序

```sql
SELECT 字段列表 FROM 表名 ORDER BY 字段1 排序方式, 字段2 排序方式;
```

分页查询

* 起始索引从0开始，起始索引 = （pageNo - 1） * pageSize

```sql
SELECT 字段列表 FROM 表名 LIMIT 起始索引, 查询记录数;
```

执行顺序

FROM -> WHERE -> GROUP BY  HAVING-> SELECT -> ORDER BY -> LIMIT

## DCL

管理用户

* 主机名key使用`%`通配，这类SQL开发人员操作比较少，主要是DBA

```sql
-- 查询用户
USE mysql;
SELECT * FROM user;

-- 创建用户
CREATE USER '用户名'@'主机名' IDENTIFIED BY '密码';

-- 修改用户密码
ALTER USER  '用户名'@'主机名' IDENTIFIED WITH mysql_native_password BY '新密码';

-- 删除用户
DROP USER '用户名'@'主机名';
```

权限控制

| 权限 | 说明 |
| --- | --- |
| ALL,ALL PRIVILEGES | 所有权限 |
| SELECT | 查询数据 |
| INSERT | 插入数据 | 
| UPDATE | 修改数据 |
| DELETE | 删除数据 |
| ALTER | 修改表 |
| DROP | 删除数据库/表/视图 |
| CREATE | 创建数据库/表 |

```sql
-- 查询权限
SHOW GRANTS FOR '用户名'@'主机名';
-- 授予权限
GRANT 权限列表 ON 数据库名.表名 TO '用户名'@'主机名';
-- 撤销权限
REVOKE 权限列表 ON 数据库名.表名 FROM '用户名'@'主机名';
```

## 函数

### 字符串函数

常用函数如下：
| 函数 | 功能 |
|---|---|
| CONCAT(S1,S2,...Sn) | 字符串拼接，将S1,S2,..Sn拼接成一个字符串 | 
| LOWER(str) | 将字符串str全部转为小写 |
| UPPER(str) | 将字符串str全部转为大写 |
| LPAD(str, n, pad) | 左填充，用字符串pad对str的左边进行填充，达到n个字符串长度 | 
| RPAD(str, n, pad) | 右填充，用字符串pad对str的右边进行填充，达到n个字符串长度 | 
| TRIM(str) | 去掉字符串头部和尾部的空格 |
| SUBSTRING(str, start, len) | 返回字符串str从start位置起的len个长度的字符串 | 

### 数值函数

常用函数如下：
| 函数 | 功能 |
|---|---|
| CEIL(x) | 向上取整 | 
| FLOOR(x) | 向下取整 | 
| MOD(x, y) | 返回x/y的模 | 
| RAND() | 返回0-1内的随机数 | 
| ROUND(x,y) | 求参数x的四舍五入的值，保留y位小数 | 


### 日期函数
| 函数 | 功能 |
|---|---|
| CURDATE() | 放回当前日期 | 
| CURTIME() | 放回当前时间 | 
| NOW() | 放回当前日期和时间 | 
| YEAR(date) | 获取指定date的年份 | 
| MONTH(date) | 获取指定date的月份 | 
| DAY(date) | 获取指定date的日期 | 
| DATE_ADD(date, INTERVAL expr type) | 返回一个日期/时间值加上一个时间间隔expr后的时间值 | 
| DATEDIFF(date1,date2) | 返回起始时间date1和结束时间date2之间的天数 | 

### 流程函数

| 函数 | 功能 |
|---|---|
| IF(value,t,f) | 如果value为true，则返回t，否则返回f | 
| IFNULL(value1, value2) | 如果value1不为空，返回value1，否则返回value2 | 
| CASE WHEN [val1] THEN [res1] ... ELSE [default] END | 如果val1为true，返回res1，...否则返回default默认值 |
| CASE [expr] WHEN [val1] THEN [res1] ... ELSE [default] END | 如果expr的值等于val1，返回res1，...否则返回default默认值 | 

## 约束

* 概念：约束是作用域表中字段上的规则，用于限制存储在表中的数据。
* 目的：保证数据库中数据的正确、有效性和完整性

| 约束 | 描述 | 关键字 |
|---|---|---|
| 非空约束 | 限制该字段的数据不能为null | NOT NULL | 
| 唯一约束 | 保证该字段的所有数据都是唯一、不重复的 | UNIQUE |
| 主键约束 | 主键是一行数据的唯一标识，要求非空且唯一 | PRIMARY KEY |
| 默认约束 | 保存数据时，如果未指定该字段的值，则采用默认值 | DEFAULT |
| 检查约束(8.0.16版本之后) | 保证字段值满足某一个条件 | CHECK |
| 外键约束 | 用来让两张表的数据之间建立连接，保证数据的一致性和完成性 | FOREIGN KEY | 

### 外键约束

```sql
-- 添加外键
CREATE TABLE 表名(
      字段名 数据类型,
      ...
      [CONSTRAINT] [外键名称] FOREIGN KEY(外键字段名) REFERENCES 主表(主表列名)
);

ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY(外键字段名) REFERENCES 主表(主表列名);

-- 删除外键
ALTER TABLE 表名 DROP FOREIGN KEY 外键名称;
```

删除/更新行为

| 行为 | 说明 |
| --- | --- |
| NO ACTION | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新(与 RESTRICT 一致) |
| RESTRICT | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新(与 NO ACTION 一致) |
| CASCADE |  当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则也删除/更新外键在子表中的记录 |
| SET NULL | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则设置子表中该外键值为null（这要求外键允许为null）|
| SET DEFAULT | 父表有变更时，子表将外键列设置成一个默认的值（Innodb 不支持）|

```sql
ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY(外键字段名) REFERENCES 主表(主表列名) ON UPDATE CASCADE ON DELETE CASCADE;
```

## 多表查询

项目开发中，在进行数据库结构设计时，会根据业务需求及业务模块之间的关系，分析并设计表结构，由于业务之间相互关联，所以各个表结构之间也存在着各种联系，基本上分为三种：

### 多表关系

* 一对多（多对一）：在多的一方建立外键，指向一的一方的主键
* 多对多：建立第三张中间表，中间表至少包含两个外键，分别关联两方的主键
* 一对一：多用于单表拆分，将一张表的基础字段放在一张表中，其它详情字段放在另一张表中，以提升操作效率。在任意一方加入外键，关联另外一方的主键，并且设置外键为唯一的(UNIQUE)  

### 多表查询概述

多表查询分类  
连接查询  
&emsp;&emsp;内连接：相当于查询A,B交集部门数据  
&emsp;&emsp;外连接：  
&emsp;&emsp;&emsp;&emsp;左外连接：查询左表所有数据，以及两张表交集部分数据  
&emsp;&emsp;&emsp;&emsp;右外连接：查询右表所有数据，以及两张表交集部分数据  
&emsp;&emsp;自连接：当前表与自身的连接查询，自连接必须使用表别名  

子查询
&emsp;&emsp; SQL语句中嵌套`SELECT`语句，成为嵌套查询，又称子查询

### 内连接

查询的是两张表交集的部分

隐式内连接
```sql
SELECT 字段列表 FROM 表1, 表2 WHERE 条件...;
```
显示内连接
```sql
SELECT 字段列表 FROM 表1 [INNER] JOIN 表2 ON 连接条件...;
```

### 外连接

左外连接
```sql
SELECT 字段列表 FROM 表1 LEFT [OUTER] JOIN 表2 ON 条件...;
```

右外连接
```sql
SELECT 字段列表 FROM 表1 RIGHT [OUTER] JOIN 表2 ON 条件...;
```
### 自连接

```sql
SELECT 字段列表 FROM 表1 别名A JOIN 表A 别名B ON 条件...;
```

联合查询
 
对于`union`查询，就是把多次查询的结果合并起来，形成一个新的查询结果集，多张表的列表列数必须保持一致，字段类型也需要保持一致  
`union all` 会将全部的数据直接合并在一起，`union`会对合并之后的数据去重

```sql
SELECT 字段列表 FROM 表A
UNION [ALL]
SELECT 字段列表 FROM 表B
```

### 子查询

```sql
SELECT * FROM t1 WHERE column1 = (SELECT column1 FROM t2);
```
* 子查询外部的语句可以是`INSERT`/`UPDATE`/`DELETE`/`SELECT`的任何一个

根据子查询结果不同，分为：  
* 标量子查询（子查询结果为单个值）  
* 列子查询（子查询结果为一列）：常用操作符 `IN`、`NOT IN`、`ANY`、`SOME`、`ALL`  
* 行子查询（子查询结果为一行）：常用操作符 `=`、`<>`、`IN`、`NOT IN`  
* 表子查询（子查询结果为多行多列）常用操作符 `IN`  

根据子查询位置，分为：`WHERE`之后、`FROM`之后、`SELECT`之后  

| 操作符 | 描述 |
| --- | --- |
| IN | 在指定的集合范围之内，多选一 |
| NOT IN | 不在指定的集合范围之内 |
| ANY | 子查询返回列表中，有任意一个满足即可 |
| SOME | 与ANY等同，使用SOME的地方都可以使用ANY |
| ALL | 子查询返回列表的所有值都必须满足 |

## 事务

 `事务`是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系统提交或撤销操作请求，即这些操作`要么同时成功，要么同时失败`  

 查看/设置事务提交方式
 ```sql
SELECT @@autocommit;
--  0：手动提交， 1：自动提交
SET @@autocommit = 0;
--  手动开启事务
start transaction 
-- 提交事务
COMMIT;
-- 回滚事务
ROLLBACK;
 ```

 事务四大特性：  
 * 原子性(Atomicity)：事务是不可分割的最小操作单元，要么全部成功，要么全部失败
 * 一致性(Consistency)：事务完成时，必须使所有的数据都保持一致状态
 * 隔离性(Isolation)：数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立环境运行
 * 持久性(Durability)：事务一旦提交或回滚，它对数据库中的数据的改变就是永久的  

 并发事务问题

 | 问题 | 描述 |
 | --- | --- |
 | 脏读 | 一个事务读到另外一个事务还没有提交的数据 |
 | 不可重复读 | 一个事务先后读取同一条记录，但两次读取的数据不同，称之为不可重复读 |
 | 幻读 | 一个事物按照查询条件查询数据时，没有对应的数据行，但是在插入数据时，又发现这行数据已经存在 | 

 事务隔离级别

| 隔离级别 | 脏读 | 不可重复读 | 幻读 |
| --- | :---: | :---: | :---: |
| Read uncommitted | ✅ | ✅ | ✅ |
| Read committed | ❌ | ✅ | ✅ |
| Repeatable Read(默认) | ❌ | ❌ | ✅ |
| Serializable | ❌ | ❌ | ❌ |

```sql
-- 查看事务隔离级别
SELECT @@TRANSACTION_ISOLATION;
-- 设置事务隔离级别
SET [SESSION|GLOBAL] TRANSACTION ISOLATION LEVEL [READ UNCOMMITTED | READ COMMITTED | REPEATABLE-READ | SERIALIZABLE];
```