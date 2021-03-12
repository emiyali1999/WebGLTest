function main(){
	//获取canvas
	var canvas = document.getElementById('webgl');
	
	//获取webGL绘图上下文
	var gl = getWebGLContext(canvas);
	if(!gl)
	{
		console.log('Failed to get the rendering context for WebGL');
		return;
	}
	
	//指定清空<canvas>的颜色
	gl.clearColor(1.0,1.0,1.0,1.0);
	
	//清空
	gl.clear(gl.COLOR_BUFFER_BIT);
}