function Menu(datas) {

    var node = document.body.appendChild(createMenu(datas.list));
    // 禁止右击事件
    datas.el.setAttribute('oncontextmenu', 'return false');
    // 绑定事件
    if (datas.el.addEventListener) {
        datas.el.addEventListener('mouseup', function() {
            event.button == 2 && show(event.clientX, event.clientY);
        });
    } else if (datas.el.attachEvent) {
        datas.el.attachEvent('onmouseup', function() {
            window.event.button == 2 && show(event.clientX, event.clientY);
        });
    }

    function createMenu(data) {
        var menu = document.createElement('ul');
        menu.className = 'menu';
        for (var i = 0; i < data.length; i++) {
            var menuItem = document.createElement('li');
            menuItem.innerHTML = data[i]['name'];
            (function(i) {
                addHandler(menuItem, 'click', function() {
                    if (data[i]['callback']) {
                        hide();
                        data[i]['callback']();
                    }
                });
            })(i)
            if (data[i]['menu']) {
                var arrow = document.createElement('img');
                arrow.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAwCAYAAABe6Vn9AAABJElEQVRoQ+3YXQ0CMRAE4DkHOEACSAAnIAEnOAAcIAEJOMACDiCbtAnhgeslO1NymXul7OWb6ZWfATO7hpl5YNC/N+qG3JA4AW85ceCTb+eGJkcmfoMbagh8A+AO4NmwNn0Jo6GAPABse6AYoDWAWy8UAxTbqBuKBQrUojT1ArAvz1X6M/M9kAn6RC3LMxWHBfVig+QoBUiKUoFkKCVIglKDKuoKYMU4KHqAArUDcCrH+Tnz2OsBqphLgWV65H9jUTGRjLIhOkYJkmBUIBlGAZJi2KCKOQA4ph5lP4axDgXa58xYMAxQNwxry8Vvnthiqd8AxpqprzMaar03ZZ1BlFgTh7qhxDApo9wQJdbEoW4oMUzKKDdEiTVxqBtKDJMyanYNvQHK1zAx+3qsRwAAAABJRU5ErkJggg=="
                menuItem.appendChild(arrow);
                menuItem.appendChild(createMenu(data[i]['menu']));
            };
            menu.appendChild(menuItem);
        };
        console.log(menu)
        return menu;
    };

    function show(x, y) {
        var menuList = [];
        if (document.getElementsByClassName) {
            menuList = document.getElementsByClassName("menu");
        } else {
            // 兼容IE8+
            var all = document.getElementsByTagName('*');
            for (var i = 0; i < all.length; i++) {
                if (all[i]['className'] == 'menu') {
                    menuList.push(all[i]);
                }
            }
        }
        for (var i = 0; i < menuList.length; i++) {
            menuList[i].removeAttribute('style');
        }
        node.setAttribute('style', 'display: inline-block');
        node.style.left = x + 1 + 'px';
        node.style.top = y + 1 + 'px';
    };

    function hide() {
        node.setAttribute('style', 'display: none');
    };

    function addHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, function(event) {
                handler();
                event.stopPropagation();
            }, false);
        } else if (element.attachEvent) {
            // 兼容IE8+
            element.attachEvent('on' + type, function(event) {
                handler();
                window.event.cancelBubble = true;
            });
        }
    };

    addHandler(document.body, 'click', function() {
        hide();
    });

    return {
        show: show,
        hide: hide
    };

}