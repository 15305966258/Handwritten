const { SyncHook } = require("tapable");
const { Compilation } = require("webpack");
class Compiler {
    constructor(webpackOptions) {
        this.options = webpackOptions;
        this.hooks = {
            run: new SyncHook(),
            done: new SyncHook()
        }
    }
    compile(callback) {
        let compilation = new Compilation(this.options);
        compilation.build(callback);
    }
    run(callback) {
        this.hooks.run.call();
        const onCompiled = () => {
            this.hooks.done.call();
        }
        this.compile(onCompiled);
    }
}
class Compilation {
    constructor(webpackOptions) {
        this.options = webpackOptions;
        this.modules = [];
        this.chunks = [];
        this.assets = {};
        this.fileDependencies = [];
    }
    build(callback) {
        let entry = {};
        if (typeof this.options.entry === "string") {
            entry.main = this.options.entry;
        } else {
            entry = this.options.entry;
        }
        callback()
    }
}

class WebpackRunPlugin {
    apply(compiler) {
        compiler.hooks.run.tap("WebpackRunPlugin", () => {
            console.log("开始编译");
        });
    }
}
class WebpackDonePlugin {
    apply(compiler) {
      compiler.hooks.done.tap("WebpackDonePlugin", () => {
        console.log("结束编译");
      });
    }
  }
const loader1 = (source) => {
    return source + "//加注释：loader1"
};
const loader2 = (source) => {
    return source + "//加注释：loader2"
};

function webpack(webpackOptions) {
    const compiler = new Compiler();
    const { plugins } = webpackOptions;
    for (let plugin of plugins) {
        plugin.apply(compiler);
    }
    return compiler;
}