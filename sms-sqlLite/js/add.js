/**
 * Created by 大大大太阳 on 2016/10/11.
 */

$(function () {
    $("#addForm").off();
    $("#addForm").submit(function () {
        var id = $(this).find("[name='id']").val();
        var name = $(this).find("[name='name']").val();
        var age = $(this).find("[name='age']").val();
        var gender = $(this).find("[name='gender']").val();
        var address= $(this).find("[name='address']").val();
        var student = new Student(id,name,age,gender,address);
        //调用保存方法
        save(student,function () {
            alert("保存学生成功");
        });

        $("#addForm").get(0).reset();
    });
});