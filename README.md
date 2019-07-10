# custom-contextmenu

自定义右键菜单，使用简单，原生JS编写无需引入任何库，完美兼容至IE8；可根据需要设置多个右键菜单，每个菜单下也可以进行嵌套。

![image](http://up.wawa.fm/20,0607400e744e57)

首先要引入样式文件和JS文件

```
<link rel="stylesheet" href="menu.css">
```

```
<script src="menu.js"></script>
```

引入后直接实例化Menu，`el`表示需要使用右键菜单的元素（JQ可以传`$('#test')[0]`）；`menu`数组表示菜单内容，可以进行嵌套，具体格式可以看下面的demo

```
new Menu({
    el: div1,
    list: [{
            name: '保存',
            callback: function() {
                div1.innerText = '保存';
            }
        },
        {
            name: '刷新',
            callback: function() {
                div1.innerText = '刷新';
            }
        },
        {
            name: '设置',
            menu: [{
                    name: '首选项',
                    callback: function() {
                        div1.innerText = '首选项';
                    }
                },
                {
                    name: '快捷键',
                    callback: function() {
                        div1.innerText = '快捷键';
                    }
                }
            ]
        }
    ]
});
```

