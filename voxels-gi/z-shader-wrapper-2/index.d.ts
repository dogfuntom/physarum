export class ZShaderWrapper {
    constructor(gl: WebGL2RenderingContext, twgl: typeof import("twgl.js"));
    gl: WebGL2RenderingContext;
    twgl: typeof import("twgl.js");
    createPass(frag: string, size?: number | number[]): Pass;
}
export class Pass {
    constructor(gl: WebGL2RenderingContext, twgl: typeof import("twgl.js"), vert: string, frag: string, resolution: number[]);
    gl: WebGL2RenderingContext;
    twgl: typeof import("twgl.js");
    resolution: number[];
    b: WebGLTexture | WebGLRenderbuffer;
    positionObject: {
        position: {
            data: number[];
            numComponents: number;
        };
    };
    positionBuffer: import("twgl.js").BufferInfo;
    buffer: import("twgl.js").FramebufferInfo;
    backbuffer: import("twgl.js").FramebufferInfo;
    program: import("twgl.js").ProgramInfo;
    attachments: {
        internalFormat: number;
    }[];
    draw(uniforms: object, target: string): void;
}
