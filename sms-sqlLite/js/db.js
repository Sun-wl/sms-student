/**
 * Created by 大大大太阳 on 2016/10/11.
 *
 * 负责数据库链接的js
 */
//创建数据库
function getDB() {
    var db = window.openDatabase("sms","1.0","student manager system db",2*1024*1024);
    return db;
}
//创建数据库表
(function () {
    var db = getDB();
    db.transaction(function (transaction) {
        var sql = "CREATE TABLE IF NOT EXISTS tbl_student(id INTEGER,name TEXT,gender TEXT,age INTEGER,address TEXT)";
        transaction.executeSql(sql);
    });
})();

function Student(id,name,age,gender,address) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.address = address;
}
//保存
function save(student,handler) {
    if(student instanceof Student){
        var db = getDB();
        db.transaction(function (transaction) {
            var sql = "select * from tbl_student where id=?";
            transaction.executeSql(sql,[student.id],function (transaction,result) {
                var rows = result.rows;
                // console.log(rows);
                if(rows.length){
                    alert("该id已存在");
                }else if(!student.id||!student.name||!student.gender||!student.age||!student.address){
                    alert("不能有空");
                }else{
                    db.transaction(function (transaction) {
                        var sql = "insert into tbl_student values(?,?,?,?,?)";
                        transaction.executeSql(sql,[student.id,student.name,student.gender,student.age,student.address],function () {
                            handler(event);
                        });

                    });
                }
            });
        });


    }else{
        alert("数据有误");
    }
}
//删除
function del(id) {
    var db = getDB();
    db.transaction(function (transaction) {
        var sql = "delete from tbl_student where id=?";
        transaction.executeSql(sql,[id],function (transaction,result) {
            alert("删除成功");
        });
    });
}
//获取所有学生信息
function getStudents(handler) {
    var db = getDB();
    db.transaction(function (transaction) {
        var sql = "select * from tbl_student";
        transaction.executeSql(sql,[],function (transaction,result) {
            var rows = result.rows;
            handler(rows);
            // console.log(rows);
        });
    });
}
//将学生信息遍历
function reload() {
    getStudents(function (rows) {
        $(".tb1>tbody").children(":not(:first)").remove();
        for(var i=0;i<rows.length;i++){
            var obj = rows[i];
            // console.log(obj);
            var newTr = $("table.tb1>tbody>tr.hiddenTr").clone().removeClass("hiddenTr");
            newTr.find(":checkbox").val(obj.id);
            newTr.children().eq(1).html(obj.name);
            newTr.children().eq(2).html(obj.gender);
            newTr.children().eq(3).html(obj.age);
            newTr.children().eq(4).html(obj.address);
            $("table.tb1>tbody").append(newTr);
        }
    });
}
//根据id查询
function search(id,handler) {
    var db = getDB();
    db.transaction(function (transaction) {
        var sql = "select * from tbl_student where id=?";
        transaction.executeSql(sql,[id],function (transaction,result) {
            var rows = result.rows;
            // console.log(rows);
            if(rows.length){
                var row = rows[0];
                // console.log(row);
            }else{
                alert("没有该学生");
                reload();
            }
            handler(row);
        });
    });
}