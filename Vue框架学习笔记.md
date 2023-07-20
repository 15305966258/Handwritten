### 一：Vue基础语法
#### 1：软件架构设计模式
##### MVC模式
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34996264/1689557436355-7f55b47b-ce32-4346-847c-f95c2b1c09d6.png#averageHue=%23fcfcf6&clientId=u57f31590-0ea6-4&from=paste&height=466&id=u2315472a&originHeight=932&originWidth=1118&originalType=binary&ratio=2&rotation=0&showTitle=false&size=72095&status=done&style=none&taskId=ue2c25f7d-3e72-46b7-9dd7-724f63125ab&title=&width=559)<br />在MVC中，M是模型层负责处理数据，通知视图进行更新；V是视图层，负责展示数据；C是控制层，负责接收用户输入的内容，然后调用模型层对数据进行修改，最后模型层通知视图更新。这种方式模型层和视图层耦合在一起，当项目复杂时可能会造成代码混乱。
##### MVP模式
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34996264/1689557813730-3bd5ccb1-535b-462e-b77c-73f03598ea64.png#averageHue=%23fef9f6&clientId=u57f31590-0ea6-4&from=paste&height=298&id=uf3d10c1a&originHeight=596&originWidth=1084&originalType=binary&ratio=2&rotation=0&showTitle=false&size=47544&status=done&style=none&taskId=u76fb7b27-cd29-42db-8c0b-181e1a292c1&title=&width=542)<br />MVP中view不能直接使用Model，而是通过Presenter提供的接口，让Presenter去更新Model，同时在MVC中，因为view层的接口只提供给Model层，所以C层不能控制view层更新，而MVP中view层的接口暴露给了Presenter，可以直接通知视图渲染。<br />缺点：业务逻辑基本都在Presenter层，代码量大，维护困难。
##### MVVM模式
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34996264/1689559310414-c7d6f8c6-8207-456e-9876-51d85a0cdb98.png#averageHue=%23fbe7de&clientId=u57f31590-0ea6-4&from=paste&height=172&id=u10457c69&originHeight=344&originWidth=1152&originalType=binary&ratio=2&rotation=0&showTitle=false&size=72601&status=done&style=none&taskId=u81f2a2f6-c565-4787-b534-c4470e95427&title=&width=576)

- Model是模型层负责处理数据（Vue中可以理解成一个js对象），view是视图层负责展示数据，模型层和视图层之间没有直接联系，通过业务逻辑层ViewModel来进行联系。ViewModel与View层之间双向数据绑定，这样数据变化时就会更新视图，视图变化也会更新数据，实现了数据层和视图层自动同步，让开发者无需操作dom，只需关注数据的处理即可。
- ViewModel层的作用：与视图层进行双向数据绑定，与Model层通过接口请求数据交互。
- View层展现的不是Model层的数据， 而是ViewModel的数据， 由ViewModel负责与Model层交互，解耦了View层和Model层，它是前后端分离方案实施的重要一环。
#### 2：Vue的生命周期

- 是什么：指的就是Vue实例从创建到销毁期间的一系列方法的调用顺序，这些方法就是生命周期钩子函数，通过这些钩子函数我们可以在组件不同的阶段进行逻辑处理。

可以分成8个阶段

| beforeCreate | 执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务 |
| --- | --- |
| created | 组件初始化完毕，各种数据可以使用，常用于异步数据获取 |
| beforeMount | 未执行渲染、更新，dom未创建 |
| mounted | 初始化结束，dom已创建，可用于获取访问数据和dom元素 |
| beforeUpdate | 更新前，可用于获取更新前各种状态 |
| updated | 更新后，所有状态已是最新 |
| beforeDestroy | 销毁前，可用于一些定时器或订阅的取消 |
| destroyed | 组件已销毁，作用同上 |

