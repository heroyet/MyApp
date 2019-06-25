<%@ page contentType="text/html;charset=gbk" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="com.apex.form.DataAccess" %>
<%@ page import="com.apex.util.*" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Date" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>合同审批表打印</title>
    <script language="javascript" src="LodopFuncs.js"></script>
    <script language="javascript" src="jquery-1.6.min.js"></script>
    <object id="LODOP_OB" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=0 height=0>
        <embed id="LODOP_EM" type="application/x-print-lodop" width=0 height=0 pluginspage="install_lodop32.exe"></embed>
    </object>

    <script language="javascript" type="text/javascript">
        function CheckIsInstall() {
            try{
                var LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));
                if ((LODOP!=null)&&(typeof(LODOP.VERSION)!="undefined"))/*"本机已成功安装过Lodop控件!\n  版本号:"+LODOP.VERSION)*/;
            }catch(err){
                alert("Error:本机未安装或需要升级!");
            }
        };
        CheckIsInstall();
    </script>
    <%String instId = (String)request.getParameter("instId");%>
</head>
<body>
<%
SimpleDateFormat dfs = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

StringBuffer content= new StringBuffer("");
ApexRowSet rs = null;
String rowInfo;
/*合同名称*/
String hetongmingcheng = "";
try {
String sql ="SELECT ht.FProjName FROM TE_ComDetPro ht where ht.id="+instId;
rs=ApexDao.getRowSet(DataAccess.getDataSource(), sql);
while(rs.next()){
rowInfo=rs.getString("FProjName");
content.append(rowInfo);
}
hetongmingcheng = content.toString();
} catch (SQLException e) {
e.printStackTrace();
}

%>

