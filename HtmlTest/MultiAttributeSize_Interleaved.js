//顶点着色器
var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n'+
	'attribute vec4 a_Color;\n'+
	'varying vec4 v_Color;\n'+
	'void main() {\n '+
	' gl_Position = a_Position;\n'+
	' gl_PointSize = 10.0;'+
	' v_Color = a_Color;\n'+
	'}\n';
	
//片源着色器程序
var FSHADER_SOURCE =
	'precision mediump float;\n' +
	'varying vec4 v_Color;\n'+
	'void main() {\n'+
	'gl_FragColor = v_Color;\n'+//设置颜色
	'}\n'; 
	
function main(){
	//获取<canvas>元素
	var canvas = document.getElementById('webgl');
	if (!canvas) {
	        console.log("Failed to retrieve the <canvas> element");
	        return;
	    }
	
	//获取WebGL绘图上下文
	var gl = getWebGLContext(canvas);
	if(!gl){
		console.log('Failed to init shaders.');
		return;
	}
	
	//初始化着色器
	if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
		console.log('Failed to initialize shaders.');
		return;
	}
	
	//设置顶点位置
	var n = initVertexBuffers(gl);
	if(n<0)
	{
		console.log('Failed to init vertex buffers');
		return
	}
	//设置canvas背景色
	gl.clearColor(1.0,1.0,1.0,1.0);
	
	gl.drawArrays(gl.LINE_LOOP,0,n);
}

function initVertexBuffers(gl){
	var vertices = new Float32Array(
		[0.0,0.67,1.0,0.0,0.0,
		-0.5,-0.33,0.0,1.0,0.0,
		0.5,-0.33,0.0,0.0,1.0]
		);
	var n = 3;//顶点数量
	
	var FSIZE = vertices.BYTES_PER_ELEMENT;
	
	//创建缓冲区对象
	var vertexBuffer = gl.createBuffer();
	if(!vertexBuffer){
		console.log('Failed to create the buffer object');
		return -1;
	}
	//将缓冲区对象绑定到目标
	gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
	//向缓冲区对象中写入数据
	gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
	
	//获取a_Position变量的存储位置  下同
	var a_Position = gl.getAttribLocation(gl.program,'a_Position');
	if(a_Position<0){
		console.log('Failed to getAttribLocation a_Position.');
		return -1;
	}
	var a_Color = gl.getAttribLocation(gl.program,'a_Color');
	if(a_Color<0){
		console.log('Failed to getAttribLocation a_Color.');
		return -1;
	}
	//将缓冲区对象分配给a_Position等变量
	gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*5,0);
	gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE*5,FSIZE*2);
	//链接a_Position变量和分配给他的缓冲区对象
	gl.enableVertexAttribArray(a_Position);
	gl.enableVertexAttribArray(a_Color)
	
	return n;
}