异步请求放在created好，因为mouted阶段dom节点生成了，如果进行数据请求可能会让页面发生变化造成闪动，created阶段没有生成dom节点就不会有这种问题，同时created阶段比mounted阶段早能更快的获取到数据，减少页面的加载时间。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/34996264/1689581854980-f62c70f5-2c9b-4c1b-8ba1-07e6767bec28.png#averageHue=%23fdeac8&clientId=u8a009d8c-57f6-4&from=paste&height=1357&id=u312d1331&originHeight=3039&originWidth=1200&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1612306&status=done&style=none&taskId=ueddc4b6b-d6a9-4b41-a13a-00f94c666d6&title=&width=536)
##### 父子组件的加载顺序
加载过程：<br />1：父beforeCreate<br />2：父Created<br />3：父beforeMount<br />4：子beforeCreate<br />5：子created<br />6：子beforeMount<br />7：子mounted<br />8：父mounted<br />更新过程：<br />1：父beforeUpdate<br />2：子beforeUpdate<br />3：子updated<br />4：父updated
#### 3：基础语法指令

- v-bind：将标签内的属性值解析成js代码，在标签的属性中使用v-bind，双引号里的内容会被当作js解析
```vue
<!-- 完整写法 v-bind: -->
<div v-bind:class="className">"{{innerHtml}}"</div>
<!-- 缩写 : -->
<div :class="className">"{{innerHtml}}"</div>
  
  data:{
          innerHtml:'<button>一个按钮</button>',
          className:'box'
        }
```

- v-on：用于事件绑定
```vue
<div v-on:click="clickfunc">点击事件</div>
        <!-- 缩写 @ -->
<div @click="clickfunc">点击事件</div>
methods:{
         // 定义一个 点击函数   
            clickfunc:function(){
                console.dir('click event')
            }    
        },
```

- v-model：数据双向绑定指令，限制在 <input>、<select>、<textarea>、components中使用。<inputv-model="val">
- v-show：接受一个表达式或一个布尔值。相当于给元素添加一个display属性
- v-if、v-else、v-else-if：和v-show有同样的效果，不同在于v-if是重新渲染，而v-show使用display属性来控制显示隐藏。频繁切换的话使用v-show减少渲染带来的开销。
- v-for：可用来遍历数组、对象、字符串。

#### 4：Vue双向数据绑定

- 定义：双向数据绑定即当数据发生变化的时候， 视图也就发生变化， 当视图发生变化的时候，数据也会跟着同步变化。
- v-model：vue中双向绑定是一个指令v-model，可以绑定一个响应式数据到视图，同时视图中变化能改变该值，v-model是语法糖，默认情况下相当于:value和@input。
#### 5：计算属性

- 定义：是Vue.js提供的一种特殊属性，用于根据已有的数据属性计算得出新的属性值，本质上是一个函数，它的返回值会被缓存，只有在相关依赖发生改变时才会重新计算。
- 使用：通过computed对象来定义计算属性。computed对象中的每个属性都是一个计算属性，属性名对应着计算属性的名称，属性值是一个函数，用于计算新的属性值。计算属性可以像普通属性一样在模板中进行使用。
```vue
data() {
          return {
            firstName: "",
            lastName: ""
          };
        },
computed: {
          fullName() {
            return this.firstName + " " + this.lastName;
          }
        }
```

- computed的传参
   - 可以利用高阶函数来实现传参
```javascript
<p>computed传参写法：{{ wholeName('你好') }}</p>
computed: {
    wholeName () {
      return secondName => this.firstName + secondName
    }
  }
```

   - 用来处理字符串的拼接问题

直接写在模版：{{ msg1 + default1 + default2 + default... }}<br />用computed：{{ wholeMsg(msg1) }}

   - 处理数据，比如需要展示**百分比**，后端只返回了0.xx

直接写在模板：{{ pointNumber * 100 + '%' }}<br />用computed：{{ percent(pointNumber) }}

- computed和watch的区别
   - computed 计算属性：依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。
   - watch 侦听器：更多的是观察的作用，无缓存性，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作。
   - 运用场景：<br />当需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时都要重新计算。

watch用于观测某个值变化，进行逻辑处理，比如异步请求。
#### 6：Keep-alive

