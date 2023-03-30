
## 索引

索引（index）是帮助`MySql`高效获取数据的数据结构（有序）。在数据之外，数据库系统还维护着满足特定查找算法的数据结构，这些数据结构以某种方式引用（指向）数据，这样就可以在这些数据结构上实现高级查找算法，这种数据结构就是索引。

| 优势 | 劣势 | 
| --- | --- |
| 提高数据检索的效率，降低数据库的IO成本 | 索引列也是要占用空间的 |
| 通过索引列对数据进行排序，降低数据排序的成本，降低CPU的消耗 | 索引大大提高了查询效率，同时却也降低了更新表的速度，如对表进行INSERT、UPDATE、DELETE时，效率降低。|

索引分类
| 分类 | 含义 | 特点 | 关键字 |
| --- | --- | --- | --- |
| 主键索引 | 针对于表中主键创建的索引 | 默认自动创建，只能有一个 | PRIMARY | 
| 唯一索引 | 避免同一个表中某数据列中的值重复 | 可以有多个 | UNIQUE | 
| 常规索引 | 快速定位特定数据 | 可以有多个  | |
| 全文索引 | 全文索引查找的是文本中的关键词，而不是比较索引中的值 | 可以有多个 | FULLTEXT |   

在InnoDB存储引擎中，根据索引的存储形式，又可以分为以下两种

| 分类 | 含义 | 特点 |
| --- | --- | --- |
| 聚集索引(Clustered Index) | 将数据存储与索引放到了一块，索引结构的叶子节点保存了行数据 | 必须有，而且只有一个 |
| 二级所用(Secondary Index) | 将数据与索引分开存储，索引结构的叶子结点关联的是对应的主键 | 可以存在多个 |

聚集所用选取规则：
* 如果存在主键，主键索引就是聚集索引
* 如果不存在主键，将使用第一个唯一(UNIQUE)索引作为聚集索引
* 如果表没有主键，或没有合适的唯一索引，则 `InnoDB`会自动生成一个rowid作为隐藏的聚集索引

```sql
-- 创建索引
CREATE [UNIQUE | FULLTEXT] INDEX index_name ON table_name (index_col_name,...);
-- 查看索引
SHOW INDEX FROM table_name;
-- 删除索引
DROP INDEX index_name ON table_name;
```

## SQL性能分析

### Sql 执行频次  

MySql 客户端连接成功后，通过 `show [session | global] status` 命令可以提供服务器状态信息。通过如下指令，可以查看当前数据库的INSERT、UPDATE、DELETE、SELECT 的访问频次

```sql
SHOW GLOBAL STATUS LIKE 'Com_______';
``` 

### 慢查询日志  

慢查询日志记录了所有执行时间超过指定参数（long_query_time，单位：秒，默认10秒）的所有SQL语句的日志。  
MySql的慢查询日志默认没有开启，需要再MySql的配置文件(/etc/my.cnf)中配置如下信息：

```yaml
# 开启MySql慢日志查询开关
slow_query_log=1
# 设置慢日志的时间为2秒，sql语句执行时间超过2秒，就会视为慢查询，记录慢查询日志
long_query_time=2
```

### profile详情  

`show profiles`能够在做sql优化时帮助我们了解时间都耗费到哪里去了。通过have_profiling参数，能够看到当前Mysql是否支持profile操作

```sql
SELECT @@have_profiling;
```

默认profiling是关闭的，可以通过set语句在session/global级别开启profiling

```sql
SELECT @@profiling;
-- 开启
SET profiling = 1;

-- 查看每一条SQL的耗时基本情况
show profiles;

-- 查看指定query_id的SQL语句各个阶段的耗时情况
show profile for query query_id;

-- 查看指定query_id的SQL语句CPU的使用情况
show profile cpu for query query_id;

```

### explain 执行计划

 EXPLAIN 或者 DESC 命令获取 MySql 如何执行 SELECT 语句的信息，包括在 SELECT 语句执行过程中表如何连接和连接的顺序

 ```sql
-- 直接在 select 语句之前加上关键字 explain/desc
EXPLAIN SELECT 字段列表 FROM 表名 WHERE 条件;
 ```

 EXPLAIN 执行计划各字段含义：

