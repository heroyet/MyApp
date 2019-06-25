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
    //alert("Error:本机未安装或需要升级!");
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
			String sql ="SELECT ht.contractName FROM ENTITY_HTTZ ht where ht.contractViewId="+instId;
			rs=ApexDao.getRowSet(DataAccess.getDataSource(), sql);
			while(rs.next()){
				rowInfo=rs.getString("contractName");
				content.append(rowInfo);
			}
			hetongmingcheng = content.toString();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		/*合同流水号*/
		String hetongliushui = "";
		content= new StringBuffer("");
		rs = null;
		try {
			String sql ="SELECT ht.contractSerialNum FROM ENTITY_HTTZ ht where ht.contractViewId="+instId;
			rs=ApexDao.getRowSet(DataAccess.getDataSource(), sql);
			while(rs.next()){
				rowInfo=rs.getString("contractSerialNum");
				content.append(rowInfo);
			}
			hetongliushui = content.toString();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		/*承办部门*/
		String chengbanbumen = "";
		content= new StringBuffer("");
		rs = null;
		try {
			String sql ="select ORG.name||'，'||'承办人：'||USER1.name||'。'||'负责人：'||USER2.name as chengbanbumen from WO_HTSCSP httz,TUSER user1,TUSER user2,LBORGANIZATION org  where httz.instid="+instId+" and httz.operator=user1.id and httz.ORG=org.id  and httz.depmanager=user2.id";
			rs=ApexDao.getRowSet(DataAccess.getDataSource(), sql);
			while(rs.next()){
				rowInfo=rs.getString("chengbanbumen");
				content.append(rowInfo);
			}
			chengbanbumen = content.toString();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		/*合同情况*/
		String contractDetail = "";
		content= new StringBuffer("");
		rs = null;
		try {
			String sql ="SELECT NVL(ht.contractDetail,' ') contractDetail FROM ENTITY_HTTZ ht WHERE  ht.contractViewId="+instId;
			rs=ApexDao.getRowSet(DataAccess.getDataSource(), sql);
			while(rs.next()){
				rowInfo=rs.getString("contractDetail");
				content.append(rowInfo);
			}
			contractDetail = content.toString();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		/*审查会稿部门意见*/
		String huigaobumenyijian = "";
		content= new StringBuffer("");
		rs = null;

		String username = "";
		Date finishDate = null;
		String summary = null;
		try {
			String sql ="select org.name||'_'||us.name name,FINISH_DATE,summary from os_historystep os,tuser us,lborganization org where OS.entry_id="+instId+" and (OS.step_id=219 or OS.step_id=242 ) and OS.CALLER=US.ID and us.orgid=org.id and os.action_id > 0 order by FINISH_DATE asc";
			rs=ApexDao.getRowSet(DataAccess.getDataSource(), sql);
			while(rs.next()){
				username=rs.getString("name");
				finishDate = rs.getDate("FINISH_DATE");
				summary = rs.getString("summary");
				if(summary!=null){
					content.append(username+" "+dfs.format(finishDate)+"："+summary+"<br/>");
				}else{
					content.append(username+" "+dfs.format(finishDate)+"：已审查<br/>");
				}
			}
			huigaobumenyijian = content.toString();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		/*法律事务机构*/
		String lawInfo = "";
		content= new StringBuffer("");
		rs = null;
		username = null;
		summary = null;
		finishDate = null;
		try {
			String sql ="select name,FINISH_DATE,summary from os_historystep os,tuser us where OS.entry_id="+instId+" and (OS.step_id=222 or OS.step_id=244) and OS.CALLER=US.ID and os.action_id > 0 order by os.FINISH_DATE asc";
			rs=ApexDao.getRowSet(DataAccess.getDataSource(), sql);
			while(rs.next()){
				username=rs.getString("name");
				finishDate = rs.getDate("FINISH_DATE");
				summary = rs.getString("summary");
				if(summary!=null){
					content.append(username+" "+dfs.format(finishDate)+"："+summary+"<br/>");
				}else{
					content.append(username+" "+dfs.format(finishDate)+"：已审查<br/>");
				}
			}
			lawInfo = content.toString();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		/*领导审批意见*/
		String lingdaoInfo = "";
		content= new StringBuffer("");
		rs = null;

		username = "";
		finishDate = null;
		summary = null;
		try {
			//String sql ="select name,FINISH_DATE,summary from os_historystep os,tuser us where OS.entry_id="+instId+" and (OS.step_id=227 or OS.step_id=231 or OS.step_id=287)  and OS.CALLER=US.ID order by os.FINISH_DATE asc";
			String sql ="select us.name, finish_date, summary from os_historystep os, tuser us where os.entry_id = "+instId
					 +"and (os.step_id = 227 or os.step_id = 231 or os.step_id = 321) and os.caller = us.id and os.action_id > 0"
					 +"and os.id in (select max(id) id from os_historystep t where t.entry_id = "+instId
					 +"and (t.step_id = 227 or t.step_id = 231 or t.step_id = 321) and t.action_id > 0 group by t.caller)"
					 +"order by os.finish_date asc";
			rs=ApexDao.getRowSet(DataAccess.getDataSource(), sql);
			while(rs.next()){
				username=rs.getString("name");
				finishDate = rs.getDate("FINISH_DATE");
				summary = rs.getString("summary");
				if(summary!=null){
					content.append(username+" "+dfs.format(finishDate)+"："+summary+"<br/>");
				}else{
					content.append(username+" "+dfs.format(finishDate)+"：同意<br/>");
				}
			}
			lingdaoInfo = content.toString();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		/*附件名称*/
		String finalContractName = "";
		String temp = "";
		content= new StringBuffer("");
		rs = null;

		username = "";
		finishDate = null;
		summary = null;
		try {
			String sql ="SELECT contractotherfiles FROM ENTITY_HTTZ ht WHERE  ht.contractViewId="+instId;
			rs=ApexDao.getRowSet(DataAccess.getDataSource(), sql);
			while(rs.next()){
				temp=rs.getString("contractotherfiles");
				content.append(temp);
			}
			finalContractName = content.toString();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	%>

	<style id="style1" type="text/css">

	body,table{
		font-size:16px;
	}
	<% int percent = finalContractName.length()/30;%>
	table{
		table-layout:fixed;
		empty-cells:show;
		border-collapse: collapse;
		height:<%=(94-percent)%>%;
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
</style>
	<div style="margin:0 auto;">
		<div style="text-align:right;margin-bottom:20px;">
			<button onclick="prn1_preview()" class="button blue" value="打印">打印</button>
		</div>
		<div id="printContent" style="height:1128px;">
			<br/>
			<table  border="1" class="t1">
				<tr  class="a1" style="height:60px;"><td colspan=5 ><h1>福建省高速公路合同会审表</h1></td></tr>
				<tr  class="a1"><td><h2>合同名称</h2></td><td class="left" colspan=4 ><%=hetongmingcheng%></td></tr>
				<tr  class="a1"><td><h2>合同流水号</h2></td><td class="left" colspan=4 ><%=hetongliushui%></td></tr>
				<tr  class="a1"><td><h2>承办部门</h2></td><td class="left"  colspan=4><%=chengbanbumen%></td></tr>
				<tr  class="a1"><td><h2>合同情况</h2></td><td class="left"  colspan=4><%=contractDetail%></td></tr>
				<tr  class="a1"><td><h2>审查会稿<br/>部门意见</h2></td><td class="left"  colspan=4><%=huigaobumenyijian%></td></tr>
				<tr  class="a1"><td><h2>法律事务机构</h2></td><td class="left"  colspan=4><%=lawInfo%></td></tr>
				<tr  class="a1"><td><h2>领导审批意见</h2></td><td class="left"  colspan=4><%=lingdaoInfo%></td></tr>
			</table>
			<div id="otherFiles" class="contractBottom"></div>
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
<script type="text/javascript">
	$(function(){
		var fileName = "";
		var fileObj = <%=finalContractName%>;
		$.each(fileObj["items"],function(i, obj) {
			fileName += (i+1) + "、" + obj[1] + "<br>";
		});
		if(fileName.length > 0) {
			fileName = "<b>合同相关附件：</b><br>"+fileName;
		}
		$("#otherFiles").html(fileName);
	});
</script>

</body>
</html>