- keep-alive是vue中的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM
- keep-alive可以设置三个属性
   - include：字符串或者正则表达式，只有匹配的组件会被缓存
   - exclude：匹配的组件不会被保存
   - max：数字，最多可以缓存多少组件实例
- 设置keep-alive缓存的组件，会多出两个生命周期钩子activate和deactivated
   - 首次进入组件时：beforeRouteEnter > beforeCreate > created> mounted > activated> ... ... > beforeRouteLeave > deactivated
   - 再次进入组件时：beforeRouteEnter >activated > ... ... > beforeRouteLeave > deactivated
#### 7：Slot插槽

- 可以理解为solt在组件模板中占好了位置，当使用该组件标签时候，组件标签里面的内容就会自动填坑（替换组件模板中slot位置），作为承载分发内容的出口
- 通过插槽可以让用户可以拓展组件，去更好地复用组件和对其做定制化处理
- slot分为三种
   - 默认插槽：父组件在使用的时候，直接在子组件的标签内写入内容即可
```html
<template>
    <slot>
      <p>插槽后备的内容</p>
    </slot>
</template>
```
```html
<Child>
  <div>默认插槽</div>  
</Child>
```

   - 具名插槽：子组件用name属性来表示插槽的名字，不传为默认插槽，父组件中在使用时在默认插槽的基础上加上slot属性，值为子组件插槽name属性值。
```html
<template>
    <slot>插槽后备的内容</slot>
  <slot name="content">插槽后备的内容</slot>
</template>
```
```html
<child>
    <template v-slot:default>具名插槽</template>
    <!-- 具名插槽⽤插槽名做参数 -->
    <template v-slot:content>内容...</template>
</child>
```

   - 作用域插槽：子组件在作用域上绑定属性来将子组件的信息传给父组件使用，这些属性会被挂在父组件v-slot接受的对象上
```html
<template> 
  <slot testProps="子组件的值">
          <h3>没传footer插槽</h3>
    </slot>
</template>
```
```html
<child> 
    <template v-slot:default="slotProps">
      来⾃⼦组件数据：{{slotProps.testProps}}
    </template>
</child>
```

### 二：Vue路由功能
#### 1：动态路由匹配

- 使用场景：比如一个User组件会对所有用户渲染，但用户的Id不同，可以使用动态路由实现，/users/johnny 和 /users/alin 这样的 URL 都会映射到同一个路由。
- 我们可以通过冒号：表示路径参数
   - constroutes= [// 动态字段以冒号开始 { path: '/user/:id', component: User },]
   - <router-link :to="' /user/'+userld" replace>用户</router-link>
- 路径参数可以通过$route.params获取到
| **匹配模式** | **匹配路径** | **$route.params** |
| --- | --- | --- |
| /users/:username | /users/eduardo | { username: 'eduardo' } |
| /users/:username/posts/:postId | /users/eduardo/posts/123 | { username: 'eduardo', postId: '123' } |

- 响应路由参数变化：当我们从/users/johnny 导航到 /users/alin，由于使用同一个组件，不会重新渲染，而是复用，这也意味着组件的生命周期钩子不会被调用。
   - 可以在<router-view>标签上使用key属性<router-view:key="$route.fullPath"></router-view>会进行强制重新渲染
   - 使用**beforeRouteUpdate**钩子，当路由更新时手动更新组件的数据
   - 通过watch监听$route对象的变化
#### 2：路由的导航守卫
```vue
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

- **全局前置守卫：beforeEach**

可以进行登录验证，跳转到登录页

- **全局解析守卫：beforeResolve**
- **全局后置守卫：afterEach**

不会接受next函数，所以这个阶段不会改变导航本身，可以进行页面滚动到特定区域的操作。

- **路由独享守卫：beforeEnter**

作用和beforeEach类似
```vue
const router = new VueRouter({
    routes: [
      {
        path: '/foo',
        component: Foo,
        beforeEnter: (to, from, next) => {
          // ...
        }
      }
    ]
  })
```

- **进入路由前调用：beforeRouteEnter **

无法获取到this，组件实例还没创建

- **组件被复用时调用：beforeRouteUpdate**

可以访问到this

- **离开组件时调用：beforeRouteLeave**

可以访问到this<br />**完整流程：**

1. 导航触发
2. 调用离开的组件的beforeRouteLeave钩子
3. 调用全局的beforeEach守卫
4. 调用重用组件的beforeRouteUpdate钩子
5. 调用路由独享守卫beforeEnter
6. 解析路由组件
7. 调用激活组件的beforeRouteEnter钩子
8. 调用全局beforeResolve守卫
9. 确认导航，无法再修改
10. 调用全局afterEach守卫

开始组件实例的生命周期:beforeCreate、created、 beforeMount、mounted

11. Dom更新
#### 3：嵌套路由
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34996264/1689644908806-41226753-4d3c-4fdd-aa9c-a18709bf2721.png#averageHue=%23f7f7f7&clientId=u8a009d8c-57f6-4&from=paste&height=201&id=uec24910c&originHeight=402&originWidth=1154&originalType=binary&ratio=2&rotation=0&showTitle=false&size=23993&status=done&style=none&taskId=u1dc4f178-07d7-4b68-9e57-3ae4ae073df&title=&width=577)<br />首先在user组件中添加一个<router-view>，然后修改路由配置
```vue
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'profile',
        component: UserProfile,
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'posts',
        component: UserPosts,
      },
    ],
  },
]
```
#### 4：路由的导航方式

- 声明式导航：

使用 <router-link> 创建 a 标签来定义导航链接

- 函数式导航：

调用**this.$router.push（）**
```vue
// 字符串路径
router.push('/users/eduardo')


