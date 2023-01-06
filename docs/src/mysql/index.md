
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