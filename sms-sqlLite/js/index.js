/**
 * Created by 大大大太阳 on 2016/10/11.
 * 首页
 */



$(function () {
    reload();
    //删除
    $("button.delete").click(function () {
        var ips = $(":checkbox:checked");
        console.log(ips);
        ips.each(function (index,item) {
            var id = item.value;
            console.log(id);
            del(id);
            reload();
        });
    });

    //查询
    $("button.search").click(function () {
        var id = $("input[type='search']").val();
        search(id,function (row) {
            console.log(row);
            // console.log($(".tb1>tbody").children(":not(:first)"));
            $(".tb1>tbody").children(":not(:first)").remove();
            var newTr = $("table.tb1>tbody>tr.hiddenTr").clone().removeClass("hiddenTr");
            newTr.find(":checkbox").val(row.id);
            newTr.children().eq(1).html(row.name);
            newTr.children().eq(2).html(row.gender);
            newTr.children().eq(3).html(row.age);
            newTr.children().eq(4).html(row.address);

            $("table.tb1>tbody").append(newTr);



        })
    });

    //修改
    $("button.update").click(function () {
        var id = $(":checkbox:checked").val();
        // console.log(id);
        if(id){

            del(id);
            search(id,function (row) {
                // console.log(row);
                localStorage.setItem("id",row.id);
                localStorage.setItem("name",row.name);
                localStorage.setItem("gender",row.gender);
                localStorage.setItem("age",row.age);
                localStorage.setItem("address",row.address);
            });
            $(this).children("a").attr("href","student_update.html");
        }else{
            alert("请选定学生");
            $(this).children("a").removeAttr("href");
        }

    });

});