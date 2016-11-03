/**
 * Created by 大大大太阳 on 2016/10/11.
 */
$(function () {
    $("#addForm").off();
    $("#addForm").submit(function () {
        var name = $(this).find("[name='name']").val();
        var gender = $(this).find("[name='gender']").val();
        var age = $(this).find("[name='age']").val();
        var address = $(this).find("[name='address']").val();
        var student = new Student(name,gender,age,address);
        save(student,function () {
            alert("保存成功");
        });
        $("#addForm").get(0).reset();

    });
});