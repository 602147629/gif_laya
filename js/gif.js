(function($) {
	jQuery.fn.extend({
		gifOn: function (_path,_num,options){
			if(_path && _path!='' && _num>1){
				var Animation = Laya.Animation;				//laya动画对象
				var Stage     = Laya.Stage;					//laya的舞台对象
				var WebGL     = Laya.WebGL;					//laya的webgl对象

				var _ele = $(this);							//页面元素的jqeury对象
				var imgs = [];								//序列帧图片集合
				var times = 0;								//播放次数
				var ani;									//动画对象
				var ele_h = _ele.height();					//元素的高
				var ele_w = _ele.width();					//元素的宽

				var defaults = {type:'jpg',speed:100,repeat:0,opacity:false,full:true};
				var opts = $.extend(defaults,options);
				_load_handler();
				_ele.on('off',this_off);
			}

			//加载图片(有待扩展)
			function _load_handler(){
				for(var i=0; i<_num; i++) {
					imgs.push(_path+(i+1)+'.'+opts.type);
				}	
				_layaInit();
			}//end func

			//初始化laya动画集插件
			function _layaInit(){
				//建立舞台
				_layaStageInit();
				function _layaStageInit(){
					if($("#layaCanvas").length == 0){
						if(opts.opacity) var canvas = Laya.init(ele_w,ele_h);
						else var canvas = Laya.init(ele_w, ele_h, WebGL);
						$(canvas).appendTo(_ele);
						$("#layaContainer").remove();
					}
					
					Laya.stage.alignH = "left";
					Laya.stage.alignV = "top";
					Laya.stage.scaleMode = opts.full ? "noborder" : "noscale";
					Laya.stage.bgColor = null;
					startAnima();
				}//end func

				//开始动画
				function startAnima(){
					ani = new Animation();
					ani.loadImages(imgs);								//加载动画图集
					ani.interval = opts.speed;							//设置播放间隔（单位：毫秒）
					ani.index = 1; 										//当前播放索引
					ani.play(0,opts.repeat == 1 ? false : true); 		//播放图集动画
					ani.on("complete",this,endOnePlay)
					Laya.stage.addChild(ani);							//把动画图集加入场景
				}//end func
			}

			//一次播放结束后的方法
			function endOnePlay(){
				times++;
				if(times == opts.repeat - 1){
					ani.loop = false;
				}
				if(opts.onComplete) opts.onComplete(times);
			}//end func

			//关闭插件
			function this_off(){
				ani.destroy();
				// $("#layaCanvas").remove();
			}//end func
		},
		gifOff: function(){
			$(this).triggerHandler('off');
		}
	})
}(jQuery));