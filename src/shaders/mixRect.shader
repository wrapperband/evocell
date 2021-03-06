#ifdef GL_ES
	precision highp float;
#endif

uniform sampler2D texFrame;

uniform vec2 rectPos;
uniform vec2 rectSize;
uniform vec4 color;

varying vec2 vTexCoord;
void main(void) {
	vec4 oldColor = texture2D(texFrame, vTexCoord);
	
	if (gl_FragCoord.x >= rectPos.x && gl_FragCoord.x <= rectPos.x + rectSize.x &&
		 gl_FragCoord.y >= rectPos.y && gl_FragCoord.y <= rectPos.y + rectSize.y)
	{
		gl_FragColor = color.a * color + (1. - color.a) * oldColor;
	}
	else
	{
		gl_FragColor = oldColor;
	}
}
