/**
 * Created by 大大大太阳 on 2016/10/11.
 *
 * 负责数据库链接的js
 */

var dbName = "sms";
var storeName = "student";
//创建数据库和对象仓库
(function init(dbName,storeName){
    var request = window.indexedDB.open(dbName);
    request.onupgradeneeded = function () {
        //创建数据库
        var db = this.result;
        //创建对象仓库
        if(db.objectStoreNames.contains(storeName)){
            db.deleteObjectStore(storeName);
        }
        db.createObjectStore(storeName,{
            keyPath:"id",
            autoIncrement:true
        });
    };
})(dbName,storeName);

//获取对象仓库
function getStore(dbName,storeName,handler) {
    //获取数据库
    var request = window.indexedDB.open(dbName);
    request.onsuccess = function () {
        //拿到数据库
        var db = this.result;
        //打开事务
        var transaction = db.transaction(storeName,"readwrite");
        //获取仓库
        var store = transaction.objectStore(storeName);
        // console.log(store);
        handler(store);
    }
};


//保存到数据库
function save(student,handler) {
    getStore(dbName,storeName,function (store) {
        if(student.name&&student.gender&&student.age&&student.address){
            var request = store.put(student);
            request.onsuccess = function (event) {
                handler(event);
            }
        }else{
            alert("不能有空");
        }

    });

}
//创建学生的构造函数
function Student(name,gender,age,address) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.address = address;
}

//查询所有学生
function findAllStudents(handler) {
    //查询
    getStore(dbName,storeName,function (store) {
        var request = store.getAll();
        request.onsuccess = function () {
            var result = this.result;
            handler(result);
        };
    });
}
//根据id查询单个学生
function search(key,handler) {
    //查询
    getStore(dbName,storeName,function (store) {
        var request = store.get(key);
        request.onsuccess = function (event) {
            if(this.result){
                var result = this.result;
                handler(result)
            }else{
                alert("该id不存在");
            }

        };
    });
}

//删除
function deleteStudent(key,handler) {
    getStore(dbName,storeName,function (store) {
        var request = store.delete(key);
        request.onsuccess = function (event) {
            handler(event);
        }
    })
}