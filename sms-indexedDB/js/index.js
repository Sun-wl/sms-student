/**
 * Created by 大大大太阳 on 2016/10/11.
 * 首页
 */

//将学生信息遍历在首页
function reload(){
    findAllStudents(function (result) {
        var result = result;
        $("table.tb1>tbody").children(":not(:first)").remove();
        result.forEach(function (item) {
            var newTr = $("table.tb1>tbody>tr.hiddenTr").clone().removeClass("hiddenTr");
            // console.log(typeof item.id);
            newTr.find(":checkbox").val(item.id);
            newTr.children().eq(1).html(item.name);
            newTr.children().eq(2).html(item.gender);
            newTr.children().eq(3).html(item.age);
            newTr.children().eq(4).html(item.address);

            $("table.tb1>tbody").append(newTr);
        });
    });
}

$(function () {
    reload();
    //删除
    $("button.delete").click(function () {
        var ips = $(":checkbox:checked");
        // console.log(ips);
        ips.each(function (index,item){
            var id = +item.value;
            // console.log(typeof id);
            deleteStudent(id,function () {
                alert("删除成功");
                reload();
            });
        });

    });
    //查询
    $("button.search").click(function () {
        var id = +$("input[type='search']").val();
        // console.log(id);
        if(id){
            search(id,function (result) {
                var result = result;
                // console.log(result);
                $("table.tb1>tbody").children(":not(:first)").remove();
                var newTr = $("table.tb1>tbody>tr.hiddenTr").clone().removeClass("hiddenTr");
                // console.log(typeof item.id);
                newTr.find(":checkbox").val(result.id);
                newTr.children().eq(1).html(result.name);
                newTr.children().eq(2).html(result.gender);
                newTr.children().eq(3).html(result.age);
                newTr.children().eq(4).html(result.address);
                $("table.tb1>tbody").append(newTr);
            });
        }else{
            alert("请输入正确的id");
            reload();
        }
    });
    //修改
    $("button.update").click(function () {
        var id = +$(":checkbox:checked").val();
        // console.log(id);
        if(id){

            search(id,function (result) {
                console.log(result);
                localStorage.setItem("id",result.id);
                localStorage.setItem("name",result.name);
                localStorage.setItem("gender",result.gender);
                localStorage.setItem("age",result.age);
                localStorage.setItem("address",result.address);

            });
            deleteStudent(id,function () {

            });
            $(this).children("a").attr("href","student_update.html");
        }else{
            alert("请选定学生");
        }



    });
    
});