* id   
select查询的序列号，表示查询中执行select字句或者是操作表的顺序(id相同，执行顺序从上到下；id不同，值越大，越先执行)

* select_type   
表示select的类型，常见的取值有SIMPLE（简单表，即不使用表连接或者子查询）、PRIMARY（主查询，即外层的查询）、UNION（UNION中的第二个或者后面的查询语句）、SUBQUERY（SELECT/WHERE之后包含了子查询）等

* type   
表示连接类型，性能由好到差的连接类型为 NULL、system、const、er_ref、ref、range、index、all

* possible_key   
显示可能应用在这张表上的索引，一个或多个。

* key   
实际使用的索引，如果为 NULL，则没有使用索引

* key_len   
表示索引中使用的字节数，该值为索引字段最大可能长度，并非实际使用长度，在不损失精确性的前提下，长度越短越好。

* rows   
MySQL认为必须要执行查询的行数，在innodb引擎的表中，是一个估计值，可能并不总是准确的

* filtered   
表示返回结果的行数占需读取行数的百分比，filtered的值越大越好

### 索引使用

* 最左前缀法则   
如果索引了多列（联合索引），要遵守最左前缀法则。最左前缀法则指的是查询从索引的最左列开始，并且不跳过索引中的列。如果跳跃某一列，***索引将部分失效（后面的字段索引失效）。***

* 范围查询   
联合索引中，出现范围查询(>,<)，***范围查询右侧的列索引失效。***
 
* 索引列运算   
不要在索引列上进行运算操作，***索引将失效***

* 字符串不加引号
字符串类型字段使用时，不加引号，***索引将失效***

* 模糊查询
如果仅仅是尾部模糊匹配，索引不会失效。如果是头部模糊匹配，索引失效。

* or连接的条件   
用or分割开的条件，如果or前的条件中的列有索引，而后面的列中没有索引，那么涉及的索引都不会被用到。

* 数据分布影响   
如果MySQL评估使用索引比全表更慢，则不适用索引。

* SQL提示   
SQL提示：是优化数据库的一个重要手段，简单来说，就是在SQL语句中加入一些人为的提示来达到优化操作的目的。

```sql
# use index 建议使用哪个索引
select * from tb_user use index(idx_user_pro);
# ignore index 忽略哪个索引
select * from tb_user ignore index(idx_user_pro);
# force index 必须使用哪个索引
select * from tb_user force index(idx_user_pro);
```

* 覆盖索引
尽量使用覆盖索引（查询使用了索引，并且需要返回的列，在该索引中已经全部能够找到），减少select * 

* 前缀索引   
当字段类型为字符串(varchar, text 等时，有时候需要索引很长的字符串，这会让索引变得很大，查询时，浪费大量的磁盘IO，影响查询效率。此时可以只将字符串的一部分前缀，建立索引，这样可以大大节约索引空间，从而提高索引效率。

- 前缀长度：可以根据索引的选择性来决定，而选择性是指不重复的索引中（基数）和数据表的记录总数的比值，索引选择性越高则查询效率越高。唯一索引的选择性是1，这是最好的索引选择性，性能也是最好的。

```sql
# 创建前缀索引
create index idx_xxxx on table_name(column_name(n));
# 查看选择性
select count(distinct substring(email, 1, 5))/count(*) from tb_user;
```

### 索引设计原则

1. 针对于数据量较大，且查询比较频繁的表建立索引。
2. 针对于常作为查询条件（where）、排序（order by）、分组（group by）操作的字段建立索引。
3. 尽量选择区分度高的列作为索引，尽量建立唯一索引，区分度越高，使用索引的效率越高。
4. 如果是字符串类型的字段，字段的长度较长，可以针对于字段的特点，建立前缀索引。
5. 尽量使用联合索引，减少单列索引，查询时，联合索引很多时候可以覆盖索引，节省存储空间，避免回表，提高查询效率。
6. 要控制索引的数量，索引并不是多多益善，索引越多，维护索引结构的代价也就越大，会影响增删改的效率。
7. 如果索引列不能存储NULL值，请在创建表时使用NOT NULL约束它。当优化器知道每列是否包含NULL值时，它可以更好地确定哪个索引最有效地用于查询。