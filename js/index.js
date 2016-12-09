var app=angular.module("icloud",[]);
app.controller(
	"icloudCtrl",
	["$scope",function($scope){
		$scope.color=["purple","green","blue","yellow","brown","pink","orange"];
		if(localStorage.reminder){
			$scope.lists=JSON.parse(localStorage.reminder);
		}else{
			$scope.lists=[];
		}
		$scope.save2local=function(){
			localStorage.reminder=JSON.stringify($scope.lists)
		}
		$scope.cu=0;
		function maxId(){
			var max=-Infinity;
			var len=$scope.lists.length;
			for(var i=0;i<len;i++){
				var v=$scope.lists[i];
				if(v.id>max){
					max=v.id;
				}
			}
			return (max===-Infinity)?1000:max;
		}
		$scope.hui=function(){
			$(".tan").removeClass("active3");
		}
		$scope.zhuan=function(){
			$(".sanjiao").toggleClass("zhuan");
			$(".finish").toggleClass("active6");
			$(".clear").toggleClass("active7");
		}
		$scope.xian=function(){
			$(".todos-lis").addClass("active4");
		}
		$scope.del=function(){
			if($scope.lists.length==1){
				$(".tan").addClass("active3");
				return;
			}else{
				$scope.lists.splice($scope.cu,1);
				$scope.save2local();
			}
		}
		$scope.addList=function(){
			var len=$scope.lists.length;
			var index=len%7;
			var v={
				id:maxId()+1,
				name:"新列表"+(len+1),
				theme:$scope.color[index],
				todos:[],
			};
			$scope.lists.push(v);
		};
		
		$scope.count=function(){
			r=0;
			$scope.lists[$scope.cu].todos.forEach(function(v,i){
				if(v.state===1){
					r++;
				}
			})
			return r;
		}
		$scope.clear=function(){
			var newarr=[];
			$scope.lists[$scope.cu].todos.forEach(function(v,i){
				if(v.state===0){
					newarr.push(v);
				}
			});
			$scope.lists[$scope.cu].todos=newarr;
			$(".finish").removeClass("active6")
		}
        $scope.add2=function(){
        	var value=$("#input").val();
        	console.log(value)
        	if(value!==""){
        		$scope.lists[$scope.cu].todos.push({name:value,state:0})
        	}
        	value=$("#input").val("");
        }
        $scope.bian=function(){
        	$(".dian3").addClass("active5")
        }
	}]
)
app.directive("myUl",[function(){
	return {
		restrict:"A",
		replace:true,
		transclude:true,
        template:"<div class='list2'><div ng-transclude></div></div>",
        link:function($scope,el){
        	$(el).on("click",".list3",function(){
        		$(document).on("keyup",":input",false);
        		$(el).on("keyup",false);
        		$(el).find(".list3").removeClass("active");
        		$(this).addClass("active");
        		$(el).find(".f-x1").removeClass("active1");
        		$(this).find(".f-x1").addClass("active1");
        		var self=this;
        		$scope.$apply(function(){
        			$scope.cu=$(self).index()-1;
        		})
        	});
        	$(document).on("keyup",function(e){
        		if(e.keyCode===8){
        			var index=$(".active").index()-1;
        			if(index===-2){
    					return;
    				}
        			$scope.$apply(function(){
        				if($scope.lists.length==1){
        					$(".tan").addClass("active3");
        					return;
        				}else{
        					$scope.lists.splice(index,1);
        					$scope.save2local();
        				}
        			})
        		}
        	})
        }
	}
}])
app.directive("ngX",function(){
	return {
		restrict:"A",
		replace:true,
		transclude:true,
        template:"<h2 class='xuangxiang'><span ng-transclude></span></h2>",
	    link:function($scope,el){
	    	var drop=$(".kuang2");
	    	$(el).on("click",function(){
	    		drop.toggleClass("active2");
	    		return false;
	    	});
	    	drop.on("click",false);
	    	$(document).on("click",false);
	    	$(document).on("click",".todos-lis",function(){
	    		drop.removeClass("active2");
	    	})
	    }
	}
})
app.directive('ngColor', [function(){
    return{
        restrict:"A",
        replace:true,
        transclude:true,
        template:'<ul><div ng-transclude></div></ul>',
        link:function($scope,el){
            $(el).on('click','li',function(){
                var index=$(this).index();
                var li= $(el).find("li");
                for(var i=0;i<li.length;i++){
                    li.removeClass("quan");
                }
                $(this).addClass("quan");
            })
        }
    }
}]);
app.directive("ngBack",[function(){
	return{
		restrict:"A",
		replace:true,
		transclude:true,
		template:"<div class='second'><div ng-transclude></div></div>",
		link:function($scope,el){
			$(el).on("click",".things",function(){
				$(".things").find(".bx").css("display","none");
				$(this).find(".bx").css("display","block");
				$(".things").find(".infor").css("display","none");
				$(this).find(".infor").css("display","block");
			})
		}
	}
}])