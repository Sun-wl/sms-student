/**
 * Created by 大大大太阳 on 2016/10/13.
 */
$(function () {
    $("#updateForm").find(".id").text(localStorage.getItem("id"));
    $("#updateForm").find("[name='name']").val(localStorage.getItem("name"));
    $("#updateForm").find("[name='gender']").val(localStorage.getItem("gender"));
    $("#updateForm").find("[name='age']").val(localStorage.getItem("age"));
    $("#updateForm").find("[name='address']").val(address = localStorage.getItem("address"));

    $("button").eq(0).off();
    $("button").eq(0).click(function () {
        var name = $("#updateForm").find("[name='name']").val();
        var age = $("#updateForm").find("[name='age']").val();
        var gender = $("#updateForm").find("[name='gender']").val();
        var address= $("#updateForm").find("[name='address']").val();
        var student = new Student(name,gender,age,address);
        //调用保存方法
        save(student,function () {
            alert("修改成功");
        });

    });

});