// 带有路径的对象
router.push({ path: '/users/eduardo' })


// 命名的路由，并加上参数，让路由建立 url
router.push({ name: 'user', params: { username: 'eduardo' } })


// 带查询参数，结果是 /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })


// 带 hash，结果是 /about#team
router.push({ path: '/about', hash: '#team' })
```
注意：如果提供path，params会被忽略
```vue
// 采用这种方式实现
router.push(`/user/${username}`) // -> /user/eduardo
// 同样
router.push({ path: `/user/${username}` }) // -> /user/eduardo
```
#### 5：$route和$router的区别
$route：是一个跳转的路由信息对象，包含当前路由的各种信息。

- **path**: 当前路由的路径。
- **params**: 路由的动态参数，例如**/users/:id**中的**:id**参数。
- **query**: 路由的查询参数，例如**/users?id=1**中的**id**参数。
- **name**: 路由的名称，如果路由配置中定义了**name**属性。
- **hash**: URL的哈希值。
- **fullPath**: 完整的URL路径，包括路径、查询参数和哈希值。

$router：是全局的路由对象，包含路由的跳转方法和导航守卫等功能。

- **push**: 跳转到一个新的路由。
- **replace**: 用新的路由替换当前路由。
- **go**: 在历史记录中前进或后退多少步。
- **back**: 后退到上一个历史记录。
- **forward**: 前进到下一个历史记录。
#### 6：路由的传参方式

- 声明式导航
```vue
<router-link :to="'/users?userId:1'"></router-link>
<router-link :to="{ name: 'users', params: { userId: 1 } }"></router-link>
<router-link :to="{ path: '/users', query: { userId: 1 } }"></router-link>
```

- 编程式导航
```vue
this.$router.push({
    name: 'users',
    params: {
        userId: 1
    }
});
// 路由配置
{
    path: '/users',
    name: 'users',
    component: User
}
// 跳转后获取路由参数
this.$route.params.userId // 为 1
```
#### 7：路由的hash模式和history模式
在创建路由器实例时，history 配置允许我们在不同的历史模式中进行选择。
##### Hash模式

- location.hash的值就是url中 # 后面的东西。它的特点在于：hash虽然出现url中，但不会被包含在HTTP请求中，对后端完全没有影响，因此改变hash不会重新加载页面。
- 特点：兼容性好但是不美观，不利于SEO，搜索引擎可能无法正确解析哈希值中的内容。
##### History模式

- 在History模式下，利用了HTML5的History API，通过history.pushState和history.replaceState方法实现路由跳转。URL中不再需要哈希值，而是直接使用普通的URL路径。例如，http://example.com/users。
- 需要服务器配置支持，确保在后端返回正确的HTML页面，防止在前端刷新时出现404错误。
- 特点：有利于SEO，不支持HTML5 History API的浏览器可能无法正常使用。

如果项目需要支持老版本的浏览器或不方便配置服务器，可以选择Hash模式。如果项目对URL美观性和SEO有要求，并且可以配置服务器，推荐使用History模式。
#### 8：路由懒加载
最常用的是使用箭头函数和import方法，还有require方法，或者使用webpack提供的require.ensure方法，Webpack编译打包后，会把每个路由组件的代码分割成一个个js文件，初始化时不会加载这些js文件，只当激活路由组件才会去加载对应的js文件。懒加载缩短了页面的加载时间提高用户体验，同时避免了不必要的组件加载，节省用户的带宽
```vue
const Foo = () => import('./components/Foo.vue');
const Bar = () => require('./components/Bar.vue');


