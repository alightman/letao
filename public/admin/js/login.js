//使用表单校验插件
$('.form-horizontal').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [':disabled', ':hidden', ':not(:visible)'],
  
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          callback:{
              message:'用户名不存在'
          }
          //长度校验
        //   stringLength: {
         
        //     message: '用户名长度必须在6到30之间'
        //   },
          //正则校验
        //   regexp: {
        //     regexp: /^[a-zA-Z0-9_\.]+$/,
        //     message: '用户名由数字字母下划线和.组成'
        //   }
        }
      },
      password:{
        validators: {
            notEmpty:{
                //验证不能为空
                message:'密码不能为空'
            },
            callback:{
                message:"密码错误"
            },
            //长度
            stringLength:{
                min:6,
                max:30,
                message:'用户名长度必须在6-30之间'
            },
            //正则校验
            regexp: {
                regexp: /^[a-zA-Z0-9_\.]+$/,
                message: '用户名由数字字母下划线和.组成'
            }
        }
      },
    }
  
  });

  //当表单校验成功时，会触发success.form.bv事件，此时会提交表单，这时候，通常我们需要禁止表单的自动提交，使用ajax进行表单的提交。
  
      $('.form-horizontal').on('success.form.bv', function (e) {
          e.preventDefault();
          //使用ajax提交逻辑 
 
            //发送ajax请求，登录
            $.ajax({
                type:"post",
                url:"/employee/employeeLogin",
                //dataType:'json',  //如果后端返回的相应头有text/html
                data: $('.form-horizontal').serialize(),
                success:function (data) {
                if(data.success){
                    //跳转到首页
                    location.href = "index.html";
                }

                if(data.error == 1000){
                    //alert("用户名不存在");
                    //把用户名的校验失败
                    //第一个参数：想要修改的字段
                    //第二个参数：改成什么状态  INVALID  VALID
                    //第三个参数： 指定显示的错误信息
                    $('.form-horizontal').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }
                if(data.error == 1001){
                    $('.form-horizontal').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }

                }
            });
            

            });


//重置样式
$("[type='reset']").on("click", function(){
  //需要重置表单的样式,需要获取到插件对象
  $('.form-horizontal').data("bootstrapValidator").resetForm();
});
  