<style id="style1" type="text/css">

    body,table{
        font-size:16px;
    }
    table{
        table-layout:fixed;
        empty-cells:show;
        border-collapse: collapse;
        height:100%;
        width:92%;
        margin-top:30px;
        margin-left:30px;
        margin-left:30px;
        marign-bottom:30px;
    }
    .contractBottom{
        margin-left:30px;
        margin-top:10px;
        width:92%;
    }
    td{
        text-align:center;
    }
    h1{
        font-size:22px;
        margin:0;
        padding:0;
        text-align:center;
    }

    h2{
        font-size:17px;
        margin:0;
        padding:0;
        text-align:center;
    }

    .title { background: #FFF; border: 2px solid #9DB3C5; padding: 1px; width:90%;margin:20px auto; }
    .title h1 { line-height: 31px; text-align:center;  background: #2F589C url(th_bg2.gif); background-repeat: repeat-x; background-position: 0 0; color: #FFF; }
    .title th, .title td { border: 2px solid #CAD9EA; padding: 5px; }


    /*这个是借鉴一个论坛的样式*/
    table.t1{
        border:2px solid black;
        color:black;
    }
    table.t1 th {
        background-image: url(th_bg1.gif);
        background-repeat::repeat-x;

    }
    table.t1 td,table.t1 th{
        border:2px solid black;
        padding:0 1em 0;
    }
    table.t1 tr.a1{
        /*background-color:#f5fafe;*/
    }
    .left{
        text-align:left;
    }

</style>

<style id="style2" type="text/css">

    body,table{
        font-size:16px;
    }
    table{
        table-layout:fixed;
        empty-cells:show;
        border-collapse: collapse;
        height:95%;
        width:100%;
        margin:0 auto;
    }
    td{
        text-align:center;
    }
    h1{
        font-size:22px;
        margin:0;
        padding:0;
        text-align:center;
    }

    h2{
        font-size:17px;
        margin:0;
        padding:0;
        text-align:center;
    }

    .title { background: #FFF; border: 1px solid #9DB3C5; padding: 1px; width:90%;margin:20px auto; }
    .title h1 { line-height: 31px; text-align:center;  background: #2F589C url(th_bg2.gif); background-repeat: repeat-x; background-position: 0 0; color: #FFF; }
    .title th, .title td { border: 1px solid #CAD9EA; padding: 5px; }


    /*这个是借鉴一个论坛的样式*/
    table.t1{
        border:1px solid black;
        color:black;
    }
    table.t1 th {
        background-image: url(th_bg1.gif);
        background-repeat::repeat-x;

    }
    table.t1 td,table.t1 th{
        border:1px solid black;
        padding:0 1em 0;
    }
    table.t1 tr.a1{
        /*background-color:#f5fafe;*/
    }

    .contractBottom{
        margin-left:0px;
        margin-top:10px;
        width:92%;
    }



    /* button
    ---------------------------------------------- */
    .button {
        display: inline-block;
        zoom: 1; /* zoom and *display = ie7 hack for display:inline-block */
        *display: inline;
        vertical-align: baseline;
        margin: 0 2px;
        outline: none;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        font: 14px/100% Arial, Helvetica, sans-serif;
        padding: .5em 2em .55em;
        text-shadow: 0 1px 1px rgba(0,0,0,.3);
        -webkit-border-radius: .5em;
        -moz-border-radius: .5em;
        border-radius: .5em;
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2);
        -moz-box-shadow: 0 1px 2px rgba(0,0,0,.2);
        box-shadow: 0 1px 2px rgba(0,0,0,.2);
    }
    .button:hover {
        text-decoration: none;
    }
    .button:active {
        position: relative;
        top: 1px;
    }

    /* blue */
    .blue {
        color: #d9eef7;
        border: solid 1px #0076a3;
        background: #0095cd;
        background: -webkit-gradient(linear, left top, left bottom, from(#00adee), to(#0078a5));
        background: -moz-linear-gradient(top,  #00adee,  #0078a5);
        filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#00adee', endColorstr='#0078a5');
    }
    .blue:hover {
        background: #007ead;
        background: -webkit-gradient(linear, left top, left bottom, from(#0095cc), to(#00678e));
        background: -moz-linear-gradient(top,  #0095cc,  #00678e);
        filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#0095cc', endColorstr='#00678e');
    }
    .blue:active {
        color: #80bed6;
        background: -webkit-gradient(linear, left top, left bottom, from(#0078a5), to(#00adee));
        background: -moz-linear-gradient(top,  #0078a5,  #00adee);
        filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#0078a5', endColorstr='#00adee');
    }

</style>
<div style="margin:0 auto;">
    <div style="text-align:right;margin-bottom:20px;">
        <button onclick="prn1_preview()" class="button blue" value="打印">打印</button>
    </div>
    <div id="printContent" style="height:1128px;">
        <br/>
        <table id="print-content" border="1" cellpadding="0" cellspacing="0" style='border-collapse:collapse;table-layout:fixed;'>
            <colgroup>
                <col width="80 ">
                <col width="80 ">
                <col width="150 ">
                <col width="80 ">
                <col width="150 ">
                <col width="80 ">
                <col width="80 ">
            </colgroup>
            <tr height="20" style="text-align: center;font-size:18px">
                <td colspan="7">会签单</td>
            </tr>
            <tr height="20" style="text-align: center;font-size:14px">
                <td></td>
                <td colspan="2">流转</td>
                <td></td>
                <td colspan="3">会议</td>
            </tr>
            <tr height="20" style="text-align: center;font-size:14px">
                <td>名称</td>
                <td colspan="2">自动获取</td>
                <td>编号</td>
                <td colspan="3">自动获取</td>
            </tr>
            <tr height="20" style="text-align: center;font-size:14px">
                <td>主持</td>
                <td colspan="2">自动获取</td>
                <td>类型</td>
                <td colspan="3">自动获取</td>
            </tr>
            <tr height="20" style="text-align: center;font-size:14px">
                <td>人</td>
                <td colspan="2">自动获取</td>
                <td>日期</td>
                <td colspan="3">自动获取</td>
            </tr>
            <tr height="100" style="text-align: center;font-size:14px">
                <td rowspan="5">内容</td>
                <td colspan="6" rowspan="5">自动获取</td>
            </tr>
            <tr/>
            <tr/>
            <tr/>
            <tr/>
            <tr height="20" style="text-align: center;font-size:14px">
                <td>备注</td>
                <td colspan="6">自动获取</td>
            </tr>
            <tr height="24" style="text-align: center;font-size:16px">
                <td colspan="7">意见</td>
            </tr>
            <tr height="24" style="text-align: center;font-size:14px">
                <td>序号</td>
                <td>人</td>
                <td>部门</td>
                <td>意见</td>
                <td>时间</td>
                <td>节点</td>
                <td>状态</td>
            </tr>
            <tr height="20" style="text-align: center;font-size:14px">
                <td>1</td>
                <td>顾</td>
                <td>办公室</td>
                <td>同意！</td>
                <td>2018/5/14 15:21</td>
                <td></td>
                <td>已提交</td>
            </tr>
        </table>

    </div>
</div>
<script type="text/javascript">
    var LODOP; //声明为全局变量
    function prn1_preview() {
        CreateOneFormPage();
        LODOP.SET_PRINT_PAGESIZE(0,0,0,"A4");
        LODOP.PREVIEW();
    };
    function CreateOneFormPage() {
        LODOP=getLodop();
        var strBodyStyle="<style>"+document.getElementById("style1").innerHTML+"</style>";
        var bo = document.getElementById("printContent").innerHTML;
        var strFormHtml=strBodyStyle+"<body>"+bo+"</body>";
        //var strFormHtml=strBodyStyle+"<body>"+document.getElementById("productList").innerHTML+"</body>";
        LODOP.PRINT_INIT("福建省高速公路合同会审表");
        LODOP.ADD_PRINT_HTM(0,0,"100%","100%",strFormHtml);
    };
</script>

</body>
</html>