const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  {
    path: '/car',
    component: resolve => require.ensure([], () => resolve(require('./components/Car.vue')), 'car'),
  },
];
```
### 三：VueX
#### 1：原理

- Vuex 是一个专为 Vue js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态(state)。
- Vuex的状态存储是响应式的。当 Vue 组件从 store 中获取状态的时候、若store中的状态发生变化，那么相应的组件也会相应地得到高效更新。
- 改变 store 中的状态的唯一途径就是显式地提交(commit) mutation。这样可以方便地跟踪每一个状态的变化。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/34996264/1689734048157-e2003fe7-7d14-4185-afd6-8d185bce46fb.png#averageHue=%23fefdfb&clientId=u69e52583-1bbe-4&from=paste&height=480&id=ua14f9114&originHeight=960&originWidth=1342&originalType=binary&ratio=2&rotation=0&showTitle=false&size=116560&status=done&style=none&taskId=u1ca7a351-9e29-443d-9f2d-05f955b0685&title=&width=671)

- State：页面状态对象
- Mutations：修改状态的唯一途径，用commit提交，不能发起异步请求
- Actions：获取异步数据，然后通过Mutation来修改状态，用dispatch触发
- Getters：修饰器，可以对State状态进行修改，比如想让name前面都添加''hello"。
- Modules：负责模块化Vuex
#### 2:使用技巧
如果不想使用this.$store.dispatch/state/mutation/getters('XXX')<br />可以通过mapDispatch，mapState，mapMutation，mapGetter解构到计算属性中，或者方法中
```vue
<script>
import { mapState, mapGetters } from 'vuex';
export default {
  mounted() {
    console.log(this.name);
    console.log(this.getMessage);
  },
  computed: {
    ...mapState(['name']),
    ...mapGetters(['getMessage']),
  },
};
</script>
```
#### 3：index.js文件拆分

- 按属性进行拆分
```vue
import Vue from 'vue';
import Vuex from 'vuex';
import { state } from './state'; // 引入 state
import { getters } from './getters'; // 引入 getters
import { mutations } from './mutations'; // 引入 mutations
import { actions } from './actions'; // 引入 actions


Vue.use(Vuex);


const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

export default store;

```

- 根据模块拆分

我们有一个总store，在这里面根据不同的功能，我们加了两个不同的store，每个store里面维护自己的state，以及自己的actions/mutations/getters。
```vue
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}
const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}
const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
store.getters.c // -> moduleA里的getters
store.commit('d') // -> 能同时触发子模块中同名mutation
store.dispatch('e') // -> 能同时触发子模块中同名action

```
缺点是使用起来比较繁琐复杂，容易出错。而且类型系统支持很差，不能给我们带来帮助

### 
